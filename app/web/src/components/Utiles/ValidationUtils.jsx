// validationUtils.js

// Validation pseudo
export const validateUsername = (username) => {
  if (username.length < 3) {
    return {
      isValid: false,
      errorMessage: "error.badUsername",
    };
  }

  if (username.length > 20) {
    return {
      isValid: false,
      errorMessage: "error.usernameTooLong",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
};

// Validation e-mail
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length > 254) {
    return {
      isValid: false,
      errorMessage: "error.emailTooLong",
    };
  }

  return {
    isValid: emailRegex.test(email),
    errorMessage: emailRegex.test(email) ? "" : "error.invalidEmail",
  };
};

// Validation mot de passe
export const validatePassword = (password) => {
  if (password.length > 50) {
    return {
      isValid: false,
      errorMessage: "error.passwordTooLong",
    };
  }

  // Vérifier si le mot de passe a au moins 6 caractères
  return {
    isValid: password.length >= 6,
    errorMessage: password.length >= 6 ? "" : "error.password6Characters",
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

//Fonction pour la création de table

export const validatePasswordOrNull = (password) => {

  if (password.length > 50) {
    return {
      isValid: false,
      errorMessage: "error.passwordTooLong",
    };
  }
  // Vérifier si le mot de passe a au moins 6 caractères
  return {
    isValid: password.length === 0 || password.length >= 6,
    errorMessage: "Password must have at least 6 characters",
  };
};
