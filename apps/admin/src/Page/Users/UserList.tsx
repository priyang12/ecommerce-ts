import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  EditButton,
} from "react-admin";
import HelmetComponent from "../../HelmetComponent";

function UserList() {
  return (
    <>
      <HelmetComponent>
        <title>UserList</title>
        <meta
          name="description"
          content="This is the UserList page. It lists all the users in the database."
        />
      </HelmetComponent>
      <List>
        <Datagrid>
          <TextField source="_id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="createdAt" />
          <BooleanField source="isAdmin" />
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
}

export default UserList;
