export function nextStep(step, setStep) {
  if (step < 5) {
    setStep((prevStep) => prevStep + 1);
  }
}
export function prevStep(step, setStep) {
  if (step > 0) {
    setStep((prevStep) => prevStep - 1);
  }
}
