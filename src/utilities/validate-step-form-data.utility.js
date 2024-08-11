export default function validateStepFormData(formData) {
  const emptyFields = [];

  for (const [key, value] of Object.entries(formData)) {
    // Verifica si el valor es null, un arreglo vacío o un string vacío
    if (
      (value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)) &&
      key !== "id" &&
      key !== "owner"
    ) {
      emptyFields.push(key);
    } else if (
      // Verifica si la ubicación está bien definida
      key === "location" &&
      (value.country === null ||
        value.state === null ||
        value.city === null ||
        Object.keys(value.coordinates).length === 0)
    ) {
      emptyFields.push(key);
    } else if (key === "images"){
      // verificar que sean 2 imagenes como minimo
      if (value.length < 2) {
        emptyFields.push(key);
      }
    }
  } 

  return emptyFields;
}
