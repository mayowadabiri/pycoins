import { useState, useEffect } from "react";
import { Copy, LeftArrow } from "../../icons";

import ActionLabel from "./../UI/ActionLabel";
import SmallLoader from "./../UI/SmallLoader";

import handleCopy from "./../../utils/copyToClipboard";

import QrcodeGenerator from "../QrCode";

const Pay = ({ goBack, data, event, amount, usd }) => {
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(15);

  useEffect(() => {
    let timer;
    if (event === "Payment Seen") {
      handleCountdown();
    }
    return () => clearInterval(timer);
  }, [event]);

  useEffect(() => {
    if (secs === -1) {
      setSecs(59);
      setMins((prevState) => prevState - 1);
    }
  }, [secs]);

  const handleCountdown = () => {
    setInterval(() => {
      setSecs((prevState) => {
        return prevState - 1;
      });
    }, 1000);
  };

  return (
    <div className="">
      <div className="popupform_back" onClick={goBack}>
        <LeftArrow fill={"#333333"} />
      </div>
      <h3 className="ta title-black title mb-small">Pay</h3>
      <div className="paymentpage_pay">
        <p className="title title-grey ta">
          To Pay, open your crypto wallet app and send the{" "}
          <strong> {data?.crypto.name}</strong> amount to the wallet address
          below. It will be automatically received after payment has been
          confirmed.
        </p>
        <div className="paymentpage_qr">
          <QrcodeGenerator value={data?.address} />
        </div>
        <div className="paymentpage_wallets">
          <div className="mb-small">
            <p className="title title-grey mb-smaller">AMOUNT</p>
            <ActionLabel
              text={`${parseFloat(amount).toFixed(6)} ${data?.crypto.name} (${
                data?.amount.currency.sign
              }${parseFloat(usd).toFixed(2)})`}
              onclick={() => handleCopy(amount)}
            >
              <Copy fill="#909198" />
            </ActionLabel>
          </div>
          <div>
            <p className="title title-grey mb-smaller">WALLET ADDRESS</p>
            <ActionLabel
              text={`${data?.address}`}
              onclick={() => handleCopy(data?.address)}
            >
              <Copy fill="#909198" />
            </ActionLabel>
          </div>
        </div>
      </div>
      <div className="paymentpage_loader">
        <SmallLoader isLoading={true} height={50} width={50} />
        <p className="title title-grey ta">
          {" "}
          {event === "Payment Seen"
            ? "Payment Seen! Confirming..."
            : event}{" "}
        </p>
        {event === "Payment Seen" && (
          <p>
            {mins < 10 && "0"}
            {mins}: {secs < 10 && "0"}
            {secs}
          </p>
        )}
      </div>
    </div>
  );
};

export default Pay;
