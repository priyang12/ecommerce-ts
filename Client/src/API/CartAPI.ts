import axios from "axios";

export const LoadCartQuery = async () => {
  try {
    const response = await axios.get("/api/cart");
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const AddToCartQuery = async (data: { id: string; qty: number }) => {
  try {
    const response = await axios.post("/api/cart", data);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const RemoveFromCartQuery = async (id: any) => {
  try {
    console.log(id);
    const response = await axios.delete(`/api/cart/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
