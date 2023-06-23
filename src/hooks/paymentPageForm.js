import { useState, useEffect } from "react";
import { required, emailCheck } from "../utils/validations";

const usePaymentPageForm = (data) => {
  const [paymentPageForm, setPaymentPageForm] = useState({
    name: {
      value: "",
      valid: false,
      elementType: "input",
      type: "text",
      label: "Name",
      required: true,
      validation: required,
      blur: false,
    },
    email: {
      value: "",
      valid: false,
      type: "email",
      elementType: "input",
      label: "Email",
      required: true,
      validation: emailCheck,
      blur: false,
    },
    amount: {
      value: "",
      valid: false,
      type: "text",
      elementType: "input",
      placeholder: "Number",
      label: "Enter Amount (USD)",
      required: true,
      validation: required,
      blur: false,
      readonly: false,
      comma: true,
    },
    message: {
      value: "",
      valid: true,
      type: "text",
      elementType: "textarea",
      placeholder: "Message (Optional)",
      label: "Message",
      validation: required,
    },
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setPaymentPageForm((prevState) => {
      const value = new Intl.NumberFormat().format(
        (Math.round(data?.amount * 100) / 100).toString()
      );

      return {
        ...prevState,
        amount: {
          ...prevState.amount,
          readonly: data?.amountType === "fixed" ? true : false,
          value: data?.amountType === "fixed" ? value : "",
          valid: data?.amountType === "fixed" ? true : false,
        },
      };
    });
  }, [data]);

  return [paymentPageForm, setPaymentPageForm, formValid, setFormValid];
};

export default usePaymentPageForm;
