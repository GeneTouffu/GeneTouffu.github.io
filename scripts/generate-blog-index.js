import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsDir = path.join(__dirname, "..", "blog");
const outputPath = path.join(__dirname, "..", "public", "blog-index.json");

function getMarkdownFiles(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

const markdownFiles = getMarkdownFiles(blogsDir);

const blogs = markdownFiles.map((filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);

  const relativePath = path.relative(blogsDir, filePath);

  return {
    ...data,
  };
});

blogs.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

fs.writeFileSync(outputPath, JSON.stringify(blogs, null, 2) + "\n");

console.log(`Generated blog index with ${blogs.length} posts.`);
console.log(`Output: ${outputPath}`);
