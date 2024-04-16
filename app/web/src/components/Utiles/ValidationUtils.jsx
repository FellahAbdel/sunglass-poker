// validationUtils.js

// Validation pseudo
export const validateUsername = (username) => {
  // Vérifiez si le pseudo a au moins 3 caractères
  return {
    isValid: username.length >= 3,
    errorMessage: "Username must have at least 3 characters",
  };
};

// Validation e-mail
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    errorMessage: "Invalid email address",
  };
};

// Validation mot de passe
export const validatePassword = (password) => {
  // Vérifier si le mot de passe a au moins 6 caractères
  return {
    isValid: password.length >= 6,
    errorMessage: "Password must have at least 6 characters",
  };
};

// Vérification correspondance mots de passe
export const validatePasswordMatch = (password, repeatPassword) => {
  // Vérifier si les mots de passe correspondent
  return {
    isValid: password === repeatPassword,
    errorMessage: "Passwords do not match",
  };
};
