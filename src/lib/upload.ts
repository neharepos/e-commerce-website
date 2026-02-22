import { writeFile } from "fs/promises";
import path from "path";

export async function saveImage(file: File) {
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Path to your public/uploads folder
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, file.name);

  await writeFile(filePath, buffer);

  // Return the web-accessible path
  return `/uploads/${file.name}`;
}