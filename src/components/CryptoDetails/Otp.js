import { LeftArrow } from "../../icons";
import Button from "../UI/Button";
// import Input from "../UI/Input";
import formGenerator from "./../../utils/formGenerator";

const OtpForm = ({
  goBack,
  otpForm,
  setForm,
  validForm,
  setValidForm,
  verifyOtp,
  isLoading,
}) => {
  const form = formGenerator(otpForm, setForm, setValidForm);
  return (
    <div className="popupform">
      <div className="popupform_back" onClick={goBack}>
        <LeftArrow fill={"#333333"} />
      </div>
      <h3 className="title title-black ta ">OTP Verification</h3>
      <p className="title title-grey mt-small">
        Enter the verification code sent to the email address linked to your
        account
      </p>
      <form className="mt-small" onSubmit={verifyOtp}>{form}</form>
      <Button
        disabled={validForm}
        isLoading={isLoading}
        type={"submit"}
        onclick={verifyOtp}
        bg="button_primary"
      >
        Verify OTP
      </Button>
    </div>
  );
};

export default OtpForm;
