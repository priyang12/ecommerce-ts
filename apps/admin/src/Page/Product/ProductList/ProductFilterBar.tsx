import {
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CategoryIcon from "@mui/icons-material/LocalOffer";

export const ProductFilterSidebar = () => (
  <Card
    sx={{
      display: {
        xs: "none",
        md: "block",
      },
      order: -1,
      flex: "0 0 15em",
      mr: 2,
      mt: 8,
      alignSelf: "flex-start",
    }}
  >
    <CardContent>
      <SavedQueriesList />
      <FilterLiveSearch source="name" />
      <FilterList label="category" icon={<CategoryIcon />}>
        <FilterListItem label="Shoes" value={{ category: "Shoes" }} />
        <FilterListItem
          label="Electronics"
          value={{ category: "Electronics" }}
        />
        <FilterListItem label="none" value={{ category: "none" }} />
      </FilterList>
      <FilterList label="brand" icon={<ImageIcon />}>
        <FilterListItem label="Sony" value={{ brand: "Sony" }} />
        <FilterListItem label="Fila" value={{ brand: "Fila" }} />
        <FilterListItem label="Hugo Boss" value={{ brand: "Hugo Boss" }} />
        <FilterListItem label="QBSW" value={{ brand: "QBSW" }} />
        <FilterListItem label="NINE WEST" value={{ brand: "NINE WEST" }} />
        <FilterListItem label="Lingmu" value={{ brand: "Lingmu" }} />
        <FilterListItem label="Aquatalia" value={{ brand: "Aquatalia" }} />
      </FilterList>
    </CardContent>
  </Card>
);
