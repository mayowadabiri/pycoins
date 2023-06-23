import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import verify from "../../assets/verify.svg";

const VerifyMsg = () => {
  return (
    <div className="verify">
      <Helmet>
        <title>Success - Payercoins</title>
      </Helmet>
      <img src={verify} alt="Success" className="verify_img mb-small" />
      <h3 className="title title-black ta mb-small">Verify your Email</h3>
      <p className="title title-grey ta mb-small">
        Hello, your account has been successfully registered. To complete the
        verification process, please check your email to verify your account.
      </p>
      <Link to="/auth/login" className="link">
        Login
      </Link>
    </div>
  );
};

export default VerifyMsg;
