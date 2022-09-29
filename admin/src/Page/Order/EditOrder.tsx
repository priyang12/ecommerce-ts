import {
  BooleanInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const EditOrder = () => (
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
    </SimpleForm>
  </Edit>
);

export default EditOrder;
