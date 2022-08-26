import { Admin, Resource } from "react-admin";
import authProvider from "./AuthProvider";
import { EditUsers } from "./Components/EditList";
import UserList from "./Components/UserList";
import { dataProvider } from "./dataProvide";

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="admin/users" list={UserList} edit={EditUsers} />
      </Admin>
      ;
    </div>
  );
}

export default App;
