import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";
import { CreateUserValidation } from "@ecommerce/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from '@mui/material'


const Aside = () => (
  <Box sx={{ width: '200px', margin: '1em' }}>
      <Typography variant="h6">Instructions</Typography>
      <Typography variant="body2">
          Create a new user
      </Typography>
  </Box>
);


function CreateUser() {
  return (
    <>
      <Create aside={<Aside/>}>
        <SimpleForm resolver={zodResolver(CreateUserValidation)}>
          <TextInput source="name" size="medium" sx={{
            width: '100%'
          }}  resettable/>
          <TextInput source="email" size="medium" sx={{
            width: '100%'
          }}  resettable />
          <TextInput source="password" size="medium" sx={{
            width: '100%'
          }}  resettable />
          <BooleanInput source="isAdmin" size="medium" sx={{
            width: '100%'
          }}   />
  
        </SimpleForm>
      </Create>
    </>
  );
}

export default CreateUser;
