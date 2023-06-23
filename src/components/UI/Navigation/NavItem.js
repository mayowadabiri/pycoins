import { NavLink } from "react-router-dom";
const NavItem = ({ children, title, to, exact, close }) => {
  return (
    <>
      <li className="nav_item" onClick={close}>
        <NavLink
          exact={exact}
          activeClassName="nav_active"
          className="nav_link"
          to={to}
        >
          {children}
          <span className="nav-text"> {title}</span>
        </NavLink>
      </li>
    </>
  );
};
export default NavItem;
