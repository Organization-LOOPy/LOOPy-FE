export const isPasswordLengthValid = (password: string): boolean => {
  return password.length >= 8 && password.length <= 20;
};

export const isPasswordComboValid = (password: string): boolean => {
  return /(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s])/.test(password);
};

export const isPasswordMatched = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const isEmailFormValid = (
  email: string,
  password: string,
  confirmPassword: string,
  nickname: string,
  lengthValid: boolean,
  comboValid: boolean
): boolean => {
  return (
    email.trim() !== "" &&
    lengthValid &&
    comboValid &&
    password === confirmPassword &&
    nickname.trim() !== ""
  );
};
