import axios from "axios";

export const LoadUsers = async () => {
  try {
    const response = await axios.get("/api/users/admin/all");
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
