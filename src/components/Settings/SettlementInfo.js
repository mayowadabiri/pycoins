import { Edit, Delete as DeleteIcon } from "./../../icons/index";
import Modal from "./../UI/Modal";
import { useState } from "react";
import CryptoForm from "../Popup/CryptoForm";
import Bank from "../Popup/Bank";
import Delete from "../UI/Delete";
import { useDeleteCryptoSettlement } from "../../query/deleteCryptoSettlement";

const SettlementInfo = ({
  wallet_slug,
  wallet_address,
  account_name,
  account_number,
  crypto,
  bank_name,
}) => {
  const [name, setName] = useState("");
  const [deleteData, setDeleteData] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const { mutate, isLoading: deleteLoading } =
    useDeleteCryptoSettlement(deleteData);

  const handleShowEdit = (value) => {
    setName(value);
  };

  const handleDelete = (symbol) => {
    const data = {
      type: symbol !== "bank" ? "crypto" : "bank",
    };
    if (symbol !== "bank") data["wallet_symbol"] = symbol;
    setDeleteData(data);
    setShowDelete(true);
  };
  return (
    <>
      <div className="settlements_info-item">
        <div className="currency">
          <p className="title title-grey mb-small ">Currency</p>
          <p className="title title-black">{crypto?.name || "Naira"}</p>
        </div>
        <div className="address">
          <p className="title title-grey mb-small">
            {wallet_slug ? "Address" : "Bank Account"}
          </p>
          <p>
            <span className="title title-black ">
              {wallet_slug
                ? wallet_address
                : `${account_number} (${account_name})`}
            </span>
          </p>
        </div>
        {bank_name && (
          <div>
            <p className="title title-grey mb-small ">Bank</p>
            <p className="title title-black">{bank_name}</p>
          </div>
        )}
        <div className="settlements_info-icon">
          <div
            className="settlements_info-icon-item"
            onClick={() => handleShowEdit(wallet_slug || "bank")}
          >
            <Edit fill="#48D189" />
          </div>
          <div
            className="settlements_info-icon-item"
            onClick={() => handleDelete(crypto?.type || "bank")}
          >
            <DeleteIcon fill="#48D189" />
          </div>
        </div>
      </div>
      {name !== "" && (
        <Modal close={() => setName("")}>
          {name !== "bank" && (
            <CryptoForm
              close={() => setName("")}
              edit={true}
              name={wallet_slug}
              address={wallet_address}
            />
          )}
          {name === "bank" && (
            <Bank
              close={() => setName("")}
              edit={true}
              name={account_name}
              bankName={bank_name}
              number={account_number}
              editing={true}
            />
          )}
        </Modal>
      )}

      {showDelete && (
        <Delete
          close={() => setShowDelete(false)}
          mutate={mutate}
          text="Are you sure you want to delete this settlement account"
          isLoading={deleteLoading}
        />
      )}
    </>
  );
};

export default SettlementInfo;
