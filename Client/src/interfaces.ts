export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Product = {
  _id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  rating: number;
  numReviews: number;
};

export interface DetailedProduct extends Product {
  countInStock: number;
  description: string;
  brand: string;
  category: string;
  user: string;
  reviews: Review[];
  Date: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  homeAddress: string;
  city: string;
  postalCode: string;
}

export interface Cart {
  _id: string;
  product: ListProduct;
  qty: number;
}

export interface ListProduct {
  price: number;
  countInStock: number;
  _id: string;
  name: string;
  image: string;
}

export interface OrderItems {
  _id: string;
  product: {
    price: string;
    _id: string;
    name: string;
    image: string;
  };
  qty: string;
}

export interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isDelivered: boolean;
}

export interface FullOrder {
  id: string;
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
  isDelivered: boolean;
  user: string;
  orderItems: OrderItems[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
}
