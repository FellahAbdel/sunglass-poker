// validationUtils.js

// Validation pseudo
export const validateUsername = (username) => {
  // Vérifiez si le pseudo a au moins 3 caractères
  return {
    isValid: username.length >= 3,
    errorMessage: "error.badUsername",
  };
};

// Validation e-mail
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    errorMessage: "error.invalidEmail",
  };
};

// Validation mot de passe
export const validatePassword = (password) => {
  // Vérifier si le mot de passe a au moins 6 caractères
  return {
    isValid: password.length >= 6,
    errorMessage: "error.password6Characters",
  };
};

// Vérification correspondance mots de passe
export const validatePasswordMatch = (password, repeatPassword) => {
  // Vérifier si les mots de passe correspondent
  return {
    isValid: password === repeatPassword,
    errorMessage: "error.passwordNotMatch",
  };
};
