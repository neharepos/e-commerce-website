export function generateUniqueFileName(originalName: string): string {
  // 1. Get the file extension (e.g., .jpg, .png)
  const extension = originalName.split('.').pop();
  
  // 2. Create a timestamp (e.g., 1740460000)
  const timestamp = Date.now();
  
  // 3. Create a random string to be 100% safe
  const randomString = Math.random().toString(36).substring(2, 8);
  
  // 4. Combine them: 1740460000-abc123.jpg
  return `${timestamp}-${randomString}.${extension}`;
}