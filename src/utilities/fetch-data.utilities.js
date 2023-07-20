function getSuspender(promise) {
  let status = "pending";
  let response;

  // Comprobar si la promesa se ha ejecutado y qué resultado da
  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

export function fetchData(url, headers) {
  const promise = fetch(url, { headers })
    .then((response) => response.json())
    .then((data) => data);

  return getSuspender(promise);
}
