## Refactor

[x] Refactor Authentication.
[x] change the how routing is structured.
[x] remove unnecessary effect.
[x] create a state for checkout process rather using the localstorage.
[x] replace Navigators component instead use nested routes checkout/nested routes.
[x] redirect on not for non-auth s
[x] docs comments and keys in API with separate API endPoints in file.
[x] docs comments in Utils and test cases.
[x] each file for different hooks.

[] replace useForm with react-hook-form.
[x] on reload the page redirect to auth.after auth page authcontext fire and set the token redirect '/' on token available. this is making the protected route in onload redirect to '/' fix this (temp fix added yesterday)
[] memoize and optimize the Carousel component.

### change UI

[x] migrate to linaria for components
[x] docs components and refactor component.
[x] change global styling color in root.
[x] "Limited Time Deal" and "FREE delivery within a week" dummy UI in product Card
[] optimized rendering in Carousel
[] Migrate to linaria for Pages.
[] global dark mode by flipping the temp of color pallet.
[] added test cases for PrivateRoute.
[] fix no token, authorization denied in setAuthToken on load.
[] fix Menu logo in Navbar.

#### components

[] Refactor and tests
[x] Navbar
[x] SearchBar
[x] Rating
[x] LoadingButton
[x] AlertDisplay
[x] Navigators
[x] Spinner
[x] FallbackUI
[x] Footer
[x] Product Card
[x] Slide
[x] Carousel
[x] Select List
[x] Form Control
[x] replace with UI component and remove StyledComponents

#### Pages

[x] Home
[x] Search
[x] Single Page
[x] AuthLayout
[x] Login
[x] Register
[x] ForgotPassword
[x] ResetPassword
[x] StillWorking
[x] Cart
[x] addressPage
[x] paymentMethod
[x] placeOrder
[x] paypal
[x] Wishlist
[x] Reviews
[x] OrderStatus
