import { useState } from "react";
import NavItem from "./NavItem";
import { NavLink, useLocation } from "react-router-dom";
import Dropdown from "../../../assets/dropdown.svg";
import { Home, Payment, Settings, Wallet } from "../../../icons";

const items = [{ id: 1, title: "Payment Page", link: "/payment/pay" }];

const Navigation = ({ close }) => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <nav className="nav">
      <ul className="nav_items">
        <NavItem close={close} to="/" exact title="Dashboard">
          <Home />
        </NavItem>
        <NavItem close={close} to="/wallets" title="Wallet">
          <Wallet />
        </NavItem>
        <li className={"nav_item"} onClick={handleShow}>
          <div className={pathname.includes("payment") ? "nav_active" : ""}>
            <Payment />
            <span className="nav-text">Payment</span>
            <img
              src={Dropdown}
              alt="Dropdown"
              className={show ? "nav_up" : "nav_down"}
            />
          </div>
          <div className={show ? "nav_show" : ""}>
            {items.map((item) => (
              <p onClick={close} key={item.id}>
                <NavLink
                  key={item.id}
                  activeClassName="nav_active"
                  className="nav_link"
                  to={`${item.link}`}
                >
                  <span className="nav-text">{item.title}</span>
                </NavLink>
              </p>
            ))}
          </div>
        </li>
        <NavItem close={close} to="/settings/general" title="Settings">
          <Settings />
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navigation;
