import { useEffect, useState } from "react";
import {
  isPasswordLengthValid,
  isPasswordComboValid,
  isPasswordMatched,
} from "../utils/validation";

export const usePasswordValidation = (password: string, confirmPassword: string) => {
  const [lengthValid, setLengthValid] = useState(false);
  const [comboValid, setComboValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setLengthValid(isPasswordLengthValid(password));
    setComboValid(isPasswordComboValid(password));
  }, [password]);

  useEffect(() => {
    setPasswordMatch(isPasswordMatched(password, confirmPassword));
  }, [password, confirmPassword]);

  return { lengthValid, comboValid, passwordMatch };
};
