import Button from "../UI/Button";

import { LeftArrow } from "../../icons";

const Confirmation = ({ success, goBack }) => {
  return (
    <div className="popupform">
      <div className="popupform_back" onClick={goBack}>
        <LeftArrow fill={"#333333"} />
      </div>
      <h3 className="ta title-black title mb-small">Confirmation</h3>
      <div className="mt-small mb-small">
        <p className="ta title title-grey">Amount</p>
        <p className="ta title title-grey">105, 000 NGN</p>
        <div className="transdetails_box">
          <div className="transdetails_item">
            <p className="title title-grey">Amount to withdraw</p>
            <p className="title title-grey"> 0.0061 BTC (100,000 NGN)</p>
          </div>
          <div className="transdetails_item">
            <p className="title title-grey">Transaction Fees</p>
            <p className="title title-grey">0.00030 BTC (5,000 NGN)</p>
          </div>
          <div className="transdetails_item">
            <p className="title title-grey">Bank Account</p>
            <p className="title title-grey">01223445556</p>
          </div>
          <div className="transdetails_item">
            <p className="title title-grey">Account Name</p>
            <p className="title title-grey">John Doe</p>
          </div>
          <div className="transdetails_item">
            <p className="title title-grey">Bank Name</p>
            <p className="title title-grey">GT Bank</p>
          </div>
        </div>
      </div>
      <Button bg={"button_primary"} onclick={success}>
        Withdraw
      </Button>
    </div>
  );
};

export default Confirmation;
