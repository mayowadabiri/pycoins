import { useState } from "react";

import { required } from "../utils/validations";

const useWebHookForm = () => {
  const [liveForm, setLiveForm] = useState({
    callback: {
      value: "",
      valid: false,
      elementType: "input",
      label: "Live Callback URL",
      validation: required,
      blur: false,
    },
    webhook: {
      value: "",
      valid: false,
      elementType: "input",
      label: "Live Callback URL",
      validation: required,
      blur: false,
    },
  });

  const [liveFormValid, setLiveFormValid] = useState(false);
  const [testForm, setTestForm] = useState({
    callback: {
      value: "",
      valid: false,
      elementType: "input",
      label: "Live Callback URL",
      validation: required,
      blur: false,
    },
    webhook: {
      value: "",
      valid: false,
      elementType: "input",
      label: "Live Callback URL",
      validation: required,
      blur: false,
    },
  });
  const [testFormValid, setTestFormValid] = useState(false);

  return [
    liveForm,
    setLiveForm,
    liveFormValid,
    setLiveFormValid,
    testForm,
    setTestForm,
    testFormValid,
    setTestFormValid,
  ];
};

export default useWebHookForm;
