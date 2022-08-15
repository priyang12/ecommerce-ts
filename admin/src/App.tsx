import {
  Admin,
  Resource,
  UrlField,
  Datagrid,
  EmailField,
  List,
  TextField,
} from "react-admin";

import jsonServerProvider from "ra-data-json-server";
import authProvider from "./AuthProvider";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <UrlField source="website" />
      <TextField source="company.name" />
    </Datagrid>
  </List>
);

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={UserList} />
      </Admin>
      ;
    </div>
  );
}

export default App;
