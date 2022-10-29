import {
  Edit,
  SimpleForm,
  BooleanInput,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  DateInput,
  ReferenceManyField,
} from "react-admin";
import { Box } from "@mui/material";
import HelmetComponent from "../../HelmetComponent";

const EditUsers = () => {
  return (
    <>
      <HelmetComponent>
        <title>Edit Users</title>
        <meta
          name="description"
          content="This is the Edit Users page. It allows you to edit the users in the database."
        />
      </HelmetComponent>
      <Edit mutationMode="pessimistic">
        <SimpleForm>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextInput source="id" />
              <TextInput source="name" />
              <TextInput source="email" />
              <BooleanInput source="isAdmin" />
              <DateInput source="createdAt" />
              <DateInput source="updatedAt" />
            </Box>
            <Box
              sx={{
                p: 5,
              }}
            >
              <ArrayInput source="cart">
                <SimpleFormIterator>
                  <ReferenceManyField
                    label="Books"
                    reference="books"
                    target="author_id"
                  >
                    {/* <Datagrid>
                      <TextField source="title" />
                      <TextField source="year" />
                    </Datagrid> */}
                  </ReferenceManyField>

                  <NumberInput source="qty" />
                </SimpleFormIterator>
              </ArrayInput>
            </Box>
          </Box>
        </SimpleForm>
      </Edit>
    </>
  );
};

export default EditUsers;
