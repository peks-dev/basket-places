export const verifiedData = (object) => {
  const entries = Object.entries(object);
  const errors = [];

  entries.forEach((entry) => {
    const [key, value] = entry;
    if (value === undefined || !value) {
      errors.push("No seleccionaste nada en " + key);
    }
    if (key === "location") {
      if (
        value.country === null ||
        value.state === null ||
        Object.keys(value.coordinates).length === 0
      ) {
        errors.push("La ubicación no está bien definida");
      }
    }
    if (key === "schedules" && Array.isArray(value) && value.length === 0) {
      errors.push("Establece un conjunto de dias y horario");
    }
    if (key === "images" && Array.isArray(value) && value.length < 2) {
      errors.push("Selecciona minimo 2 imagenes");
    }
  });

  return errors.length > 0 ? errors : null;
};
