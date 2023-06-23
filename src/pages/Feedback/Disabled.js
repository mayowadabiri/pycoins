import Feedback from "../../components/Feedback";

import disbaled from "../../assets/disabled.svg";

const Disabled = () => {
  return (
    <Feedback>
      <img src={disbaled} alt="page not found" />
      <h5 className="mb-small errortitle">Payment page is unavailable</h5>
      <p className="title title-grey mb-small ">
        This payment page has been deactivated by the merchant.{" "}
      </p>
      <a
        // type="button"
        href="https://payercoins.com"
        className="button button_primary"
      >
        Go Back Home
      </a>
    </Feedback>
  );
};

export default Disabled;
