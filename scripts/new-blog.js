import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  const title = await question("Title: ");
  const category = await question("Category: ");
  const tagsInput = await question("Tags (comma separated): ");

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(title);
  const categorySlug = slugify(category);

  const tags = tagsInput
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => `  - ${tag}`)
    .join("\n");

  const templatePath = path.join(__dirname, "..", "docs", "blog_format.md");

  const template = fs.readFileSync(templatePath, "utf8");

  const content = template
    .replaceAll("{{title}}", title)
    .replaceAll("{{date}}", date)
    .replaceAll("{{tags}}", tags)
    .replaceAll("{{slug}}", slug);

  const categoryDir = path.join(__dirname, "..", "blog", categorySlug);

  fs.mkdirSync(categoryDir, { recursive: true });

  const filePath = path.join(categoryDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`A blog already exists: ${filePath}`);
    rl.close();
    process.exit(1);
  }

  fs.writeFileSync(filePath, content);

  console.log(`\nCreated: ${filePath}`);

  rl.close();
}

main();
