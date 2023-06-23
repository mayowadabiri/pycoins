import { useState } from "react";
import { required } from "../utils/validations";

const useCryptoForm = (address) => {
  const [cryptoForm, setCryptoForm] = useState({
    address: {
      value: address ? address : "",
      type: "text",
      label: "Enter Wallet Address",
      elementType: "input",
      validation: required,
      required: true,
      blur: false,
      valid: address && true,
    },
  });

  const [isValidForm, setValid] = useState(address ? true : false);
  return [cryptoForm, setCryptoForm, isValidForm, setValid];
};

export default useCryptoForm;
