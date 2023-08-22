export function extractFilesNames(images) {
  return images.map((img) => {
    const urlParts = img.publicUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];
    return fileName;
  });
}
