import Modal from "../UI/Modal";
import ActionLabel from "./../UI/ActionLabel";

import { Copy } from "../../icons";
import handleCopy from "./../../utils/copyToClipboard";
import QrcodeGenerator from "./../QrCode";

const FundWallet = ({ close, address }) => {
  return (
    <Modal close={close}>
      <h3 className="title title-black">Fund Wallet</h3>
      <div className="fund ">
        <div className="fund_img">
          <QrcodeGenerator value={address?.address || ""} />
        </div>
        <p className="title title-grey">WALLET ADDRESS</p>
        <ActionLabel
          className="mt-small"
          text={address?.address}
          onclick={() => handleCopy(address?.address)}
        >
          <Copy fill="#909198" />
        </ActionLabel>
        {/* <div className="fund_details mt-small">
          <p className="title title-grey">BTC BALANCE</p>
          <p className="title title-grey">0 BTC = NGN 0.00</p>
        </div> */}
      </div>
    </Modal>
  );
};

export default FundWallet;
