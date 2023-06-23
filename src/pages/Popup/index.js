import { useState } from "react";

import { cryptos } from "../../constants";
import Modal from "./../../components/UI/Modal";
import Account from "../../components/Account";
import Settlement from "../../components/Popup/Settlement";
import Bank from "../../components/Popup/Bank";
import CryptoForm from "../../components/Popup/CryptoForm";

const Popup = ({ closeModal, show }) => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");

  const handleBack = () => {
    setName("");
  };

  const showForm = (name) => {
    setName(name);
  };
  const handleChange = (evt) => {
    evt.preventDefault();

    setAccount("account");
  };

  return (
    <Modal close={closeModal}>
      {account === "" && <Settlement handlechange={handleChange} />}
      {account === "account" && (
        <Account
          cryptos={cryptos}
          name={name}
          showForm={showForm}
          goBack={handleBack}
          header="Settlement Account"
          title="SELECT YOUR SETTLEMENT METHOD"
        />
      )}
      {name === "bank" && <Bank goBack={handleBack} />}
      {name !== "" && name !== "bank" && (
        <CryptoForm name={name} goBack={handleBack} />
      )}
    </Modal>
  );
};

export default Popup;
