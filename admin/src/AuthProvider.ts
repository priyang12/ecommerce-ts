import axios from "axios";

const authProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email: username,
        password,
      });
      localStorage.setItem("token", data.token);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.msg);
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  checkError: (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: async () => {
    try {
      const isUser = sessionStorage.getItem("User");
      if (isUser) {
        return JSON.parse(isUser);
      }
      const token = localStorage.getItem("token") || "";
      axios.defaults.headers.common["x-auth-token"] = token;
      const { data }: any = await axios.get("/api/users");
      sessionStorage.setItem("User", JSON.stringify(data));
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.msg);
    }
  },
  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
