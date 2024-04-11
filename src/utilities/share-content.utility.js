function shareContent(title, text, url) {
  if (navigator.share) {
    // Verificar si el navegador soporta la API Web Share
    navigator
      .share({
        title, // Título del contenido a compartir
        text, // Texto del contenido a compartir
        url, // URL del contenido a compartir
      })
      .then(() => {
        console.log("Contenido compartido exitosamente.");
      })
      .catch((error) => {
        console.error("Error al compartir contenido:", error);
      });
  } else {
    // Manejar el caso en que el navegador no soporte la API Web Share
    console.log("La API Web Share no está soportada en este navegador.");
    // Aquí puedes mostrar una alternativa para compartir o un mensaje al usuario
  }
}

export default shareContent;
