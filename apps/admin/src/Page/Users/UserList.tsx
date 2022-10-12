
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  EditButton,
} from "react-admin";

function UserList() {
  return (
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
  );
}

export default UserList;
