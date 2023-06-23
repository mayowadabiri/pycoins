import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMutation } from "react-query";

import Button from "./../../components/UI/Button";
import AuthFooter from "./../../components/Auth/AuthFooter";

import useForgotPasswordForm from "../../hooks/forgotPasswordForm";

import { useVerifyEmail } from "../../query/getVerifiedEmail";

import { resendEmailVerify } from "../../services/auth";

import formGenerator from "./../../utils/formGenerator";

const Verification = ({ history }) => {
  const { search } = useLocation();
  const token = search.substring(20);
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
  const { mutate, isLoading } = useMutation((data) => resendEmailVerify(data));

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      email: forgotpasswordForm.email.value,
    };
    mutate(data);
  };

  const VerifyEmail = () => {
    const { isError } = useVerifyEmail(token, history);
    if (isError) {
      return (
        <div className="auth_form">
          <Helmet>
            <title>Verify Email - Payercoins</title>
          </Helmet>
          <div className="auth_form-container ta">
            <h3 className=" mb-small title title-black">Resend Email</h3>
            <form onSubmit={handleSubmit}>
              {form}
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={forgotFormValid}
                bg={"button_primary"}
              >
                Resend Email{" "}
              </Button>
            </form>
            <AuthFooter
              title={"Don't have an account?"}
              link={"/auth/create"}
              linkTitle={"Login"}
            />
          </div>
        </div>
      );
    }
    return <div className="ta">Verifying Your Account...</div>;
  };

  if (token !== "") {
    return <VerifyEmail />;
  } else {
    return (
      <div className="auth_form">
        <Helmet>
          <title>Verify Email - Payercoins</title>
        </Helmet>
        <div className="auth_form-container ta">
          <h3 className=" mb-small title title-black">Resend Email</h3>
          <form onSubmit={handleSubmit}>
            {form}
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={forgotFormValid}
              bg={"button_primary"}
            >
              Resend Email{" "}
            </Button>
          </form>
          <AuthFooter
            title={"Don't have an account?"}
            link={"/auth/create"}
            linkTitle={"Login"}
          />
        </div>
      </div>
    );
  }
};

export default Verification;
