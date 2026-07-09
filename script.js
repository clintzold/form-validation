
const formValidator = (() => {
  const form = document.querySelector("form")
  const emailInput = document.getElementById("email")
  const countryInput = document.getElementById("country")
  const postalInput = document.getElementById("postalCode")
  const passwordInput = document.getElementById("password")
  const passwordConfirmInput = document.getElementById("passwordConfirm")
  const formButton = document.querySelector("button")

  const inputsArray = [ emailInput, countryInput, postalInput, passwordInput, passwordConfirmInput ]

  form.addEventListener('submit', (e) => {

    e.preventDefault()
    console.log("form submitted")
  })

  form.addEventListener('change', () => {
    let valid = true

    inputsArray.forEach((input) => {
      if (!input.validity.valid) {
        valid = false
      }
    })

    if (valid) {
      formButton.disabled = false
    } else {
      formButton.disabled = true
    }


  })

  emailInput.addEventListener('change', () => {
    validateEmail(emailInput.value)
    displayError(emailInput)
  })

  countryInput.addEventListener('change', () => {

    validateCountry()
    displayError(countryInput)

    if (countryInput.validity.valid) {
    
      postalInput.disabled = false

    } else {

      postalInput.disabled = true

    }

  })

  postalInput.addEventListener('change', () => {

    const regex = getRegex()

    validatePostal(regex)

    displayError(postalInput)

  })

  passwordInput.addEventListener('change', () => {
    validatePassword(passwordInput.value)
    displayError(passwordInput)

    if (passwordInput.validity.valid) {
    
      passwordConfirmInput.disabled = false

    } else {

      passwordConfirmInput.disabled = true

    }

  })

  passwordConfirmInput.addEventListener('input', () => {

    confirmPassword(passwordConfirmInput.value)
    displayError(passwordConfirmInput)

  })

  function validateEmail(email) {

    if (!email.includes('@')) {
      emailInput.setCustomValidity("Email must include and '@' character")
      return false
    }

    const validDomain = "form-validation.com"
    const domain = email.split('@').pop().toLowerCase()

    if (domain !== validDomain) {

      console.log("email doesn't match")
       emailInput.setCustomValidity("Only emails ending with 'form-validation.com' are accepted") 

    } else {

       emailInput.setCustomValidity("") 

    }

  }

  function validatePostal(regex) {

    if (regex.test(postalInput.value)) {
      postalInput.setCustomValidity("")
    } else {
      postalInput.setCustomValidity("Please enter a valid postal code")
    }

  }

  function getRegex() {
    let regex

    if (countryInput.value === "CA") {

      regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i 

    } else if (countryInput.value === "USA") {

      regex = /^\d{5}(?:[-\s]\d{4})?$/

    } else {

      regex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i

    }

    return regex

  }

  function validateCountry() {

    if (countryInput.value.length < 2) {
      countryInput.setCustomValidity("A country must be chosen")
    } else {
      countryInput.setCustomValidity("")
    }

  }

  function validatePassword(password) {

    if ( password.length <  8 ) {
      passwordInput.setCustomValidity("Password must be at least 8 characters")
    } else if ( password.length > 20 ) {
      passwordInput.setCustomValidity("Password must be less than 20 characters")
    } else {
      passwordInput.setCustomValidity("")
    }

  }

  function confirmPassword(password) {

    if (password === passwordInput.value && passwordInput.validity.valid) {
      passwordConfirmInput.setCustomValidity("")
    } else {
      passwordConfirmInput.setCustomValidity("Passwords do not match!")
    }

  }

  function displayError(inputField) {
    const errorField = inputField.parentElement.querySelector(".errorMessage")

    errorField.innerHTML = inputField.validationMessage

    if (!inputField.validity.valid) {

      errorField.classList.add('visible')
      
    } else {

      errorField.classList.remove('visible')

    }

  }


})()
