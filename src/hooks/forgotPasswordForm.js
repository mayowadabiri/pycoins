import { useState } from "react";

import { emailCheck } from "../utils/validations";

const useForgotPasswordForm = () => {
  const [forgotpasswordForm, setForgotPasswordForm] = useState({
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
  });
  const [forgotFormValid, setForgotFormValid] = useState(false);

  return [
    forgotpasswordForm,
    setForgotPasswordForm,
    forgotFormValid,
    setForgotFormValid,
  ];
};

export default useForgotPasswordForm;
