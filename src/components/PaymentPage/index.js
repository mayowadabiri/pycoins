import WithLoadingComponent from "./../../hoc/withLoading";

import Pay from "./Pay";
import Modal from "./../UI/Modal";
import Success from "./Response";
import Accounts from "./../Account";

const PaymentProcess = ({
  close,
  cryptos,
  handlePayment,
  processPageData,
  setEvent,
  isLoading,
  isError,
  event,
  amount,
  usd,
}) => {
  const handleClose = () => {
    close(false);
    setEvent("");
    window.location.reload();
  };

  const handleIncompletePayment = () => {
    setEvent("Awaiting Payment");
  };

  return (
    <Modal
      close={
        event === "Payment Incompleted" ? handleIncompletePayment : handleClose
      }
    >
      <WithLoadingComponent isLoading={isLoading}>
        {event === "" && (
          <Accounts
            cryptos={cryptos}
            header="Select Payment Method"
            title="PAY WITH"
            name={event}
            showForm={handlePayment}
          />
        )}
        {(event === "Awaiting Payment" || event === "Payment Seen") && (
          <Pay
            amount={amount}
            usd={usd}
            event={event}
            data={processPageData}
            goBack={() => setEvent("")}
          />
        )}
      </WithLoadingComponent>
      {(event === "Payment Completed" || event === "Payment Incompleted") && (
        <Success event={event} />
      )}
    </Modal>
  );
};

export default PaymentProcess;
