import { useState } from "react";

import { required, rcValidator } from "../utils/validations";

const useCompanyForm = () => {
  const [companyForm, setCompanyForm] = useState({
    rcNumber: {
      value: "",
      type: "text",
      label: "RC Number",
      elementType: "input",
      validation: rcValidator,
      required: true,
      valid: false,
      blur: false,
    },
    companyName: {
      value: "",
      type: "text",
      label: "Company Name",
      elementType: "input",
      validation: required,
      required: true,
      valid: false,
      blur: false,
    },
  });

  return [companyForm, setCompanyForm];
};

export default useCompanyForm;
