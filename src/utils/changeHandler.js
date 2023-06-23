import show from "../assets/show.svg";
import hide from "../assets/hide.svg";
import { addComma } from "./numberWithComma";

export const changeHandler = (
  event,
  elementID,
  formType,
  formUpdate,
  validForm,
  options
) => {
  let updatedFormElement = {};
  let isValid = true;

  if (elementID === "currency") {
    isValid = formType[elementID].validation(event) && isValid;
    updatedFormElement = {
      ...formType[elementID],
      value: event.map((item) => item.value),
      valid: isValid,
      selected: event,
    };
  } else if (elementID === "phoneNumber") {
    isValid = formType[elementID].validation(event) && isValid;
    updatedFormElement = {
      ...formType[elementID],
      value: event,
      valid: isValid,
      selected: event,
    };
  } else {
    if (elementID === "businessDocument") {
      updatedFormElement = {
        ...formType["businessDocument"],
        valid: true,
        value: event.target.files[0],
        label: event.target.files[0].name,
      };
    } else if (formType[elementID].comma) {
      const commaAddedvalues = addComma(event.target.value);
      updatedFormElement = {
        ...formType[elementID],
        value: commaAddedvalues,
        valid: formType[elementID].validation(event.target.value),
      };
    } else {
      let passwordValue = formType["password"]
        ? formType["password"].value
        : null;

      let isValid = true;
      const value = event?.target ? event?.target.value : event?.value;
      isValid = formType[elementID].validation(value, passwordValue) && isValid;
      updatedFormElement = {
        ...formType[elementID],
        value: event?.target ? event?.target.value : event?.value,
        valid: isValid,
      };
    }
  }
  const updatedForm = {
    ...formType,
    [elementID]: updatedFormElement,
  };

  if (updatedForm["password"] && updatedForm["confirm"]) {
    if (updatedForm["password"].value === updatedForm["confirm"].value) {
      updatedForm["confirm"].valid = true;
    } else updatedForm["confirm"].valid = false;
  }
  if (validForm) {
    let formIsValid = true;
    for (let elementID in updatedForm) {
      formIsValid = updatedForm[elementID].valid && formIsValid;
    }
    validForm(formIsValid);
  }
  formUpdate(updatedForm);
};

export const handleBlur = (elementID, formType, updateFunction) => {
  const updatedFormElement = {
    ...formType[elementID],
    blur: true,
  };

  const updatedForm = {
    ...formType,
    [elementID]: updatedFormElement,
  };
  return updateFunction(updatedForm);
};

export const showPassword = (evt, elementID, formType, formUpdateFunc) => {
  const updatedFormElement = {
    ...formType[elementID],
    show: !formType[elementID].show,
    type: formType[elementID].show ? "text" : "password",
    image: formType[elementID].show ? hide : show,
  };

  const updatedForm = {
    ...formType,
    [elementID]: updatedFormElement,
  };

  formUpdateFunc(updatedForm);
};

export const removeItem = (
  event,
  elementID,
  formType,
  formUpdateFunc,
  validForm
) => {
  if (elementID === "currency") {
    let isValid = true;
    isValid = formType[elementID].validation(event) && isValid;

    const updatedFormElement = {
      ...formType[elementID],
      value: event.map((item) => item.value),
      valid: isValid,
      selected: event,
    };

    const updatedForm = {
      ...formType,
      [elementID]: updatedFormElement,
    };
    formUpdateFunc(updatedForm);
  }
};
