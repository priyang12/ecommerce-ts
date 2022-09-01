import { Admin, Resource, ShowGuesser } from "react-admin";
import { DataProviderWithFormData, dataProvider } from "./dataProvide";
import authProvider from "./AuthProvider";
import { EditUsers } from "./Page/EditList";
import EditProduct from "./Page/EditProduct";
import ProductList from "./Page/ProductList";
import OrderList from "./Page/OrderList";
import UserList from "./Page/UserList";
import EditOrder from "./Page/EditOrder";
import CreateUser from "./Page/CreateUser";
import CreateProduct from "./Page/CreateProduct";

function App() {
  return (
    <Admin dataProvider={DataProviderWithFormData} authProvider={authProvider}>
      <Resource
        name="admin/users"
        list={UserList}
        edit={EditUsers}
        create={CreateUser}
      />

      <Resource
        name="admin/product"
        list={ProductList}
        edit={EditProduct}
        create={CreateProduct}
      />
      <Resource name="admin/orders" list={OrderList} edit={EditOrder} />
    </Admin>
  );
}

export default App;
