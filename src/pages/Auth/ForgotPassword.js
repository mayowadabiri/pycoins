import { Helmet } from "react-helmet";
import { useMutation } from "react-query";

import Button from "../../components/UI/Button";
import AuthFooter from "../../components/Auth/AuthFooter";

import useForgotPasswordForm from "../../hooks/forgotPasswordForm";

import { forgotpassword } from "./../../services/auth";

import formGenerator from "./../../utils/formGenerator";

const ForgotPassword = ({ history }) => {
  const [
    forgotpasswordForm,
    setForgotPasswordForm,
    forgotFormValid,
    setForgotFormValid,
  ] = useForgotPasswordForm();
  const form = formGenerator(
    forgotpasswordForm,
    setForgotPasswordForm,
    setForgotFormValid
  );

  const { mutate, isLoading } = useMutation((data) => forgotpassword(data), {
    mutationKey: "forgot-password",
    onSuccess: () => history.push("/auth/login"),
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      email: forgotpasswordForm.email.value,
    };

    mutate(data);
  };

  return (
    <div className="auth_form">
      <Helmet>
        <title>Forogot Password - Payercoins</title>
      </Helmet>
      <div className="auth_form-container ta">
        <h3 className=" mb-small title title-black">Forgot Password</h3>
        <p className=" mb-small title title-grey">
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          {form}
          <Button
            type="submit"
            disabled={forgotFormValid}
            bg={"button_primary"}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </form>
        <AuthFooter
          title={"Remember Your Passoword?"}
          link={"/auth/login"}
          linkTitle={"Login"}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
