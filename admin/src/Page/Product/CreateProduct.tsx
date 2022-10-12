import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ImageField,
  ImageInput,
  SelectInput,
} from "react-admin";
import { CreateProductValidation } from "@ecommerce/validation";
import { zodResolver } from "@hookform/resolvers/zod";

function CreateProduct(props: any) {
  const categories = [
    { name: "Tech", id: "tech" },
    { name: "Lifestyle", id: "lifestyle" },
  ];
  const brand = [
    { name: "Apple", id: "apple" },
    { name: "Samsung", id: "samsung" },
    { name: "Microsoft", id: "microsoft" },
    { name: "Lenovo", id: "lenovo" },
    { name: "Asus", id: "asus" },
  ];

  return (
    <div>
      <h1>Create Product</h1>
      <Create {...props}>
        <SimpleForm resolver={zodResolver(CreateProductValidation)}>
          <TextInput source="name" label="name*" />
          <TextInput source="description" />
          <NumberInput source="price" min={0} />
          <NumberInput source="rating" min={0} max={5} />
          <NumberInput source="numReviews" min={0} />
          <NumberInput source="countInStock" min={0} />
          <ImageInput source="imageFile" accept="image/*">
            <ImageField source="imageFile" title="name" />
          </ImageInput>
          {/* <TextInput source="image" resettable /> */}
          <SelectInput
            onCreate={() => {
              const newCategoryName = prompt("Enter a new category");
              if (newCategoryName) {
                const newCategory = {
                  id: newCategoryName,
                  name: newCategoryName,
                };
                categories.push(newCategory);
                return newCategory;
              }
              return null;
            }}
            source="category"
            choices={categories}
          />
          <SelectInput
            onCreate={() => {
              const newBrandName = prompt("Enter a new brand");
              if (newBrandName) {
                const newBrand = {
                  id: newBrandName,
                  name: newBrandName,
                };
                categories.push(newBrand);
                return newBrand;
              }
              return null;
            }}
            source="brand"
            choices={brand}
          />
        </SimpleForm>
      </Create>
    </div>
  );
}

export default CreateProduct;
