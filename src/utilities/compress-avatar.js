const compressAvatar = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 150;
        const maxHeight = 150;
        let width = img.width;
        let height = img.height;

        // Redimensionar la imagen manteniendo la proporción
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dibujar la imagen en el lienzo con el tamaño reducido
        ctx.drawImage(img, 0, 0, width, height);

        // Obtener la imagen comprimida como un Blob
        canvas.toBlob(
          (blob) => {
            // Crear un nuevo archivo con la imagen comprimida y la extensión cambiada a JPEG
            const compressedFileName = file.name.replace(/\.[^.]+$/, ".jpeg");
            const compressedFile = new File([blob], compressedFileName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            // Resolver con el archivo comprimido
            resolve(compressedFile);
          },
          "image/jpeg",
          0.8
        ); // Calidad del 80%
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

export default compressAvatar;
