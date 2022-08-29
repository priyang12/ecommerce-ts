import {
  DateInput,
  Edit,
  ImageField,
  NumberInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

const EditProduct = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextField source="id" />
        <TextInput source="name" />
        <NumberInput source="rating" min={0} max={5} />
        <NumberInput source="numReviews" min={0} />
        <NumberInput source="price" min={0} />
        <NumberInput source="countInStock" min={0} />
        <ImageField source="image" title="name" />
        <TextInput source="image" />
        <TextInput source="brand" />
        <TextInput source="category" />
        <DateInput source="updatedAt" />
      </SimpleForm>
    </Edit>
  );
};

export default EditProduct;
