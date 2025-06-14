import axios from "axios";

/**
 * Sets or removes the authentication token for axios requests and localStorage
 *
 * @function setAuthToken
 * @param {string|null} token - The authentication token to set. Pass `null` to remove the token.
 *
 * @example
 * // Set token
 * setAuthToken('your.jwt.token');
 *
 * // Remove token
 * setAuthToken(null);
 *
 */
const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
