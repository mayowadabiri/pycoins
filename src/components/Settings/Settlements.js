import Settlement from "../Popup/Settlement";
import { useState, useEffect, useContext, useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import Modal from "./../UI/Modal";
import Accounts from "./../Account";
import { cryptos } from "../../constants";
import Bank from "./../Popup/Bank";
import CryptoForm from "./../Popup/CryptoForm";
import { useGetFeePreference } from "../../query/getFeePreference";
import { updatePreference } from "../../services/fee";
import SettlementInfo from "./SettlementInfo";
import { AppContext } from "./../../context/index";
import Button from "../UI/Button";
import { cryptos as cryptoList } from "../../constants";

const Settlements = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState("");
  const { settlements } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { data, isFetching } = useGetFeePreference();
  const { mutate } = useMutation(
    "updatefeepreference",
    (data) => updatePreference(data),
    {
      onSuccess: () => queryClient.invalidateQueries("getfeepreference"),
    }
  );

  useEffect(() => {
    setChecked(data);
  }, [data]);

  const handleChange = (name) => {
    setName(name);
  };

  const changeFeePreference = (evt) => {
    setChecked(evt.target.value);
    mutate({ preference: evt.target.value });
  };

  const handleClose = () => {
    setShow(false);
    setName("");
  };

  const formmatedSettlements = useMemo(() => {
    let formmated = [];
    if (settlements) {
      formmated = settlements.map((settlement) => {
        return {
          ...settlement,
          crypto: cryptoList.find(
            (crypto) => crypto.slug === settlement.wallet_slug
          ),
        };
      });
    }
    return formmated;
  }, [settlements]);

  const crypto = useMemo(() => {
    return cryptos.filter(
      (item) => !settlements.find((key) => key.wallet_slug === item.slug)
    );
  }, [settlements]);

  const bankAdded = useMemo(() => {
    return settlements.find((item) => item.key === "bank") ? true : false;
  }, [settlements]);

  return (
    <>
      <div className="settlements">
        <div>
          <div>
            <h3 className="title title-black">Settlement Information</h3>
          </div>
          {settlements.length < 1 && (
            <div className="settlements_box">
              <Settlement handlechange={() => setShow(true)} />
            </div>
          )}

          {settlements.length > 0 && (
            <div className="settlements_content">
              <div className="settlements_info mt-small">
                {formmatedSettlements.map((item) => (
                  <SettlementInfo key={item.key} {...item} />
                ))}
              </div>
              {settlements.length > 0 && settlements.length < 5 && (
                <div className="settlements_button">
                  <Button bg={"button_primary"} onclick={() => setShow(true)}>
                    Add Settlement Account
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-md">
          <h3 className="title title-black title-small">
            <strong> Who should pay the transaction fees?</strong>
          </h3>
          <div className="settlements_charge">
            <div className="radio mt-small">
              <input
                hidden
                type="radio"
                id="merchant"
                name="chargeType"
                onChange={changeFeePreference}
                checked={checked === "merchant" && true}
                value="merchant"
                disabled={isFetching && true}
              />
              <label htmlFor="merchant">
                <span></span>
                <span>Charge me for the transaction fees</span>
              </label>
            </div>
            <div className="radio mt-small">
              <input
                hidden
                type="radio"
                id="user"
                name="chargeType"
                onChange={changeFeePreference}
                checked={checked === "user" && true}
                value="user"
                disabled={isFetching && true}
              />
              <label htmlFor="user">
                <span></span>
                <span>Make customers pay the transaction fees</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <Modal close={handleClose}>
          <Accounts
            showForm={handleChange}
            name={name}
            cryptos={crypto}
            header="Settlement Account"
            title="SEECT YOUR SETTTLEMENT METHOD"
            isBankAdded={bankAdded}
          />
          {name === "bank" && <Bank close={() => handleClose()} />}
          {name !== "" && name !== "bank" && (
            <CryptoForm
              goBack={() => setName("")}
              name={name}
              close={() => handleClose()}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default Settlements;
