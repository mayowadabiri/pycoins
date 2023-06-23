import { useState } from "react";
import { otpValidator } from "../utils/validations";

const useOtp = () => {
  const [otpForm, setOtpForm] = useState({
    otp: {
      value: "",
      type: "number",
      label: "Enter OTP",
      elementType: "input",
      validation: otpValidator,
      required: true,
      blur: false,
    },
  });

  const [isValidForm, setValid] = useState(false);
  return [otpForm, setOtpForm, isValidForm, setValid];
};

export default useOtp;
