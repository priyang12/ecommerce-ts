import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import { dataProvider } from "./dataProvide";
import authProvider from "./AuthProvider";
import { EditUsers } from "./Page/EditList";
import EditProduct from "./Page/EditProduct";
import ProductList from "./Page/ProductList";
import OrderList from "./Page/OrderList";
import UserList from "./Page/UserList";
import EditOrder from "./Page/EditOrder";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="admin/users" list={UserList} edit={EditUsers} />
      <Resource name="admin/product" list={ProductList} edit={EditProduct} />
      <Resource name="admin/orders" list={OrderList} edit={EditOrder} />
    </Admin>
  );
}

export default App;
