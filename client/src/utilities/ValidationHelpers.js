const numbers = /^[0-9.]+$/

const letters = /^[a-zA-Z .-]+$/

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$/
  return re.test(String(email).toLowerCase())
}

const validateLength = (input, min, max) => {
  let noSpaceInput = input.replace(/\s/g, '')
  return (noSpaceInput && noSpaceInput.length >= min && noSpaceInput.length <= max)
}

const validateSpacing = (input) => {
  let newInput = input.replace(/\s+/g, ' ')
  return (input === newInput)
}

const validateSpacePosition = (input) => {
  return (input[0] !== ' ' || input[input.length - 1] !== ' ')
}

const validateCharacters = (input) => {
  let legalBillingDetailsFormat = /^[a-zA-Z0-9, \/#'"()-]{2,}$/
  return legalBillingDetailsFormat.test(input)
}

const isFormReady = (data, errors, submitButtonDisabled, conditionOne = true, conditionTwo = true) => {
  let formData = Object.values(data)
  let showErrors = Object.values(errors)
  return (!formData.includes(null) && submitButtonDisabled && !showErrors.includes(true) && conditionOne && conditionTwo)
}

const addError = async (errorField, errorFieldMsg, errorMsgs, errorHandling, btnHandling, isValid = true, updateHandling) => {
  await errorHandling({
    [errorField]: true,
    [errorFieldMsg]: errorMsgs
  })

  if (btnHandling) {
    await btnHandling()
  }

  if (updateHandling) {
    await updateHandling({ isValid: isValid })
  }
}

const removeError = async (errorField, errorFieldMsg, errorHandling) => {
  await errorHandling({
    [errorField]: false,
    [errorFieldMsg]: ''
  })
}

export {
  numbers,
  letters,
  validateEmail,
  validateLength,
  validateSpacing,
  validateSpacePosition,
  validateCharacters,
  isFormReady,
  addError,
  removeError
}
