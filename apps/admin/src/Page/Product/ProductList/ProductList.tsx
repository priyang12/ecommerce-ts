import {
  Datagrid,
  ImageField,
  List,
  NumberField,
  TextField,
  useTheme,
} from "react-admin";
import HelmetComponent from "../../../HelmetComponent";
import { Box, Chip, useMediaQuery, Theme } from "@mui/material";
import { ProductFilterSidebar } from "./ProductFilterBar";

const useColsForWidth = () => {
  const theme = useTheme();
  const sm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const md = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));
  const lg = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const xl = useMediaQuery<Theme>((theme) => theme.breakpoints.up("xl"));
  if (xl) return 8;
  if (lg) return 6;
  if (md) return 4;
  if (sm) return 3;
  return 2;
};

const ProductList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <>
      <HelmetComponent>
        <title>Product List</title>
        <meta
          name="description"
          content="This is the Product List page. It lists all the products in the database."
        />
      </HelmetComponent>
      <List aside={<ProductFilterSidebar />}>
        <Box>
          <Datagrid
            rowClick="edit"
            sx={{
              "& .column-numReviews": {
                display: { xs: "none", md: "table-cell" },
              },
              "& .column-category": {
                display: { xs: "none", md: "table-cell" },
              },
              "& .column-countInStock": {
                display: { xs: "none", md: "table-cell" },
              },
              "& .column-image": {
                display: { xs: "none", md: "table-cell" },
              },
            }}
          >
            <TextField source="name" />
            <NumberField source="price" />
            <TextField source="brand" />
            <TextField source="category" />
            <NumberField source="rating" />
            <NumberField source="numReviews" />
            <NumberField source="countInStock" />
            <ImageField
              source="image"
              title="name"
              sx={{
                "& .RaImageField-image": {
                  maxWidth: 500,
                  minHeight: 200,
                  objectFit: "unset",
                  borderRadius: "20px",
                },
              }}
            />
          </Datagrid>
        </Box>
      </List>
    </>
  );
};

export default ProductList;
