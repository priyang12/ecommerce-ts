import {
  Edit,
  SimpleForm,
  BooleanInput,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  DateInput,
} from "react-admin";

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
