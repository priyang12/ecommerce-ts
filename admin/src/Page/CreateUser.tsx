import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";
import { UserValidation } from "@ecommerce/validation";
import { zodResolver } from "@hookform/resolvers/zod";

function CreateUser(props: any) {
  const { CreateUserValidation } = UserValidation;

  return (
    <div>
      <Create {...props}>
        <SimpleForm resolver={zodResolver(CreateUserValidation)}>
          <TextInput source="name" />
          <TextInput source="email" />
          <TextInput source="password" />
          <BooleanInput source="isAdmin" />
        </SimpleForm>
      </Create>
    </div>
  );
}

export default CreateUser;
