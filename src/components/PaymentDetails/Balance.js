import Available from "../../assets/available.svg";
import Customer from "../../assets/customers.svg";

const Balance = ({ data, available, customers }) => {
  return (
    <div className="balance mt-small">
      <div className="balance_item">
        <img src={Available} alt="available balance" />
        <div className="balance_content">
          <p className="title title-grey mb-smaller">Total Amount Received</p>
          <p className="mute mb-smaller">
            {parseFloat(available).toFixed(6)} USD
          </p>
        </div>
      </div>
      <div className="balance_item">
        <img src={Customer} alt="available balance" />
        <div className="balance_content">
          <p className="title title-grey mb-smaller">Total Customers</p>
          <p className="mute">{customers || 0}</p>
        </div>
      </div>
      {/* <div className="balance_item">
        <img src={Ledger} alt="available balance" />
        <div className="balance_content">
          <p className="title title-grey mb-smaller">Number of Visitors</p>
          <p className="mute mb-smaller">0</p>
        </div>
      </div> */}
    </div>
  );
};
export default Balance;
