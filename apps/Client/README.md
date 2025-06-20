## Refactor

### General Improvements

- [x] Refactor Authentication
- [x] Changed how routing is structured
- [x] Removed unnecessary effects
- [x] Created a state for the checkout process instead of using localStorage
- [x] Replaced `Navigators` component with nested routes (e.g. `/checkout/*`)
- [x] Redirect non-authenticated users properly
- [x] Documented API keys and endpoints in separate files
- [x] Added docs/comments and tests in Utils
- [x] Separated custom hooks into individual files
- [x] On reload, redirect user based on auth token in context
- [x] Fully migrated UI to **Linaria**
- [x] Memoized and optimized the `Carousel` component

---

### UI Changes

- [x] Migrated all components to **Linaria**
- [x] Documented and refactored UI components
- [x] Updated global colors and root styles
- [x] Added "Limited Time Deal" and "FREE delivery within a week" to Product Card UI
- [x] Migrated all pages to **Linaria**
- [x] Removed `styled-components` and `styled-normalize`; replaced with `normalize.css`
- [x] Fixed logo/menu alignment in Navbar
- [x] Implemented global dark mode via color palette switching
- [x] Optimized Carousel rendering
- [x] Added test cases for `PrivateRoute`
- [x] Fixed login token issue (`setAuthToken`) and authorization error after login

---

### Components Refactored

- [x] Navbar
- [x] SearchBar
- [x] Rating
- [x] LoadingButton
- [x] AlertDisplay
- [x] Navigators
- [x] Spinner
- [x] FallbackUI
- [x] Footer
- [x] Product Card
- [x] Slide
- [x] Carousel
- [x] Select List
- [x] Form Control
- [x] Removed all styled-components from components and replaced with Linaria

---

### Pages Refactored

- [x] Home
- [x] Search
- [x] Single Page
- [x] AuthLayout
- [x] Login
- [x] Register
- [x] ForgotPassword
- [x] ResetPassword
- [x] StillWorking
- [x] Cart
- [x] Address Page
- [x] Payment Method
- [x] Place Order
- [x] PayPal
- [x] Wishlist
- [x] Reviews
- [x] Order Status
- [x] Order Details
- [x] NotFound
