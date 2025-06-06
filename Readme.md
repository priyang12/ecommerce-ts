---
TechName: FULL-STACK-MonoRepo
Title: ShopIT E-commerce & Admin
Description: It's a full-stack web application that allows users to create an account, log in, and create an order. The application also allows users to view their order history, and view their cart. The application is built with Node.js, Express, MongoDB, React, Context API, and Styled Component. The application is deployed on Vercel.
Technologies: [Node.js, Express, MongoDB, React, Styled Component]
ProjectLink: https://www.shop.web-club.co
AdminLink: http://shop-admin.web-club.co
GithubLink: https://github.com/priyang12/ecommerce-ts
Image: https://ik.imagekit.io/5aalo5l7bu7/Ecommerce_8WgWzew6o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660117461345
ClientImage: https://ik.imagekit.io/5aalo5l7bu7/Ecommerce_8WgWzew6o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660117461345
ClientVideo: https://ik.imagekit.io/5aalo5l7bu7/Portfolio/EcommerceClient_9av_ILt4v.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1668355268526
AdminImage: https://ik.imagekit.io/5aalo5l7bu7/Portfolio/Admin_4pWkBKF7g?ik-sdk-version=javascript-1.4.3&updatedAt=1668887257201
AdminVideo: https://ik.imagekit.io/5aalo5l7bu7/Portfolio/EcommerceAdmin_DDzIsBmjK.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1668887007286
---

ShopIT is a Fullstack Ecommerce webapp. it's where you can shop the things that you want with out worring about long processes.

it's a monorepo with two frontends and same backend created using turborepo. One is for client to use and place order and other is admin panel for administrator work process. there one comman package for validation created for value validation using **ZOD**.

Client web app it is well tested by react-testing lib. the paypment is powered by paypal. it is a PWA which is installlable and is **semi** workable in **offline** mode. cahceing worked by workbox. Other frontend is a for admin work and which is build using react-admin. it show's interactive ways to handle orders, review and other work. There are end-to-end test for the client apps by cypress.

## Video

Client Side

https://user-images.githubusercontent.com/72823974/205494063-3ca16515-b722-4fb8-9211-2e63074ac963.mp4

Admin Side

https://user-images.githubusercontent.com/72823974/205494089-5fda4ba1-9fc5-4b1a-a9c6-5063d9937932.mp4

## Technologies

1. Client
   - React
   - Styled Component
   - react-query
   - workbox
   - @testing-library
2. Admin
   - React
   - React-admin
   - recharts
   - @mui/material
3. Backend
   - Node.js
   - Express.js
   - imagekit
   - mongoose
   - agenda
   - @sendgrid/mail

## Client Features

- PWA
- Top products carousel
- Product pagination
- Carousel
- Full featured shopping cart
- Product reviews and ratings
- Suggrested Products
- Wishlist Products
- Product search feature
- Product Reviews
- User Cart
- Order Placement
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Private and Protected Routes
- Forget password
- Servive worker cache

## Admin Features

- Dashborad
- Admin User management
- Admin Product management
- Admin Order management
- User's Review management
- Filtering in Products

## Server Features

- Admin and Client APIs
- Cache Response
- Rate Limiter
- Jobs Scheduling
- Seeder
- Cors

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
END_POINT = imagekit url
SENDGRID_API_KEY = your sendgrid api key

```

Create a .env file in then admin and add the following

```
VITE_REACT_APP_BACKEND=your backend server url
```

### Install Dependencies (frontend & backend & Admin)

```
npm install
```

### Run

```
# Run individual

npm run client
npm run admin
npm run server

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run frontend (:3000) & backend (:5000)
npm run dev:admin

# Cypress e2e tests
	npm run e2e

```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456

You can change credentials in Server/data/User file than use the `# Import data` command
```
