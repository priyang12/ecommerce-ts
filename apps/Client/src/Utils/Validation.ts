/**
 * Validates a name (3-10 characters)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const ValidateName = (name: string) => {
  if (name.length < 3 || name.length > 10) return false;
  return true;
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const ValidateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase()) || email === "") return false;
  return true;
};

/**
 * Validates password (min 6 characters)
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
export const ValidatePassword = (password: string) => {
  if (password.length < 6) return false;
  return true;
};

/**
 * Confirms password match
 * @param {string} password - First password
 * @param {string} password2 - Second password
 * @returns {boolean} True if matching
 */
export const ConfirmPassword = (password: string, password2: string) => {
  if (password !== password2) return false;
  return true;
};
