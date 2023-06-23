import { useState, useEffect } from "react";
import { required, votersCardValidator } from "../utils/validations";
import { state } from "../constants";
const useVotersForm = (amt) => {
  const [voterForm, setVoterForm] = useState({
    votersCardNumber: {
      value: "",
      type: "text",
      label: "Voter's Card Number",
      elementType: "input",
      validation: votersCardValidator,
      required: true,
      blur: false,
      info: "Must be 19 characters long",
    },
    lastNameVoters: {
      value: "",
      type: "text",
      label: "Voter's Last Name",
      elementType: "input",
      validation: required,
      required: true,
      blur: false,
    },
    votersState: {
      value: "",
      valid: false,
      elementType: "select",
      label: "State",
      options: [],
      validation: required,
    },
  });

  useEffect(() => {
    setVoterForm((prevState) => ({
      ...prevState,
      votersState: {
        ...prevState.votersState,
        options: state.map((item) => {
          return {
            label: item,
            value: item,
          };
        }),
      },
    }));
  }, []);
  return [voterForm, setVoterForm];
};

export default useVotersForm;
