export const QUERY_KEYS = {
  CART: "Cart",
  // Order API Keys
  ORDERS: "orders",
  ORDER_DETAILS: (id: string) => `orderDetails/${id}`,
  MAKE_ORDER: "makeOrder",
  // Product API Keys
  PRODUCTS: "products",
  TOP_PRODUCTS: "topProducts",
  // Review API Keys
  REVIEWS: (productId: string) => ["reviews", productId] as const,
  USER_REVIEWS: "UserReview",
  // WishList API Keys
  WISHLIST: "wishList",
};
