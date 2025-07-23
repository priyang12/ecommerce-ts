export const API_ENDPOINTS = {
  // Cart API
  CART: "/api/cart",
  CART_ITEM: (id: string) => `/api/cart/${id}`,
  // Orders API
  ORDERS: "/api/orders",
  ORDER_DETAILS: (id: string) => `/api/orders/order/${id}`,
  // Product API
  PRODUCTS: "/api/products",
  SINGLE_PRODUCT: (id: string) => `/api/products/product/${id}`,
  SEARCH: (query: string) => `/api/products/${query}`,
  TOP_PRODUCTS: "/api/products/top",
  // Review API
  POST_REVIEW: "/api/reviews",
  PRODUCT_REVIEWS: (productId: string) => `/api/reviews/ProductId/${productId}`,
  // WishList API
  WISHLIST: "/api/wishlist",
};
