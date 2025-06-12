import { useContext } from "react";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { useForm } from "../../Hooks/useForm";
import { StyledProfile } from "./StyledProfile";
import { UpdateUser } from "../../Context/Authentication/AuthActions";
import {
  ConfirmPassword,
  ValidateName,
  ValidatePassword,
} from "../../Utils/Validation";
import Spinner from "../../Components/Spinner";
import { Helmet } from "react-helmet-async";
import { FormControl, Input, Label } from "../../Components/UI/FormControl";
const Profile = () => {
  const { state, dispatch } = useContext(AuthContext);
  const {
    state: UserForm,
    ChangeState,
    SetState,
    ErrorsState: FormErrors,
    setErrors,
  } = useForm({
    name: "",
    currentPassword: "",
    Password: "",
    Password2: "",
  });
  const { name, currentPassword, Password, Password2 } = UserForm;

  if (state.user && name !== state.user.name) {
    SetState({
      name: state.user.name,
      currentPassword: "",
      Password: "",
      Password2: "",
    });
  }

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validate = true;
    const Errors = {
      name: "",
      currentPassword: "",
      password: "",
      password2: "",
    };

    if (!ValidateName(name)) {
      Errors.name = "Name Should be 5-10 Characters";
      validate = false;
    }
    if (!ValidatePassword(Password)) {
      Errors.password = "Password Should be more than 6 Characters";
      validate = false;
    }
    if (!ConfirmPassword(Password, Password2)) {
      Errors.password2 = "Password and Confirm Password do not match";
      validate = false;
    }
    if (validate) {
      UpdateUser(dispatch, UserForm);
      setErrors(Errors);
    } else {
      setErrors(Errors);
    }
  };

  if (state.loading) {
    return <Spinner />;
  }
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <StyledProfile>
        <form onSubmit={onSubmit}>
          <FormControl>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={ChangeState}
              required
            />
            <span className="bar"></span>
            <Label htmlFor="name">
              {FormErrors.name ? (
                <span className="error">{FormErrors.name}</span>
              ) : (
                "name"
              )}
            </Label>
          </FormControl>

          <FormControl>
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={currentPassword}
              onChange={ChangeState}
              required
            />
            <span className="bar"></span>
            <Label htmlFor="currentPassword">
              {FormErrors.password ? (
                <span className="error">{FormErrors.currentPassword}</span>
              ) : (
                "Current Password"
              )}
            </Label>
          </FormControl>
          <FormControl>
            <Input
              type="password"
              name="Password"
              id="Password"
              value={Password}
              onChange={ChangeState}
              required
            />
            <span className="bar"></span>
            <Label htmlFor="Password">
              {FormErrors.password ? (
                <span className="error">{FormErrors.password}</span>
              ) : (
                "Password"
              )}
            </Label>
          </FormControl>
          <FormControl>
            <Input
              type="password"
              name="Password2"
              id="Password2"
              value={Password2}
              onChange={ChangeState}
              required
            />
            <span className="bar"></span>
            <Label htmlFor="Password2">
              {FormErrors.password2 ? (
                <span className="error">{FormErrors.password2}</span>
              ) : (
                "Confirm password"
              )}
            </Label>
          </FormControl>
          <input type="submit" className="btn" value="Update" />
        </form>
      </StyledProfile>
    </>
  );
};

export default Profile;
