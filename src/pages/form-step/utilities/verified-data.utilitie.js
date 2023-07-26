export const verifiedData = (object) => {
  const entries = Object.entries(object);
  const errors = [];

  entries.forEach((entry) => {
    const [key, value] = entry;
    if (value === undefined || !value) {
      errors.push("Falta un valor en " + key);
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
  });

  return errors.length > 0 ? errors : null;
};
