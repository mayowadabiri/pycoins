import { useState } from "react";
import { validateWithdraw } from "../utils/validations";

const useWithdrawForm = () => {
  const [withdrawForm, setWithdrawForm] = useState({
    amount: {
      value: "",
      type: "text",
      label: "Amount",
      elementType: "input",
      validation: validateWithdraw,
      required: true,
      blur: false,
      valid: false,
    },
  });

  const [formValid, setFormValid] = useState(false);
  return [withdrawForm, setWithdrawForm, formValid, setFormValid];
};

export default useWithdrawForm;
