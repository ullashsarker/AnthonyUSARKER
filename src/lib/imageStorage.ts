// IndexedDB storage helper for persisting user photos locally in the browser.
// This allows the user to upload their actual photos via the web UI and keep them persisted.

const DB_NAME = 'anthony_portfolio_db';
const STORE_NAME = 'user_images';
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window === "undefined" || !window.indexedDB) {
        throw new Error("IndexedDB is not supported or accessible in this environment.");
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

export async function saveImageToDB(key: string, base64Data: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(base64Data, key);

    request.onsuccess = () => {
      // Also dispatch a custom event to notify components that the image updated
      window.dispatchEvent(new CustomEvent('portfolio-image-updated', { detail: { key, value: base64Data } }));
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function loadImageFromDB(key: string): Promise<string | null> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.error('Failed to load image from IndexedDB', err);
    return null;
  }
}

export async function loadAllImagesFromDB(): Promise<Record<string, string>> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();
      const results: Record<string, string> = {};

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue | null>).result;
        if (cursor) {
          results[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.error('Failed to load all images from DB', err);
    return {};
  }
}

export async function deleteImageFromDB(key: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(key);

    request.onsuccess = () => {
      window.dispatchEvent(new CustomEvent('portfolio-image-updated', { detail: { key, value: null } }));
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Map logical keys to the original file names and unsplash fallbacks
export const IMAGE_MAPPING = {
  heroMain: {
    label: 'Hero Section Main Photo (Gradient Orb)',
    originalFile: 'anthony_hero.png',
    oldFile: 'anthony_hero.png',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Main hero photo with sunglasses, hoodie, and gradient cyan-to-pink orb background.'
  },
  profileHeadshot: {
    label: 'Profile Headshot (Suit & Tie)',
    originalFile: 'anthony_suit.png',
    oldFile: 'Anthony CV #NEW.pdf_2.jpg',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    description: 'First attached image. Passport-style portrait headshot wearing a black suit and black tie, clean white background.'
  },
  lifestyleSea: {
    label: 'Standing by the Sea (Saint Martin)',
    originalFile: 'anthony_beach.png',
    oldFile: 'b68b96d9-1f39-497a-89fc-5f51ea76f693.jpeg',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    description: 'Second attached image. Standing by the blue ocean horizon, looking left, adjusting grey button-up shirt collar.'
  },
  lifestyleElite: {
    label: 'Elite Continental Suit (Steps)',
    originalFile: 'anthony_elite.png',
    oldFile: '14423e2f-bf2c-452d-810c-37c1c57739f2.jpeg',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    description: 'Third attached image. Standing on the stairs of "Elite Continental" at night, in a black suit, lime green shirt, and glasses.'
  },
  lifestyleBicycle: {
    label: 'Coastal Cycling (Beach & Boats)',
    originalFile: 'anthony_bicycle.png',
    oldFile: '28ac5e8a-a8d9-4106-b978-bb251fdec3f9.jpeg',
    fallback: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&w=600&q=80',
    description: 'Fourth attached image. Sitting on a blue AKIJ mountain bicycle on a beach with rustic fishing boats behind.'
  },
  lifestyleNight: {
    label: 'Rooftop Pool Event (Night Lights)',
    originalFile: 'anthony_night.png',
    oldFile: 'a5da88b6-e200-41af-9660-ae97e80e3e30.jpeg',
    fallback: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    description: 'Fifth attached image. On a rooftop poolside deck at night, wearing a blazer/white shirt, with neon ambient glows.'
  },
  lifestyleStairs: {
    label: 'Elite Continental Steps',
    originalFile: 'anthony_stairs.png',
    oldFile: 'anthony_stairs.png',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    description: 'Stairs of Elite Continental at night, in a black suit, lime green shirt, and glasses.'
  }
} as const;

export type ImageKey = keyof typeof IMAGE_MAPPING;

// React Hook to get the active image source reactively
import { useState, useEffect } from 'react';

export function usePortfolioImage(key: ImageKey) {
  const mapping = IMAGE_MAPPING[key];
  const [src, setSrc] = useState<string>(`/${mapping.originalFile}`);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      // 1. Try loading from IndexedDB
      const dbData = await loadImageFromDB(key);
      if (!active) return;
      if (dbData) {
        setSrc(dbData);
        setIsLoading(false);
        return;
      }

      // 2. Fall back to local server file with the user-defined name
      // We will check if the image fails to load via an Image object
      const img = new Image();
      img.src = `/${mapping.originalFile}`;
      img.onload = () => {
        if (active) {
          setSrc(`/${mapping.originalFile}`);
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        // Also try old filename if available
        const imgOld = new Image();
        imgOld.src = `/${mapping.oldFile}`;
        imgOld.onload = () => {
          if (active) {
            setSrc(`/${mapping.oldFile}`);
            setIsLoading(false);
          }
        };
        imgOld.onerror = () => {
          if (active) {
            // 3. Fall back to unsplash
            setSrc(mapping.fallback);
            setIsLoading(false);
          }
        };
      };
    }

    load();

    // Listen for real-time updates from the Admin/Upload panel
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ key: string; value: string | null }>;
      if (customEvent.detail.key === key) {
        if (customEvent.detail.value) {
          setSrc(customEvent.detail.value);
        } else {
          load(); // Re-trigger normal waterfall load
        }
      }
    };

    window.addEventListener('portfolio-image-updated', handleUpdate);

    return () => {
      active = false;
      window.removeEventListener('portfolio-image-updated', handleUpdate);
    };
  }, [key]);

  return { src, isLoading };
}

export async function syncImagesToFilesystem(passcode: string): Promise<void> {
  try {
    for (const key of Object.keys(IMAGE_MAPPING) as ImageKey[]) {
      const base64 = await loadImageFromDB(key);
      if (base64) {
        const mapping = IMAGE_MAPPING[key];
        console.log(`Syncing ${key} to backend...`);
        const response = await fetch('/api/save-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': passcode,
          },
          body: JSON.stringify({
            filename: mapping.originalFile,
            base64: base64,
          }),
        });
        if (response.ok) {
          console.log(`Successfully synced ${key} to server filesystem.`);
        } else {
          console.error(`Failed to sync ${key} to server filesystem:`, await response.text());
        }
      }
    }
  } catch (error) {
    console.error('Error in syncImagesToFilesystem:', error);
  }
}

export async function uploadAndSyncImage(key: ImageKey, base64Data: string, passcode: string): Promise<boolean> {
  try {
    // 1. Save to local IndexedDB for immediate responsive rendering
    await saveImageToDB(key, base64Data);

    // 2. Sync to server filesystem so other visitors can see it
    const mapping = IMAGE_MAPPING[key];
    const response = await fetch('/api/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Passcode': passcode,
      },
      body: JSON.stringify({
        filename: mapping.originalFile,
        base64: base64Data,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error uploading and syncing image:', error);
    return false;
  }
}


