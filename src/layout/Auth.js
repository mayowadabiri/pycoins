import { renderRoutes, matchRoutes } from "react-router-config";

import Background from "../components/UI/Background";

import Logo from "../assets/Logo.svg";

const Auth = ({ route, history, location }) => {
  const branch = matchRoutes(route.routes, location.pathname);
  if (branch.length < 1) history.push("/page-not-found");

  return (
    <div className="auth">
      <Background>
        <div className="auth_img">
          <img src={Logo} alt="payercoins" />
        </div>

        {renderRoutes(route.routes)}
      </Background>
    </div>
  );
};

export default Auth;
