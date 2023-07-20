function prevStep(step, setStep) {
  if (step > 0) {
    setStep((prevStep) => prevStep - 1);
  }
}
export default prevStep;
