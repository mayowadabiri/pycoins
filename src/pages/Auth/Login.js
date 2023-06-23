import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Helmet } from 'react-helmet';

import Button from '../../components/UI/Button';
import AuthFooter from '../../components/Auth/AuthFooter';

import useLoginForm from '../../hooks/login';

import { loginUser } from '../../services/auth';

import formGenerator from '../../utils/formGenerator';

const Login = ({ history }) => {
  const [verify, setVerify] = useState(false);
  const [loginForm, setLoginForm, loginFormValid, setLoginFormValid] =
    useLoginForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((data) => loginUser(data), {
    mutationKey: 'login',
    onSuccess: () => {
      history.push('/');
      queryClient.cache.reset();
    },
    onError: (error) => {
      if (error?.message === 'Please verify your email first!') setVerify(true);
    },
  });

  const form = formGenerator(loginForm, setLoginForm, setLoginFormValid);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let data = {};
    for (let key in loginForm) data[key] = loginForm[key].value;

    mutate(data);
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    let isValid = true;
    isValid = loginForm[event.target.name].validation(event.target.value);
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
    <div className="auth_form">
      <Helmet>
        <title>Login - Payercoins</title>
      </Helmet>
      <div className="auth_form-container">
        <h3 className="ta mb-small title title-black">Login to your account</h3>
        <p className="ta mb-small title title-grey">
          Enter your email address and password to continue.
        </p>
        {verify && (
          <Link to="/auth/email/verify" className="link ta mt-small mb-small">
            Didn't get Verification Link??
          </Link>
        )}
        <form onSubmit={handleSubmit}>
          {form}
          <Button
            disabled={loginFormValid}
            isLoading={isLoading}
            bg={'button_primary'}
            type="submit"
          >
            Sign In
          </Button>
        </form>
        <Link to="/auth/forgotpassword" className="link ta mt-small">
          Forgot Password?
        </Link>

        <AuthFooter
          title={"Don't have an account?"}
          link={'/auth/create'}
          linkTitle={'Sign Up'}
        />
      </div>
    </div>
  );
};

export default Login;
