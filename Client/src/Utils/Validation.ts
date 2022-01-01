export const ValidateName = (name: string) => {
  if (name.length < 3 || name.length > 10) return false;
  return true;
};

export const ValidateEmail = (email: string) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase()) || email === "") return false;
  return true;
};

export const ValidatePassword = (password: string) => {
  if (password.length < 6) return false;
  return true;
};

export const ConfirmPassword = (password: string, password2: String) => {
  if (password !== password2) return false;
  return true;
};
