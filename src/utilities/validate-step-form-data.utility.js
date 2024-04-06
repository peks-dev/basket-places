export default function validateStepFormData(formData) {
  const emptyFields = [];

  for (const [key, value] of Object.entries(formData)) {
    // Verifica si el valor es null o un arreglo vacío
    if (
      (value === null || (Array.isArray(value) && value.length === 0)) &&
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
    }
  }

  return emptyFields;
}
