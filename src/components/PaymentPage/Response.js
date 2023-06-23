import Response from "./../UI/Response";

import success from "../../assets/success.svg";
import failed from "../../assets/failed.svg";

const Success = ({ event }) => (
  <Response
    img={event === "Payment Completed" ? success : failed}
    title={
      event === "Payment Completed" ? "Payment Completed" : "Payment Incomplete"
    }
    text={
      event === "Payment Completed"
        ? "Your payment  was completed."
        : "You made an incomplete Payment"
    }
  >
    {event !== "Payment Completed" && (
      <p className="title title-grey ta mb-small">
        Close the modal to complete payment
      </p>
    )}
  </Response>
);

export default Success;
