export const setScheduleStates = (e, setSelectedDays, setTime) => {
  const { value, type, checked } = e.target;
  if (type === "checkbox") {
    setSelectedDays((prevSelectedDays) => {
      if (checked) {
        // Agregar el día si está marcado
        return [...prevSelectedDays, value];
      } else {
        // Quitar el día si está desmarcado
        return prevSelectedDays.filter((day) => day !== value);
      }
    });
  } else {
    setTime(value);
  }
};
