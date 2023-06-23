import { useState } from "react";
import { required } from "../utils/validations";

const useAmount = (amt) => {
  const [amountForm, setAmountForm] = useState({
    amount: {
      value: amt ? amt : "",
      type: "number",
      label: "Enter your amount (USD)",
      elementType: "input",
      validation: required,
      required: true,
      blur: false,
    },
  });
  return [amountForm, setAmountForm];
};

export default useAmount;
