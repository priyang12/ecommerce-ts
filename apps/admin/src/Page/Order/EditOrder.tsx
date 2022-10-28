import {
  BooleanInput,
  DateField,
  DateInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import HelmetComponent from "../../HelmetComponent";

const EditOrder = () => (
  <>
    <HelmetComponent>
      <title>Edit Order</title>
      <meta
        name="description"
        content="This is the Edit Order page. It allows you to edit the orders in the database."
      />
    </HelmetComponent>
    <Edit>
      <SimpleForm>
        {/* <ReferenceInput source="_id" reference="s">
        <SelectInput optionText="id" />
      </ReferenceInput> */}
        <NumberInput source="totalPrice" />
        <BooleanInput source="isDelivered" />
        <TextInput source="user.name" />
        <TextInput source="paymentMethod" />
        <TextInput source="id" />
        <DateInput source="createdAt" />
      </SimpleForm>
    </Edit>
  </>
);

export default EditOrder;
