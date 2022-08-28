import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

const OrderList = () => (
  <List>
    <Datagrid rowClick="edit">
      <NumberField source="totalPrice" />
      <BooleanField source="isDelivered" />
      <ReferenceField source="user._id" reference="admin/users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="paymentMethod" />
      <TextField source="id" />
    </Datagrid>
  </List>
);

export default OrderList;
