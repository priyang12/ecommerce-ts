# ShopIT – Fullstack E-commerce Web App

ShopIT is a fullstack, monorepo-based e-commerce platform where users can effortlessly shop for products without navigating through complicated processes. It includes a user-facing client app and an admin dashboard, both built on a shared backend using TurboRepo.

Recently migrated to a new UI for the client application. The legacy UI is preserved in a separate branch. [See UI Migration below for more details.](#ui-migration)

---

## Demo Videos

Created using Cypress:
https://ik.imagekit.io/5aalo5l7bu7/Github/userExp.spec.ts_er8JBmfI7.mp4?updatedAt=1751304979680

Client App:
https://ik.imagekit.io/5aalo5l7bu7/Github/NEW%20UI_A8TaSqdd3V.mp4?updatedAt=1750006853983

Admin Panel:
https://user-images.githubusercontent.com/72823974/205494089-5fda4ba1-9fc5-4b1a-a9c6-5063d9937932.mp4

---

## Monorepo Structure

- apps/client – User-facing shopping application (PWA)
- apps/admin – Admin panel for managing orders, products, reviews
- apps/server – Shared backend using Express.js and MongoDB
- packages/validation – Shared validation logic using Zod(seperated for now for deplyment issues will merger again.)

---

## Testing

- Client App: Unit tested with React Testing Library
- End-to-End: Cypress tests for complete client app flow

---

## Technologies Used

### Client

- React
- React Query
- linaria
- Workbox (for PWA and caching)
- @testing-library/react

### Admin

- React
- React-Admin
- Recharts
- @mui/material

### Backend

- Node.js
- Express.js
- MongoDB & Mongoose
- Agenda (Job Scheduler)
- ImageKit (for images)
- SendGrid (for emails)

---

## Client Features

- PWA
- Top products carousel
- Product pagination
- Carousel
- Full featured shopping cart
- Product reviews and ratings
- Suggested Products
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

---

## Admin Features

- Dashboard
- Admin User management
- Admin Product management
- Admin Order management
- User's Review management
- Filtering in Products

---

## Server Features

- RESTful APIs for Admin and Client
- CORS Support
- Caching and Rate Limiting
- Job Scheduling (Email, Cleanup)
- Seed & Destroy DB Data

---

## Environment Variables

Create a .env file in apps/server:

```.env
NODE_ENV=development
PORT=5001
MONGO_URI=your_mongo_uri
TEST_MONGO_URI=your_test_mongo_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
END_POINT=your_imagekit_url
PRIVATE_KEY=your_imagekit_private_key
PUBLIC_KEY=your_imagekit_public_key
SENDGRID_API_KEY=your_sendgrid_api_key
CLIENT_URL=you admin url (or localhost) to alllow client to pass cross.
```

Create a .env file in apps/admin:

```.env
VITE_REACT_APP_BACKEND=your backend API(http://localhost:5001)
```

---

## Installation & Running

### Install All Dependencies

```bash
npm install
```

Or install individually by navigating into each app directory.

### Run Apps

```bash
# Client (http://localhost:5173)
npm run client
# Admin (http://localhost:5174)
npm run admin
# Server (http://localhost:5001)
npm run server

# Dev mode: Client + Server
npm run dev
# Dev mode: Admin + Server
npm run dev:admin
```

### Seed Database

```bash
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

---

## Sample Users:

| Role     | Email                                         | Password |
| -------- | --------------------------------------------- | -------- |
| Admin    | [admin@example.com](mailto:admin@example.com) | 123456   |
| Customer | [john@example.com](mailto:john@example.com)   | 123456   |
| Customer | [jane@example.com](mailto:jane@example.com)   | 123456   |

You can modify user credentials in apps/server/data/User.js and re-import.

---

## UI Migration

### New UI (2025)

The client app has been fully migrated to a modern, refactored UI in the refactor-ui branch under apps/client. This migration includes:

- Modernized component structure
- Better mobile responsiveness
- Improved performance and accessibility
- Cleanup of unused code and files
- Refactored state management and hooks

Check [apps/client/README.md](https://github.com/priyang12/ecommerce-ts/tree/refactor-Client/apps/Client) in the refactor-ui branch for full details of the UI migration process and reasoning.

### Legacy UI

The original UI is preserved in the [legacy-ui branch](https://github.com/priyang12/ecommerce-ts/tree/v1-Client-UI) and will be [deployed](https://ecommerce-ts-v1.onrender.com) separately. It remains functional and serves as a fallback/reference.
