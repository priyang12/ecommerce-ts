import axios from "axios";

export const LoadWishListQuery = async () => {
  try {
    const response = await axios.get("/api/wishlist");
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const AddWishlistQuery = async (id: string) => {
  try {
    const response = await axios.patch(`/api/wishlist/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const RemoveWishlistQuery = async (id: any) => {
  try {
    const response = await axios.delete(`/api/wishlist/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
