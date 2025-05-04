///\
///
///2) Directory Content Search:
//Goal: Create a tool that searches for a specific text string within all files (e.g., .txt, .js) in a given directory.
//Usage: node search.js <directory_path> "search_term"
//Concepts: process.argv (get path and term), fs.readdir (list directory contents), fs.readFile (read file content), string.includes() (or regex for searching), potentially recursive function calls to search subdirectories.

const fs = require("fs/promises");
const path = require("path");

const directoryPath = process.argv[2];
const searchTerm = process.argv[3];

if (!directoryPath || !searchTerm) {
  console.error("chawere tavidan wesivrad.");
}

const searchFiles = async (dirPath, term) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await searchFiles(entryPath, term);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".txt") || entry.name.endsWith(".js"))
      ) {
        const content = await fs.readFile(entryPath, "utf-8");
        if (content.includes(term)) {
          console.log(`Found "${term}" in ${entryPath}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error`, err);
  }
};

searchFiles(directoryPath, searchTerm);
