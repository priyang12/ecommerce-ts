export const API_ENDPOINTS = {
  CART: "/api/cart",
  CART_ITEM: (id: string) => `/api/cart/${id}`,
  ORDERS: "/api/orders",
  ORDER_DETAILS: (id: string) => `/api/orders/order/${id}`,
};
