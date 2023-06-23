import { Copy, Delete, Disable } from "../../icons";

import actionBtn from "../../assets/More.svg";

import handleCopy from "../../utils/copyToClipboard";

const PaymentHeader = ({
  ctas,
  click,
  Btns,
  link,
  handleDelete,
  handleDisable,
  handleEdit,
  handleEnable,
}) => {
  return (
    <div className="paymentdetails_header">
      <div className="paymentdetails_status">
        <h3 className="title title-black">{link?.pageName}</h3>
        {link?.isDisabled && <span>Disabled</span>}
      </div>
      <div
        className={`paymentdetails_ctas ${
          ctas && "paymentdetails_ctas-reveal"
        }`}
      >
        <button onClick={() => handleCopy(link?.paymenturl)}>
          <Copy fill="#787676" />
          <p className="title title-grey">Copy Link</p>
        </button>
        {/* <button
          type="submit"
          role="button"
          aria-label="edit-button"
          onClick={handleEdit}
        >
          <Edit fill="#787676" />
          <p className="title title-grey">Edit</p>
        </button> */}
        <button
          type="submit"
          aria-label="disable-button"
          onClick={link?.isDisabled ? handleEnable : handleDisable}
        >
          <Disable />
          <p className="title title-grey">
            {link?.isDisabled ? "Enable" : "Disable"}
          </p>
        </button>
        <button type="submit" aria-label="delete-button" onClick={handleDelete}>
          <Delete />
          <p className="delete">Delete</p>
        </button>
      </div>
      <div onClick={click} className="paymentdetails_actions">
        <img src={actionBtn} alt="Click to copy, edit or delete link" />
      </div>
    </div>
  );
};

export default PaymentHeader;
