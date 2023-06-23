import { useState } from "react";
import { ninValidator } from "../utils/validations";

const useNinForm = (amt) => {
  const [ninForm, setNinForm] = useState({
    ninNumber: {
      value: "",
      type: "text",
      label: "NIN",
      elementType: "input",
      validation: ninValidator,
      required: true,
      blur: false,
      info: "Number must be 11 characters long",
    },
  });
  return [ninForm, setNinForm];
};

export default useNinForm;
