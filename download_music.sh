#!/bin/bash
# Download YouTube audio for portfolio background music
# Usage: bash download_music.sh

echo "🎵 Downloading background music from YouTube..."

# Check if yt-dlp is installed
if ! command -v yt-dlp &> /dev/null; then
    echo "❌ yt-dlp is not installed. Installing..."
    pip3 install yt-dlp
fi

# Create audio directory if it doesn't exist
mkdir -p public/audio

# Download the YouTube video as MP3 audio
yt-dlp \
    --extract-audio \
    --audio-format mp3 \
    --audio-quality 128K \
    --output "public/audio/bg_music.%(ext)s" \
    --no-playlist \
    "https://www.youtube.com/watch?v=bP9gMpl1gyQ"

if [ $? -eq 0 ]; then
    echo "✅ Download complete! File saved to public/audio/bg_music.mp3"
    echo "📁 File size: $(ls -lh public/audio/bg_music.mp3 | awk '{print $5}')"
else
    echo "❌ Download failed. Try running manually:"
    echo "   yt-dlp --extract-audio --audio-format mp3 --audio-quality 128K -o 'public/audio/bg_music.%(ext)s' 'https://www.youtube.com/watch?v=bP9gMpl1gyQ'"
fi
