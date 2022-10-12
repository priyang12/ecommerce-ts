import React, { useContext, useState } from "react";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";

import { RecoverPassword } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { ValidateEmail } from "../../Utils/Validation";
import { StyledForgetPassword } from "./StyledForgetPassword";

function ForgotPassword() {
  const { state, dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (state?.loading) return <Spinner />;

  const SendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ValidateEmail(email)) {
      setError("");
      RecoverPassword(dispatch, email);
    } else {
      setError("Email is not Valid");
    }
  };
  return (
    <StyledForgetPassword>
      <h1>Forgot Password ?</h1>
      {state?.alert && (
        <AlertDisplay
          msg={state.alert.message}
          type={state.alert.type === "success"}
        />
      )}
      {state?.err && <AlertDisplay msg={state.err} type={false} />}
      <form onSubmit={SendMail}>
        <div className="form-control">
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setError("");
              } else {
                setError("Email is required");
              }
              setEmail(e.target.value);
            }}
            required
          />
          <span className="bar"></span>
          <label htmlFor="email">
            {error ? (
              <span className="error">{error}</span>
            ) : (
              <span
                style={{
                  color: "var(--main-color)",
                }}
              >
                Email
              </span>
            )}
          </label>
        </div>
        <button type="submit" className="btn">
          Send Recovery Mail
        </button>
      </form>
    </StyledForgetPassword>
  );
}

export default ForgotPassword;
