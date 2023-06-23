import { useState } from "react";
import { validateFormmatedWithdraw } from "../utils/validations";

const useFormattedWithdraw = (label) => {
  const [formattedWithdrawalForm, setFormattedWithdrawalForm] = useState({
    amount: {
      value: "",
      type: "text",
      label: label,
      elementType: "input",
      validation: validateFormmatedWithdraw,
      required: true,
      blur: false,
      valid: false,
      comma: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);
  return [
    formattedWithdrawalForm,
    setFormattedWithdrawalForm,
    formIsValid,
    setFormIsValid,
  ];
};

export default useFormattedWithdraw;
