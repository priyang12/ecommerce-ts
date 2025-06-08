import axios from "axios";

const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
