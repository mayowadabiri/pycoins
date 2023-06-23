import { Arrow } from "../../icons";

const PaymentTableResponsive = ({ data, gotoDetails }) => {
  return (
    <div className="paymenttableresponsive">
      {data?.map((item) => (
        <div
          className="paymenttableresponsive_item"
          onClick={() => gotoDetails(item.paymentSlug, item._id)}
        >
          <div>
            <p className="td mb-smaller">{item.pageName}</p>
            <p className="td">${parseFloat(item.amount).toFixed(6)}</p>
          </div>
          <div>
            <Arrow />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentTableResponsive;
