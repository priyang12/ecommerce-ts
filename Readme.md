# Ecommerce

> eCommerce platform built with the MERN stack
> -Front-end: typescript, React, React Router, Styled Components,
> -Back-end: Node.js, Express, MongoDB, Mongoose,
> -Database: MongoDB, Mongoose,
> -Hosting: Vercel,
> -Testing: Jest, react-testing-library,
> -Version Control: Git,

> check-out layout at https://github.com/priyang12/Ecommerce-Layout-with-Scss/tree/Modern

![Login Page](https://github.com/priyang12/Ecommerce-typescript/blob/master/ScreenShots/Screenshot%202022-01-06%20at%207.44.18%20PM.png)

![Admin Dashboard](https://github.com/priyang12/Ecommerce-typescript/blob/master/ScreenShots/Screenshot%202022-01-06%20at%207.45.01%20PM.png)

![Single Product](https://github.com/priyang12/Ecommerce-typescript/blob/master/ScreenShots/Screenshot%202022-01-06%20at%207.48.00%20PM.png)

## Features

- Top products carousel
- Product pagination
- Full featured shopping cart
- Product reviews and ratings
- Product search feature
- Save the Cart in User
- Order Placement
- Admin product management
- Admin Order details page
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Features Still In Development

- Product sorting
- Admin Update product
- User account management
- Mailchimp integration
- Forget password
- end-to-end testing/cypress
- deployment to Vercel

## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install

cd client
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
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
