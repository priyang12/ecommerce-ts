import {
  Admin,
  Resource,
  Datagrid,
  EmailField,
  List,
  TextField,
  BooleanField,
  EditButton,
  EditGuesser,
  ArrayInput,
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";
import authProvider from "./AuthProvider";
import { dataProvider } from "./dataProvide";

const UserList = () => (
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

export const EditUsers = () => (
  <Edit>
    <SimpleForm>
      <BooleanInput source="isAdmin" />
      <TextInput source="name" />
      <TextInput source="email" />
      <ArrayInput source="cart">
        <SimpleFormIterator>
          {/* <ReferenceInput source="_id" reference="s">
            <SelectInput optionText="_id" />
          </ReferenceInput> */}
          <TextInput source="product" />
          <NumberInput source="qty" />
        </SimpleFormIterator>
      </ArrayInput>
      <DateInput source="createdAt" />
      <DateInput source="updatedAt" />
      <TextInput source="id" />
    </SimpleForm>
  </Edit>
);

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
