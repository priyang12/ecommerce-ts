import { DetailedProduct } from "../../interfaces";

type SearchResult = {
  products: DetailedProduct[];
  page: number;
  pages: number;
};

export const slides = [
  {
    title: "Sony Playstation 4 Pro White Version",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image: "/Photos/image-1628092377429.webp",
  },
  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image: "",
  },
  {
    title: "Mimisa Rocks",
    subtitle: "Australia",
    description: "A piece of heaven",
    image: "",
  },
  {
    title: " Playstation 4",
    subtitle: "Sony Playstation 4 Pro White Version",
    description: "A piece of heaven",
    image: "",
  },
  {
    title: "Five",
    subtitle: "Australia",
    description: "A piece of heaven",
    image: "",
  },
];

export const Products = [
  {
    rating: 3,
    numReviews: 1,
    price: 399.99,
    countInStock: 6,
    _id: "60d5e622e5179e2bb44bd83b",
    name: "Sony Playstation 4 Pro White Version",
    image: "/Photos/image-1628092377429.webp",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    user: "60d5e622e5179e2bb44bd835",
    reviews: [
      {
        _id: "612894152f469f19e8ee85e6",
        name: "priyang",
        rating: 3,
        comment: "sdadsad",
        user: "60d60298af846100040f3307",
        createdAt: "2021-08-27T07:28:21.461Z",
        updatedAt: "2021-08-27T07:28:21.461Z",
      },
    ],
    Date: "2021-06-25T14:20:18.614Z",
    __v: 1,
    createdAt: "2021-06-25T14:20:18.623Z",
    updatedAt: "2021-08-27T07:28:21.461Z",
  },
  {
    rating: 4,
    numReviews: 1,
    price: 89.99,
    countInStock: -39,
    _id: "60d5e622e5179e2bb44bd838",
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/Photos/image-1627384388351.webp",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    user: "60d5e622e5179e2bb44bd835",
    reviews: [
      {
        _id: "6128b73ebc70bc35a0b0c3d0",
        name: "Priyang",
        rating: 4,
        comment: "very good",
        user: "6106f4c09d285d000436ed0a",
        createdAt: "2021-08-27T09:58:22.657Z",
        updatedAt: "2021-08-27T09:58:22.657Z",
      },
    ],
    Date: "2021-06-25T14:20:18.612Z",
    __v: 4,
    createdAt: "2021-06-25T14:20:18.622Z",
    updatedAt: "2022-01-02T19:32:53.259Z",
  },
  {
    rating: 2.3333333333333335,
    numReviews: 3,
    price: 323.99,
    countInStock: 0,
    _id: "60d5e622e5179e2bb44bd839",
    name: "iPhone",
    image: "/Photos/image-1628092416984.webp",
    description: "Iphone is a good apple product",
    brand: "Sony",
    category: "Electronics",
    user: "60d5e622e5179e2bb44bd835",
    reviews: [
      {
        _id: "6128b08c1506272944e27155",
        name: "Priyang",
        rating: 3,
        comment: "sadsadasds",
        user: "6106f4c09d285d000436ed0a",
        createdAt: "2021-08-27T09:29:48.353Z",
        updatedAt: "2021-08-27T09:29:48.353Z",
      },
      {
        _id: "6128ab14046fa731e0b2604c",
        name: "priyang",
        rating: 0,
        comment: "dsadsad",
        user: "60d60298af846100040f3307",
        createdAt: "2021-08-27T09:06:28.926Z",
        updatedAt: "2021-08-27T09:06:28.926Z",
      },
      {
        _id: "611e381fd6a4c53048f59062",
        name: "Priyang",
        rating: 4,
        comment: "sadasdasdd",
        user: "60d5e622e5179e2bb44bd835",
        createdAt: "2021-08-19T10:53:19.690Z",
        updatedAt: "2021-08-19T10:53:19.690Z",
      },
    ],
    Date: "2021-06-25T14:20:18.613Z",
    __v: 3,
    createdAt: "2021-06-25T14:20:18.622Z",
    updatedAt: "2021-08-27T09:29:48.355Z",
  },
];

export const SerachResult: SearchResult = {
  products: Products,
  page: 1,
  pages: 1,
};

export const MockedOrderDetails = {
  shippingAddress: {
    address: "asdsad",
    city: "asdasd",
    postalcode: "asdasd",
  },
  paymentResult: {
    id: "19E044142W705484L",
    status: "COMPLETED",
    update_time: "2022-01-02T19:31:14Z",
    email_address: "sb-x1wih6477696@personal.example.com",
  },
  itemsPrice: 629.93,
  taxPrice: 62.992999999999995,
  shippingPrice: 0,
  totalPrice: 693,
  isDelivered: false,
  _id: "61d1fdcc78d91ad851125bb8",
  user: {
    _id: "6106f4c09d285d000436ed0a",
    name: "Priyang",
    email: "patelpriyang95@gmail.com",
  },
  orderItems: [
    {
      product: {
        _id: "60d5e622e5179e2bb44bd83c",
        name: "Logtech mouse",
        image:
          "https://ik.imagekit.io/5aalo5l7bu7/image-1627385386692_1jmB_46rs.webp",
        price: 5000.99,
      },
      Reviewed: false,
      qty: 5,
      _id: "63506553f20432a1a5761fbf",
    },
    {
      product: {
        _id: "6128b45753286e2ff497fbd5",
        name: "Cannon EOS 80D DSLR Camera",
        image:
          "https://ik.imagekit.io/5aalo5l7bu7/image-1627384388351_XfFBU9mag.webp",
        price: 120,
      },
      Reviewed: true,
      qty: 1,
      _id: "63514be15526b2669538bc05",
    },
    {
      product: {
        _id: "62839b2f2268bfc2e068ae83",
        name: "Merrell Women'S Bare Access Xtr Trail Running Shoes",
        image: "https://m.media-amazon.com/images/I/51bLpccQMkL.jpg",
        price: 431,
      },
      Reviewed: true,
      qty: 1,
      _id: "63514be65526b2669538bc0d",
    },
  ],
  paymentMethod: "PayPal or Credit Card",
  paidAt: "2022-01-02T19:32:28.144Z",
  createdAt: "2022-01-02T19:32:28.194Z",
  updatedAt: "2022-01-02T19:32:28.194Z",
  __v: 0,
};

export const MockedUsers = [
  {
    isAdmin: true,
    _id: "60d5e622e5179e2bb44bd835",
    name: "Priyang",
    email: "adminPriynag@gmail.com",
    createdAt: "2021-06-25T14:20:18.533Z",
    updatedAt: "2021-08-27T07:56:12.098Z",
  },
  {
    isAdmin: false,
    _id: "60d60298af846100040f3307",
    name: "priyang",
    email: "priyang@gmail.com",
    createdAt: "2021-06-25T16:21:44.732Z",
    updatedAt: "2021-10-08T12:58:27.972Z",
  },
  {
    isAdmin: true,
    _id: "6106f4c09d285d000436ed0a",
    name: "Priyang",
    email: "patelpriyang95@gmail.com",
    createdAt: "2021-08-01T19:23:44.163Z",
    updatedAt: "2022-06-08T12:01:49.380Z",
  },
  {
    isAdmin: false,
    _id: "611ad897fc8c8f1754db38a6",
    name: "sdsd",
    email: "erer@gmail.com",
    createdAt: "2021-08-16T21:28:55.256Z",
    updatedAt: "2021-08-16T21:30:07.739Z",
  },
  {
    isAdmin: false,
    _id: "611e33824521b030f0148631",
    name: "priyang",
    email: "priyang95@gmail.com",
    createdAt: "2021-08-19T10:33:38.877Z",
    updatedAt: "2021-08-19T10:33:38.877Z",
  },
  {
    isAdmin: false,
    _id: "612892102f469f19e8ee85e2",
    name: "pdsa",
    email: "sda@gmail.com",
    createdAt: "2021-08-27T07:19:44.110Z",
    updatedAt: "2021-08-27T07:21:09.848Z",
  },
  {
    isAdmin: false,
    _id: "61671d231a33a61170709d78",
    name: "Priyang",
    email: "df@example.com",
    createdAt: "2021-10-13T17:53:39.542Z",
    updatedAt: "2021-10-13T17:53:39.542Z",
  },
  {
    isAdmin: false,
    _id: "616721ac6a6b1647b02c6ed9",
    name: "asd",
    email: "dk18gamer@gmail.com",
    createdAt: "2021-10-13T18:13:00.263Z",
    updatedAt: "2021-10-27T08:05:26.070Z",
  },
  {
    isAdmin: false,
    _id: "61e58d1368153850f4f768ed",
    name: "Demo To Update",
    email: "asd@gmail.com",
    createdAt: "2022-01-17T15:36:51.894Z",
    updatedAt: "2022-03-19T11:03:29.418Z",
  },
  {
    isAdmin: false,
    _id: "61e5dae34b24c769c3935984",
    name: "New User",
    email: "new@gmail.com",
    createdAt: "2022-01-17T21:08:51.557Z",
    updatedAt: "2022-01-17T21:09:15.275Z",
  },
  {
    isAdmin: false,
    _id: "6296528b1ef3e0a40d560d43",
    name: "asddas",
    email: "sad@gmail.com",
    createdAt: "2022-05-31T17:38:19.944Z",
    updatedAt: "2022-05-31T18:15:43.439Z",
  },
  {
    isAdmin: false,
    _id: "62a88a8d6dce99b25a1d0a54",
    name: "NewUser",
    email: "fdsaasdsaf@gmail.com",
    createdAt: "2022-06-14T13:18:05.219Z",
    updatedAt: "2022-06-14T13:18:05.219Z",
  },
];
