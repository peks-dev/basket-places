export function findDifferences(objetoReferencia, objetoParaComparar) {
  const changes = {};

  function compareArrays(arrReferencia, arrComparar, path) {
    const added = [];
    const removed = [];

    // Encontrar elementos eliminados
    for (const elem of arrReferencia) {
      if (
        !arrComparar.some((el) => JSON.stringify(el) === JSON.stringify(elem))
      ) {
        removed.push(elem);
      }
    }

    // Encontrar elementos añadidos
    for (const elem of arrComparar) {
      if (
        !arrReferencia.some((el) => JSON.stringify(el) === JSON.stringify(elem))
      ) {
        added.push(elem);
      }
    }

    if (added.length > 0 || removed.length > 0) {
      changes[path] = { added, removed };
    }
  }

  function compareObjects(objReferencia, objComparar, path = "") {
    for (const key in objReferencia) {
      const newPath = path ? `${path}.${key}` : key;

      if (
        Array.isArray(objReferencia[key]) &&
        Array.isArray(objComparar[key])
      ) {
        // Ambos valores son arreglos, compararlos
        compareArrays(objReferencia[key], objComparar[key], newPath);
      } else if (
        typeof objReferencia[key] === "object" &&
        typeof objComparar[key] === "object"
      ) {
        // Ambos valores son objetos, comparar recursivamente
        compareObjects(objReferencia[key], objComparar[key], newPath);
      } else if (objReferencia[key] !== objComparar[key]) {
        // Los valores son diferentes, almacenar la diferencia

        const parts = newPath.split(".");
        let currentObj = changes;

        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!currentObj[part]) {
            currentObj[part] = {};
          }
          currentObj = currentObj[part];
        }

        currentObj[parts[parts.length - 1]] = objComparar[key];
      }
    }
  }

  compareObjects(objetoReferencia, objetoParaComparar);

  return changes;
}
