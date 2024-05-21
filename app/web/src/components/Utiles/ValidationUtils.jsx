// validationUtils.js

/**
 * Validates a username.
 * @param {string} username - The username to validate.
 * @returns {object} An object indicating whether the username is valid and an error message if it's not.
 */
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

/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {object} An object indicating whether the email address is valid and an error message if it's not.
 */
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

/**
 * Validates a password.
 * @param {string} password - The password to validate.
 * @returns {object} An object indicating whether the password is valid and an error message if it's not.
 */
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

/**
 * Validates if two passwords match.
 * @param {string} password - The first password.
 * @param {string} repeatPassword - The second password to compare with the first one.
 * @returns {object} An object indicating whether the passwords match and an error message if they don't.
 */
export const validatePasswordMatch = (password, repeatPassword) => {
  // Vérifier si les mots de passe correspondent
  return {
    isValid: password === repeatPassword,
    errorMessage: "error.passwordNotMatch",
  };
};

/**
 * Validates a password or allows it to be null.
 *@param {string} password - The password to validate.
 *@returns {object} An object indicating whether the password is valid or null and an error message if it's not valid.
 */
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

/**
 * Validates a verification code.
 * @param {string} code - The verification code to validate.
 * @returns {object} An object indicating whether the code is valid and an error message if it's not.
*/
export const validateCode = (Code) => {
  if (Code.length >= 4 && Code.length <= 6) {
    return {
      isValid: true,
    };
  }

  return {
    isValid: false,
    errorMessage: "error.codeNotFound",
  };
};
