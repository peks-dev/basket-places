function nextStep(step, setStep) {
  if (step < 5) {
    setStep((prevStep) => prevStep + 1);
  }
}
export default nextStep;
