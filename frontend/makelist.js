import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseFolder = path.join(__dirname, "public/assets");

const categories = fs.readdirSync(baseFolder).filter(name =>
  fs.statSync(path.join(baseFolder, name)).isDirectory()
);

const data = {};

const allowedExtensions = [".pdf", ".ggb"];

for (const category of categories) {
  const categoryPath = path.join(baseFolder, category);
  const items = fs.readdirSync(categoryPath);

  // Filter files with allowed extensions (.pdf and .ggb)
  const files = items.filter(file => 
    allowedExtensions.some(ext => file.endsWith(ext))
  );
  const subDirs = items.filter(item =>
    fs.statSync(path.join(categoryPath, item)).isDirectory()
  );

  data[category] = {};

  if (files.length > 0) {
    data[category]["root"] = files.map(file => ({
      title: file.replace(/\.(pdf|ggb)$/, "").replace(/[-_]/g, " "),
      file: `/assets/${category}/${file}`
    }));
  }

  for (const subDir of subDirs) {
    const subPath = path.join(categoryPath, subDir);
    const subFiles = fs.readdirSync(subPath).filter(f =>
      allowedExtensions.some(ext => f.endsWith(ext))
    );

    data[category][subDir] = subFiles.map(file => ({
      title: file.replace(/\.(pdf|ggb)$/, "").replace(/[-_]/g, " "),
      file: `/assets/${category}/${subDir}/${file}`
    }));
  }
}

const outputPath = path.join(__dirname, "src/data/generatedPdfList.js");
fs.writeFileSync(outputPath, `export default ${JSON.stringify(data, null, 2)};`);
console.log("✅ PDF and Geogebra list generated successfully.");
