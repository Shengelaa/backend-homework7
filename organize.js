//
// 1) File Organizer CLI:
// Goal: Create a script that organizes files in a specified directory into subfolders based on their file extension (e.g., .jpg, .png -> images/, .pdf -> documents/, .mp3 -> audio/).
// Usage: node organize.js <directory_path>
// Concepts: process.argv (get directory path), fs.promises (list files, check stats, create directories, move files).

const fs = require("fs/promises");
const path = require("path");

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error("Please provide a directory path.");
}

const organizeFiles = async (dirPath) => {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();
        let folderName;

        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
          folderName = "images";
        } else if (ext === ".pdf") {
          folderName = "documents";
        } else if (ext === ".mp3") {
          folderName = "audio";
        }

        const destDir = path.join(dirPath, folderName);
        await fs.mkdir(destDir);

        const destPath = path.join(destDir, file);
        await fs.rename(filePath, destPath);
      }
    }
  } catch (err) {
    console.error("Error", err);
  }
};

organizeFiles(directoryPath);
