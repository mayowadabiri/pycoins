import { Link } from "react-router-dom";

import { Logout } from "../../icons";
import Toggle from "./Switch";

const Arrowdropdown = ({ checked, param, toggle, disabled }) => {
  return (
    <div className="dropdown">
      <div className="dropdown_container">
        <div className="dropdown_env">
          <p className="header-text header-text-grey">Test</p>
          <Toggle
            className="dropdown_toggle"
            checked={checked}
            param={param}
            toggle={toggle}
            disabled={disabled}
            height={20}
            width={40}
          />
          <p className="header-text header-text-grey">Live</p>
        </div>
        <Link to="/auth/create" className="sidebar_footer">
          <Logout />
          <p className="header-text header-text-grey">Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Arrowdropdown;
