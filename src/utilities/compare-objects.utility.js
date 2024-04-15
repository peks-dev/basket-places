export function compareObjects(baseObject, objectToCompare) {
  const differences = {};

  // Iterar sobre las propiedades del objeto base
  for (const property in baseObject) {
    // Verificar si la propiedad existe en el objeto a comparar
    if (objectToCompare.hasOwnProperty(property)) {
      // Verificar si los valores de las propertyes son diferentes
      if (
        JSON.stringify(baseObject[property]) !==
        JSON.stringify(objectToCompare[property])
      ) {
        // Almacenar la property y su valor en la lista de diferencias
        differences[property] = {
          newData: baseObject[property],
          oldData: objectToCompare[property],
        };
      }
    }
  }

  return differences;
}
