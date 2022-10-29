import { useCallback } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  matchPath,
} from "react-router-dom";
import {
  Datagrid,
  BooleanField,
  List,
  NumberField,
  TextField,
  useRecordContext,
  Identifier,
} from "react-admin";
import HelmetComponent from "../../HelmetComponent";
import { Box, Drawer } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditReview from "./EditReview";
import { rowStyle } from "./SelectedRowStyle";

const NbStarsField = ({ ...props }) => {
  const record = useRecordContext();

  return (
    <>
      {[...Array(Math.round(record.rating))].map((_, index) => (
        <StarIcon key={index} />
      ))}
    </>
  );
};

export interface ReviewListDesktopProps {
  selectedRow?: Identifier;
}

const RatingList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate("/reviews");
  }, [navigate]);

  const match = matchPath("/reviews/:id", location.pathname);
  const SelectedRow = !!match
    ? parseInt((match as any).params.id, 10)
    : undefined;
  return (
    <>
      <HelmetComponent>
        <title>Review List</title>
        <meta
          name="description"
          content="This is the Review List page. It lists all the products Review in the database."
        />
      </HelmetComponent>
      <Box display="flex">
        <List
          sx={{
            width: "100%",
          }}
        >
          <Datagrid rowClick="edit" rowStyle={rowStyle(SelectedRow)}>
            <TextField source="_id" />
            <NbStarsField label="rating" />
            <NumberField source="rating" />
            <TextField source="comment" />
            <BooleanField source="approved" />
          </Datagrid>
        </List>
        <Drawer
          variant="persistent"
          anchor="right"
          open={!!match?.params.id}
          onClose={handleClose}
          sx={{ zIndex: 100 }}
        >
          {match?.params.id && (
            <EditReview
              id={match?.params.id as string}
              onCancel={handleClose}
            />
          )}
        </Drawer>
      </Box>
    </>
  );
};

export default RatingList;
