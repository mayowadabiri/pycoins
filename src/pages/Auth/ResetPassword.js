import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

import Button from "../../components/UI/Button";
import AuthFooter from "../../components/Auth/AuthFooter";

import formGenerator from "../../utils/formGenerator";

import useResetPasswordForm from "../../hooks/resetPasswordForm";

import { resetPassword } from "../../services/auth";

const ResetPassword = ({ history }) => {
  const { search } = useLocation();

  const [
    resetPasswordForm,
    setResetPassword,
    resetPasswordValid,
    setResetPasswordValid,
  ] = useResetPasswordForm();
  const form = formGenerator(
    resetPasswordForm,
    setResetPassword,
    setResetPasswordValid
  );

  const token = search.substring(19);

  const { mutate, isLoading } = useMutation(
    (data) => resetPassword(data, token),
    {
      mutationKey: "reset-password",
      onSuccess: () => {
        toast.success("Password reset was successful. Redirecting...");
        history.push("/auth/login");
      },
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let data = {
      password: resetPasswordForm["password"].value,
    };
    mutate(data);
  };

  return (
    <div className="auth_form">
      <Helmet>
        <title>Reset Password - Payercoins</title>
      </Helmet>
      <div className="auth_form-container">
        <h3 className="ta mb-small title title-black">Create New Password</h3>
        <p className="ta mb-small title title-grey">
          Enter your new password below and must be 8 characters, special
          character and an uppercase letter.
        </p>
        <form onSubmit={handleSubmit}>
          {form}
          <Button
            type="submit"
            disabled={resetPasswordValid}
            bg={"button_primary"}
            isLoading={isLoading}
          >
            Reset Password{" "}
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

export default ResetPassword;
