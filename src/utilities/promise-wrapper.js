export const wrapPromise = (promise) => {
  let status = "pending";
  let result;
  let suspender = promise.then((response) => {
    status = "success";
    result = response;
  });
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      }
      if (status === "success") {
        return result;
      }
    },
  };
};
