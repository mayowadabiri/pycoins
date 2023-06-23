import { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AppContext } from "../context";

const withRegistrationType = (Component) => (props) => {
  const { register } = useContext(AppContext);

  return register ? <Component {...props} /> : <Redirect to="/auth/create" />;
};

export default withRegistrationType;
