export type Product = {
  _id: string;
  name: string;
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
  country: string;
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
