import { useState } from "react";
import { required } from "./../utils/validations";

const useSelectForm = () => {
  const [selectForm, setSelectForm] = useState({
    select: {
      value: "",
      valid: false,
      elementType: "select",
      label: "Select Identification Type",
      options: [
        {
          label: "National Identification Number",
          value: "nin",
        },
        {
          label: "Driver's License Number",
          value: "driversLicense",
        },
        {
          label: "Voters Card",
          value: "voter",
        },
      ],
      validation: required,
    },
  });

  return [selectForm, setSelectForm];
};
export default useSelectForm;
