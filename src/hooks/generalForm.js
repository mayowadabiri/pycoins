import { useState } from "react";

import {
  required,
  phoneNumberCheck,
  emailCheck,
  password,
  confirmPassword,
} from "../utils/validations";

import show from "../assets/show.svg";

const useGeneralForm = (profile) => {
  const [personalForm, setPersonalForm] = useState({
    firstName: {
      value: profile?.user?.firstName || "",
      valid: true,
      elementType: "input",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
      required: true,
      validation: required,
      blur: false,
      initialValue: profile?.user?.firstName || "",
      readonly: profile?.user?.isUserVerified ? true : false,
    },
    lastName: {
      value: profile?.user?.lastName || "",
      valid: true,
      elementType: "input",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
      required: true,
      validation: required,
      blur: false,
      initialValue: profile?.user?.lastName || "",
      readonly: profile?.user?.isUserVerified ? true : false,
    },
    phoneNumber: {
      value: profile?.user?.phoneNumber || "",
      valid: true,
      type: "text",
      elementType: "phone",
      placeholder: "Phone Number",
      label: "Phone Number",
      required: true,
      validation: phoneNumberCheck,
      blur: false,
      initialValue: profile?.user?.phoneNumber || "",
      info: "Number must start with a +234",
      readonly: profile?.user?.isUserVerified ? true : false,
    },
  });
  const [personalFormValid, setPersonalFormValid] = useState(true);

  const [businessForm, setBusinessForm] = useState({
    businessName: {
      value: profile?.business?.businessName,
      valid: true,
      elementType: "input",
      type: "text",
      label: "Business Name",
      required: true,
      validation: required,
      blur: false,
      initialValue: profile?.business?.businessName,
      readonly: profile?.business?.isBusinessVerified ? true : false,
    },
    businessEmail: {
      value: profile?.business?.businessEmail,
      valid: true,
      type: "email",
      elementType: "input",
      label: "Business Email",
      validation: emailCheck,
      blur: false,
      initialValue: profile?.business?.businessEmail,
      readonly: profile?.business?.isBusinessVerified ? true : false,
    },
    businessAddress: {
      value: profile?.business?.businessAddress,
      valid: true,
      type: "text",
      elementType: "input",
      placeholder: "Business Address",
      label: "Business Address",
      blur: false,
      required: true,
      validation: required,
      initialValue: profile?.business?.businessAddress,
      readonly: profile?.business?.isBusinessVerified ? true : false,
    },
  });

  const [businessFormValid, setBusinessFormValid] = useState(true);

  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: {
      value: "",
      valid: false,
      type: "password",
      elementType: "input",
      image: show,
      label: "Current Password",
      validation: password,
      blur: false,
      required: true,
      show: false,
    },
    password: {
      value: "",
      valid: false,
      type: "password",
      elementType: "input",
      placeholder: "New Password",
      image: show,
      label: "Password",
      validation: password,
      blur: false,
      required: true,
      show: false,
      info: "Password must be alphanumeric, 8 characters long and must contain a  special character",
    },
    confirmPassword: {
      value: "",
      valid: false,
      type: "password",
      elementType: "input",
      image: show,
      label: "Confirm Password",
      validation: confirmPassword,
      blur: false,
      required: true,
      show: false,
    },
  });

  const [changePasswordValid, setChangePasswordValid] = useState(false);

  return [
    personalForm,
    setPersonalForm,
    businessForm,
    setBusinessForm,
    personalFormValid,
    setPersonalFormValid,
    businessFormValid,
    setBusinessFormValid,
    changePasswordForm,
    setChangePasswordForm,
    changePasswordValid,
    setChangePasswordValid,
  ];
};

export default useGeneralForm;
