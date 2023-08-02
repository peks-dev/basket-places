export async function isImageHorizontal(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const isHorizontal = image.width > image.height;
        resolve(isHorizontal);
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}
