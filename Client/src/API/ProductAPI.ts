import axios from "axios";

export const LoadProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
