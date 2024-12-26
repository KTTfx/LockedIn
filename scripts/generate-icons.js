const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SIZE = 1024;
const BACKGROUND_COLOR = '#0A0F2C';
const FOREGROUND_COLOR = '#7C3AED';

async function generateIcon() {
  // Create a square SVG with our app icon
  const svg = `
    <svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${BACKGROUND_COLOR}"/>
      <circle cx="${ICON_SIZE/2}" cy="${ICON_SIZE/2}" r="${ICON_SIZE/3}" fill="${FOREGROUND_COLOR}" opacity="0.9"/>
      <path d="M ${ICON_SIZE/2-150} ${ICON_SIZE/2} L ${ICON_SIZE/2+150} ${ICON_SIZE/2} M ${ICON_SIZE/2} ${ICON_SIZE/2-150} L ${ICON_SIZE/2} ${ICON_SIZE/2+150}"
            stroke="white" 
            stroke-width="60"
            stroke-linecap="round"/>
    </svg>
  `;

  // Ensure assets directory exists
  const assetsDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
  }

  // Generate icon.png
  await sharp(Buffer.from(svg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));

  // Generate adaptive-icon.png
  await sharp(Buffer.from(svg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));

  // Generate favicon.png
  await sharp(Buffer.from(svg))
    .resize(32, 32)
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));

  // Generate splash.png
  const splashSvg = `
    <svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${BACKGROUND_COLOR}"/>
      <circle cx="${ICON_SIZE/2}" cy="${ICON_SIZE/2}" r="${ICON_SIZE/4}" fill="${FOREGROUND_COLOR}" opacity="0.9"/>
      <path d="M ${ICON_SIZE/2-100} ${ICON_SIZE/2} L ${ICON_SIZE/2+100} ${ICON_SIZE/2} M ${ICON_SIZE/2} ${ICON_SIZE/2-100} L ${ICON_SIZE/2} ${ICON_SIZE/2+100}"
            stroke="white" 
            stroke-width="40"
            stroke-linecap="round"/>
    </svg>
  `;

  await sharp(Buffer.from(splashSvg))
    .resize(2048, 2048)
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));

  console.log('Generated all app icons successfully!');
}

generateIcon().catch(console.error);
