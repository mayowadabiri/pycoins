import { House } from "../icons";
import Proceed from "../assets/proceed.svg";

import { useLocation, Link, useParams } from "react-router-dom";
import { RightArrow } from "./../icons/index";
import { useMemo } from "react";
import { cryptos as cryptoList } from "../constants/index";

const Accounts = ({
  showForm,
  goBack,
  name,
  cryptos,
  title,
  header,
  isBankAdded,
}) => {
  const { pathname } = useLocation();
  const { slug } = useParams();

  const cryptoName = useMemo(() => {
    return cryptoList.find((item) => item.slug === slug);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {name === "" && (
        <div className="accounts">
          <h3 className="title title-black">{header}</h3>
          <div className="accounts_container mt-small">
            <h5 className="mute">{title} </h5>
            <div className="accounts_list mt-small">
              {!pathname.includes("pay") && !isBankAdded && (
                <div
                  className="accounts_item mt-small"
                  onClick={() => showForm("bank")}
                >
                  <div className="accounts_img accounts_img-1">
                    <House fill="#787676" width={"14"} height="14" />
                  </div>
                  <p className="title title-grey">Bank Account</p>
                  <img src={Proceed} alt="Continue" />
                </div>
              )}
              {cryptos &&
                cryptos?.map((item) => (
                  <div
                    key={item.name}
                    className="accounts_item mt-small"
                    onClick={() => showForm(item.slug)}
                  >
                    <div className={item.classname}>
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className={"accounts_content"}>
                      <p className="title title-grey">{item.name} Wallet</p>
                      {pathname.includes("pay") && (
                        <p className="title title-grey ta">
                          1{item.rate} = ${item.rateValue}{" "}
                        </p>
                      )}
                    </div>
                    <img src={Proceed} alt="Continue" />
                  </div>
                ))}
              {!cryptos && (
                <Link
                  to={{ pathname: "/settings/settlements" }}
                  className="link link-small mt-small"
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span className="link ">
                    Click to add {cryptoName.name} account
                  </span>
                  <RightArrow fill={"#48D189"} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Accounts;
