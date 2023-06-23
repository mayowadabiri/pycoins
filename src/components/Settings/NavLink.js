import { NavLink } from "react-router-dom";

const SettingsNav = ({ tab, name, active }) => {
  return (
    <li className="settings_li">
      <NavLink
        to={{
          pathname: `/settings${tab}`,
        }}
        className={"nav-text"}
        activeClassName="settings_active"
        // exact
      >
        {name}
      </NavLink>
    </li>
  );
};

export default SettingsNav;
