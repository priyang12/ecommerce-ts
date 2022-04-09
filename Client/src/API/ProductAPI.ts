import axios from "axios";

export const LoadProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const SingleProductCall = async (id: string) => {
  try {
    const response = await axios.get(`/api/products/product/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
