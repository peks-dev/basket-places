import Compressor from "compressorjs";

export async function compressImage(imageFile) {
  return new Promise((resolve, reject) => {
    new Compressor(imageFile, {
      quality: 0.7, // Puedes ajustar este valor para controlar la calidad de compresión (0.1 a 1)
      maxWidth: 800, // Puedes ajustar este valor para limitar el ancho máximo de la imagen
      maxHeight: 800, // Puedes ajustar este valor para limitar la altura máxima de la imagen
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(new Error("Error al comprimir la imagen: " + err));
      },
    });
  });
}
