//3) Code Line Counter:
//Goal: Count the total number of lines in all .js files within a specified directory (optionally excluding blank lines and comments).
//Usage: node linecount.js <directory_path>
//Concepts: process.argv (get path), fs.readdir, fs.readFile (read file contents), string splitting (.split('\n')) and filtering logic. Bonus: Make it recursive for subdirectories.

const fs = require("fs/promises");
const path = require("path");

const directoryPath = process.argv[2];
const excludeComments = process.argv[3];

const excludeBlanklines = process.argv[4];

if (!directoryPath) {
  console.log("give directory path");
}

const countlines = async (dirPath, excludeComments, excludeBlanklines) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    let Lines = 0;
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        Lines += await countlines(
          entryPath,
          excludeComments,
          excludeBlanklines
        );
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        const content = await fs.readFile(entryPath, "utf-8");
        let lines = content.split(`\n`);
        if (excludeComments) {
          lines = lines.filter(
            (line) => !line.trim().startsWith("//") && line.trim()
          );
        } else if (excludeBlanklines) {
          lines = lines.filter((line) => line.trim());
        }
        Lines += lines.length;
      }
    }
    return Lines;
  } catch (err) {
    console.log(err);
  }
};

countlines(
  directoryPath,
  excludeComments === "true",
  excludeBlanklines === "true"
).then((totalLines) => {
  console.log(`Total lines: ${totalLines}`);
});
