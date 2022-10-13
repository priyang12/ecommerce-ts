import {
  Datagrid,
  DateField,
  ImageField,
  List,
  NumberField,
  TextField,
} from "react-admin";
import HelmetComponent from "../../HelmetComponent";

const ProductList = () => (
  <>
    <HelmetComponent>
      <title>Product List</title>
      <meta
        name="description"
        content="This is the Product List page. It lists all the products in the database."
      />
    </HelmetComponent>
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
  </>
);

export default ProductList;
