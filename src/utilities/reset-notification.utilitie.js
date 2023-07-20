export function ResetNotification(setShowNotification) {
  const timer = setTimeout(() => {
    setShowNotification(false);
  }, 5200);

  return () => {
    clearTimeout(timer);
  };
}
