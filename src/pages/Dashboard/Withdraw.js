import { useState } from "react";

import Accounts from "../../components/Account";
import Response from "../../components/Response";
import Modal from "../../components/UI/Modal";
import WithdrawForm from "../../components/WithdrawForm";
import Confirmation from "./../../components/Confirmation";

import Success from "../../assets/success.svg";

import { cryptos } from "../../constants";

const WithDraw = ({ currency, close }) => {
  const [name, setName] = useState("");
  const handleChange = (name) => {
    setName(name);
  };

  const withdraw = (evt) => {
    evt.preventDefault();
    setName("withdraw");
  };
  const handleSuccess = (evt) => {
    evt.preventDefault();
    setName("success");
  };

  const crypto = cryptos.filter((item) => item.name === currency);

  let renderElement;
  switch (name) {
    case "":
      renderElement = (
        <>
          <Accounts cryptos={crypto} name={name} showForm={handleChange} />
        </>
      );
      break;
    case "bank":
      renderElement = (
        <>
          <WithdrawForm
            goBack={() => setName("")}
            name=""
            withdraw={withdraw}
          />
        </>
      );
      break;
    case currency:
      renderElement = (
        <>
          <WithdrawForm
            goBack={() => setName("")}
            name=""
            withdraw={withdraw}
          />
        </>
      );
      break;
    case "withdraw":
      renderElement = (
        <>
          <Confirmation
            goBack={() => setName("bank")}
            success={handleSuccess}
          />
        </>
      );
      break;
    case "success":
      renderElement = (
        <>
          <Response>
            <img src={Success} alt="Success" />
            <h3 className="title title-black">Withdrawal Successful</h3>
            <p className="title title-grey ta">
              Your withdrawal of NGN 100,000 was successful.
            </p>
          </Response>
        </>
      );
      break;
  }

  return <Modal close={close}>{renderElement}</Modal>;
};

export default WithDraw;
