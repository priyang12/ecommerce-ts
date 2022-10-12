import {
  Datagrid,
  DateField,
  ImageField,
  List,
  NumberField,
  TextField,
} from "react-admin";

const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <NumberField source="price" />
      <TextField source="brand" />
      <TextField source="category" />
      <NumberField source="rating" />
      <NumberField source="numReviews" />
      <NumberField source="countInStock" />
      <ImageField source="image" title="name" />
    </Datagrid>
  </List>
);

export default ProductList;
