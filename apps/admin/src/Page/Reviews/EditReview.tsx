import {
  Edit,
  SimpleForm,
  NumberInput,
  BooleanInput,
  TextInput,
  TextField,
  DateField,
  EditProps,
} from "react-admin";
import { Box, Stack, IconButton, Typography } from "@mui/material";
import HelmetComponent from "../../HelmetComponent";
import CloseIcon from "@mui/icons-material/Close";

interface Props extends EditProps<any> {
  onCancel: () => void;
}

function EditReview({ onCancel, ...props }: Props) {
  return (
    <>
      <HelmetComponent>
        <title>Edit Order</title>
        <meta
          name="description"
          content="This is the Edit Order page. It allows you to edit the orders in the database."
        />
      </HelmetComponent>

      <Edit {...props}>
        <Box pt={5} width={{ xs: "100vW", sm: 400 }} mt={{ xs: 2, sm: 1 }}>
          <Stack direction="row" p={2}>
            <Typography variant="h6" flex="1">
              Review Details
            </Typography>
            <IconButton onClick={onCancel} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
          <SimpleForm>
            <TextField source="id" />
            <br />
            <NumberInput source="rating" max={5} min={1} />
            <TextInput source="comment" multiline resettable />
            <BooleanInput source="approved" />
            <DateField source="createdAt" />
          </SimpleForm>
        </Box>
      </Edit>
    </>
  );
}

export default EditReview;
