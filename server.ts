import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

// Helper to sanitize passcode (removes whitespace and outer double/single quotes)
function sanitizePasscode(code: any): string {
  if (typeof code !== "string") return "";
  return code.trim().replace(/^["']|["']$/g, "");
}

const ADMIN_PASSCODE = sanitizePasscode(process.env.ADMIN_PASSCODE || "Arin@sarker2580");

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  // Use JSON middleware with 10MB limit for base64 images
  app.use(express.json({ limit: "10mb" }));

  // API Route to save uploaded images or files to the filesystem
  app.post("/api/save-image", (req, res) => {
    try {
      const passcode = sanitizePasscode(req.headers["x-admin-passcode"]);
      if (passcode !== ADMIN_PASSCODE) {
        return res.status(401).json({ error: "Unauthorized access" });
      }

      const { filename, base64 } = req.body;
      if (!filename || !base64) {
        return res.status(400).json({ error: "Missing filename or base64 data" });
      }

      // Extract the raw base64 data supporting any MIME type (image, pdf, docx, etc.)
      const base64Data = base64.replace(/^data:[^;]+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const safeFilename = path.basename(filename);
      const filePath = path.join(process.cwd(), safeFilename);

      // If saving a CV file, delete other formats to prevent download conflicts
      if (safeFilename.toLowerCase().startsWith("anthony_cv")) {
        const extensions = [".pdf", ".docx", ".doc"];
        extensions.forEach(ext => {
          const otherPath = path.join(process.cwd(), `anthony_cv${ext}`);
          if (path.extname(safeFilename).toLowerCase() !== ext && fs.existsSync(otherPath)) {
            try {
              fs.unlinkSync(otherPath);
              console.log(`Deleted old CV format to prevent conflicts: ${otherPath}`);
            } catch (err) {
              console.error(`Failed to delete old CV format: ${otherPath}`, err);
            }
          }
        });
      }

      fs.writeFileSync(filePath, buffer);
      console.log(`Successfully saved file to workspace root: ${safeFilename}`);
      return res.json({ success: true, path: `/${safeFilename}` });
    } catch (error) {
      console.error("Error saving file:", error);
      return res.status(500).json({ error: "Failed to save file" });
    }
  });

  // API Route to download the uploaded CV
  app.get("/api/download-cv", (req, res) => {
    try {
      const pdfPath = path.join(process.cwd(), "anthony_cv.pdf");
      const docxPath = path.join(process.cwd(), "anthony_cv.docx");
      const docPath = path.join(process.cwd(), "anthony_cv.doc");

      let filePath = "";
      let downloadName = "";
      let contentType = "";

      if (fs.existsSync(pdfPath)) {
        filePath = pdfPath;
        downloadName = "Anthony_CV.pdf";
        contentType = "application/pdf";
      } else if (fs.existsSync(docxPath)) {
        filePath = docxPath;
        downloadName = "Anthony_CV.docx";
        contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      } else if (fs.existsSync(docPath)) {
        filePath = docPath;
        downloadName = "Anthony_CV.doc";
        contentType = "application/msword";
      } else {
        // Fallback to a placeholder (profile headshot) if no CV uploaded yet
        const fallbackPath = path.join(process.cwd(), "anthony_suit.png");
        if (fs.existsSync(fallbackPath)) {
          filePath = fallbackPath;
          downloadName = "Anthony_CV.png";
          contentType = "image/png";
        }
      }

      if (!filePath) {
        return res.status(404).send("CV not found");
      }

      res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
      res.setHeader("Content-Type", contentType);

      const stream = fs.createReadStream(filePath);
      stream.on("error", (err) => {
        console.error("Stream error downloading CV:", err);
        if (!res.headersSent) {
          res.status(500).send("Error downloading file");
        }
      });
      stream.pipe(res);
    } catch (error) {
      console.error("Error downloading CV:", error);
      if (!res.headersSent) {
        res.status(500).send("Server error during download");
      }
    }
  });
 
  // API Route to save contact form messages
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const filePath = path.join(process.cwd(), "messages.json");
      
      let messages: any[] = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, "utf-8");
          messages = JSON.parse(fileData);
        } catch (e) {
          console.error("Error reading messages.json, resetting file", e);
        }
      }

      const newMessage = {
        id: Date.now().toString(),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };

      messages.push(newMessage);
      
      // Enforce capacity of up to 500 messages
      if (messages.length > 500) {
        messages = messages.slice(-500);
      }
      
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

      console.log(`[Contact Form] New message from ${name} (${email}) saved.`);
      return res.json({ success: true, message: "Delivered successfully" });
    } catch (error) {
      console.error("Error saving message:", error);
      return res.status(500).json({ error: "Failed to process message" });
    }
  });

  // API Route to verify admin passcode
  app.post("/api/verify-passcode", (req, res) => {
    const passcode = sanitizePasscode(req.body.passcode);
    if (passcode === ADMIN_PASSCODE) {
      return res.json({ success: true });
    }
    return res.status(401).json({ success: false, error: "Invalid passcode" });
  });

  // API Route to load contact messages
  app.get("/api/messages", (req, res) => {
    const passcode = sanitizePasscode(req.headers["x-admin-passcode"]);
    if (passcode !== ADMIN_PASSCODE) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
      const filePath = path.join(process.cwd(), "messages.json");
      let messages: any[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        messages = JSON.parse(fileData);
      }
      // Sort newest first
      messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return res.json(messages);
    } catch (error) {
      console.error("Error reading messages:", error);
      return res.status(500).json({ error: "Failed to load messages" });
    }
  });

  // API Route to delete a contact message
  app.delete("/api/messages/:id", (req, res) => {
    const passcode = sanitizePasscode(req.headers["x-admin-passcode"]);
    if (passcode !== ADMIN_PASSCODE) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
      const { id } = req.params;
      const filePath = path.join(process.cwd(), "messages.json");
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        let messages = JSON.parse(fileData);
        messages = messages.filter((m: any) => m.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
      }
      return res.json({ success: true });
    } catch (error) {
      console.error("Error deleting message:", error);
      return res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // API Route to purge all messages
  app.delete("/api/messages", (req, res) => {
    const passcode = sanitizePasscode(req.headers["x-admin-passcode"]);
    if (passcode !== ADMIN_PASSCODE) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
      const filePath = path.join(process.cwd(), "messages.json");
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return res.json({ success: true });
    } catch (error) {
      console.error("Error purging messages:", error);
      return res.status(500).json({ error: "Failed to purge messages" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
  }

  // Serve static images/files from root (handles uploaded assets in both dev and prod)
  // This must be placed AFTER Vite middleware (in dev) and dist middleware (in prod)
  // to avoid intercepting source code files (.ts, .tsx, index.html).
  app.use(express.static(process.cwd()));

  // Fallback for SPA routing in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "dist");
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
