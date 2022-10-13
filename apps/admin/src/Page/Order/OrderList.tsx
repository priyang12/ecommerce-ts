import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";
import HelmetComponent from "../../HelmetComponent";

const OrderList = () => (
  <>
    <HelmetComponent>
      <title>Order List</title>
      <meta
        name="description"
        content="This is the Order List page. It lists all the orders in the database."
      />
    </HelmetComponent>
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
  </>
);

export default OrderList;
