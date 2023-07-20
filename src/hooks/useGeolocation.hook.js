const useGeolocation = () => {
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation not supported"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  };

  return getUserLocation;
};

export default useGeolocation;
