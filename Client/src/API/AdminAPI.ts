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
    // config multipart form dat
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await axios.post("/api/products/add", product, config);

    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const EditProductCall = async (product: any) => {
  try {
    // config multipart form dat
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const id = product.get("id");

    const response = await axios.put(
      `/api/products/product/${id}`,
      product,
      config
    );
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
