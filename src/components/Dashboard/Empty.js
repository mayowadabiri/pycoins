import Empty from "./../UI/Empty";

import empty from "../../assets/empty.svg";

const LandingEmpty = () => {
  return (
    <Empty>
      <img src={empty} alt="Empty State" />
      <h3 className="title title-black mb-small mt-small ta ">
        Your transaction history is currently empty!
      </h3>
      <p className="title title-grey ">
        Once you start receiving payments, the transaction details will appear
        here.
      </p>
    </Empty>
  );
};

export default LandingEmpty;
