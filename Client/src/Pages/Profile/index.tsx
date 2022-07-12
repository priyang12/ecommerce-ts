import { useContext } from "react";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { useForm } from "../../Utils/CustomHooks";
import { StyledProfile } from "./StyledProfile";
import { UpdateUser } from "../../Context/Authentication/AuthActions";
import {
  ConfirmPassword,
  ValidateName,
  ValidatePassword,
} from "../../Utils/Validation";
import Spinner from "../../Components/Spinner";
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
    let Errors = {
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
      console.log(UserForm);
      setErrors(Errors);
    }
  };

  if (state.loading) {
    return <Spinner />;
  }
  return (
    <StyledProfile>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <label htmlFor="name">
            {FormErrors.name ? (
              <span className="error">{FormErrors.name}</span>
            ) : (
              "name"
            )}
          </label>
        </div>

        <div className="form-control">
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <label htmlFor="currentPassword">
            {FormErrors.password ? (
              <span className="error">{FormErrors.currentPassword}</span>
            ) : (
              "Current Password"
            )}
          </label>
        </div>
        <div className="form-control">
          <input
            type="password"
            name="Password"
            id="Password"
            value={Password}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <label htmlFor="Password">
            {FormErrors.password ? (
              <span className="error">{FormErrors.password}</span>
            ) : (
              "Password"
            )}
          </label>
        </div>
        <div className="form-control">
          <input
            type="password"
            name="Password2"
            id="Password2"
            value={Password2}
            onChange={ChangeState}
            required
          />
          <span className="bar"></span>
          <label htmlFor="Password2">
            {FormErrors.password2 ? (
              <span className="error">{FormErrors.password2}</span>
            ) : (
              "Confirm password"
            )}
          </label>
        </div>
        <input type="submit" className="btn" value="Update" />
      </form>
    </StyledProfile>
  );
};

export default Profile;
