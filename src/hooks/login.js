import { useState } from "react";

import { emailCheck, password } from "../utils/validations";

import show from "../assets/show.svg";

const useLoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: {
      value: "",
      valid: false,
      type: "email",
      elementType: "input",
      label: "Email",
      validation: emailCheck,
      required: true,
      blur: false,
    },
    password: {
      value: "",
      valid: false,
      type: "password",
      elementType: "input",
      image: show,
      label: "Password",
      validation: password,
      blur: false,
      required: true,
      show: false,
      info: "Password must be alphanumeric, 8 characters long and must contain a  special character",
    },
  });
  const [loginFormValid, setLoginFormValid] = useState(false);

  return [loginForm, setLoginForm, loginFormValid, setLoginFormValid];
};

export default useLoginForm;
