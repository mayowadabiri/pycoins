import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";

import { AppContext } from "./../../context/index";

import Toggle from "./Switch";

import { updateEnvironment } from "../../services/crypto";

import Hamburger from "../../assets/hamburger.svg";
import { toast } from "react-toastify";

const Header = ({ showsidebar, dropdown, close }) => {
  const { fullname, initials, environment } = useContext(AppContext);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    "updateenvironment",
    (data) => updateEnvironment(data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getuserenvironment");
        queryClient.invalidateQueries("getusercrypto");
        queryClient.invalidateQueries("getpaymentlinks");
        queryClient.invalidateQueries("getwallets");
        queryClient.invalidateQueries("getwallettransactions");
        queryClient.invalidateQueries("getwalletbalance");
        queryClient.invalidateQueries("getwalletbalance");
        queryClient.invalidateQueries("gettransactions");
        toast.success(`Switched Integration: ${data}`);
      },
    }
  );

  const toggleEnvironment = (data) => {
    mutate({ environment: data });
  };

  return (
    <header className="header">
      <div className="header_container">
        <div className="header_desktop">
          <p
            className={`${
              environment === "sandbox" && "header_test"
            } header-text`}
          >
            Test mode
          </p>
          {environment && (
            <Toggle
              checked={environment === "sandbox" ? false : true}
              param={environment === "sandbox" ? "live" : "sandbox"}
              toggle={toggleEnvironment}
              disabled={isLoading}
              offHandleColor="#EB4335"
              offColor="#FDF0EF"
            />
          )}
          <p
            className={`${environment === "live" && "header_live"} header-text`}
          >
            Live mode
          </p>
          {fullname && (
            <>
              <div className="header_name">{`${initials}`}</div>
              <p className="header-text header-text-black">{`${fullname}`}</p>
            </>
          )}
        </div>

        <div className="header_mobile">
          <img onClick={showsidebar} src={Hamburger} alt="sidebar" />
          <div className="header_mobile-env">
            <p
              className={`${
                environment === "sandbox" && "header_test"
              } header-text`}
            >
              Test mode
            </p>
            {environment && (
              <Toggle
                checked={environment === "sandbox" ? false : true}
                param={environment === "sandbox" ? "live" : "sandbox"}
                toggle={toggleEnvironment}
                disabled={isLoading}
                offHandleColor="#EB4335"
                offColor="#FDF0EF"
                height={20}
                width={50}
              />
            )}
            <p
              className={`${
                environment === "live" && "header_live"
              } header-text`}
            >
              Live mode
            </p>
            <div className="header_name_container">
              {fullname && <div className="header_name">{`${initials}`}</div>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
