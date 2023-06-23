import { useState } from "react";
import { required, driverNumberValidator } from "../utils/validations";

const useDriverLicenseForm = (amt) => {
  const [driversLicenseForm, setDriverLicenseForm] = useState({
    driversLicenseNumber: {
      value: "",
      type: "text",
      label: "Driver's License Number",
      elementType: "input",
      validation: driverNumberValidator,
      required: true,
      valid: false,
      blur: false,
      info: "Must be 12 characters long",
    },
    dLdateOfBirth: {
      value: "",
      type: "date",
      label: "Date of Birth",
      elementType: "input",
      validation: required,
      required: true,
      blur: false,
      valid: false,
    },
  });
  return [driversLicenseForm, setDriverLicenseForm];
};

export default useDriverLicenseForm;
