import fs from "fs";
import path from "path";
import sharp from "sharp";

const assetsFolder = path.join(process.cwd(), "public", "assets");

const supportedExtensions = [".jpg", ".jpeg", ".png"];

async function convertImage(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (!supportedExtensions.includes(extension)) {
    return;
  }

  const outputPath = filePath.replace(extension, ".webp");

  if (fs.existsSync(outputPath)) {
    console.log(`Există deja: ${outputPath}`);
    return;
  }

  try {
    await sharp(filePath).webp({ quality: 90 }).toFile(outputPath);

    console.log(`Convertit: ${filePath}`);
  } catch (error) {
    console.error(`Eroare la: ${filePath}`);
    console.error(error.message);
  }
}

async function scanFolder(folderPath) {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const fullPath = path.join(folderPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await scanFolder(fullPath);
    } else {
      await convertImage(fullPath);
    }
  }
}

async function startConversion() {
  if (!fs.existsSync(assetsFolder)) {
    console.error("Folderul public/assets nu există.");
    return;
  }

  console.log("Începe conversia imaginilor...");

  await scanFolder(assetsFolder);

  console.log("Conversia s-a terminat.");
}

startConversion();
