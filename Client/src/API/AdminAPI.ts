import axios from "axios";

export const LoadUsers = async () => {
  try {
    const response = await axios.get("/api/users/admin/all");
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const AddProductCall = async (product: any) => {
  try {
    const response = await axios.post("/api/products/admin/add", product);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const DeleteProductCall = async (id: any) => {
  try {
    const response = await axios.delete(`/api/products/product/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
