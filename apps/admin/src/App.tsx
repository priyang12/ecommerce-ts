import {
  Admin,
  AppBar,
  Layout,
  Resource,
  ToggleThemeButton,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { DataProviderWithFormData } from "./dataProvide";
import authProvider from "./AuthProvider";
import EditUsers from "./Page/Users/EditUsers";
import UserList from "./Page/Users/UserList";
import CreateUser from "./Page/Users/CreateUser";
import EditProduct from "./Page/Product/EditProduct";
import ProductList from "./Page/Product/ProductList";
import CreateProduct from "./Page/Product/CreateProduct";
import OrderList from "./Page/Order/OrderList";
import EditOrder from "./Page/Order/EditOrder";
import ReviewList from "./Page/Reviews/ReviewList";
import Dashboard from "./Page/Dashboard";
import { darkTheme, Theme } from "./Theme";
import { MyLoginPage } from "./Page/LoginPage";

const MyAppBar = (props: any) => (
  <AppBar {...props}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>
    <ToggleThemeButton lightTheme={Theme} darkTheme={darkTheme} />
  </AppBar>
);

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

function App() {
  return (
    <>
      <Admin
        dashboard={Dashboard}
        loginPage={MyLoginPage}
        layout={MyLayout}
        dataProvider={DataProviderWithFormData}
        authProvider={authProvider}
        theme={Theme}
      >
        <Resource
          name="users"
          list={UserList}
          edit={EditUsers}
          create={CreateUser}
        />
        <Resource
          name="product"
          list={ProductList}
          edit={EditProduct}
          create={CreateProduct}
        />
        <Resource name="orders" list={OrderList} edit={EditOrder} />
        <Resource name="reviews" list={ReviewList} />
      </Admin>
    </>
  );
}

export default App;
