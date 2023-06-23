import { RightArrow } from "../../icons";

// import UserSwitch from "../../assets/user-switch.svg";
import userSwitch from "../../assets/switch.svg";

const RegisterBusiness = ({ onclick }) => {
  return (
    <div className="home_switch mt-bg" onClick={onclick}>
      <img src={userSwitch} alt="user switch" />
      <div>
        <p className="title title-small">Switch to Registered Business</p>
        <p className="title title-grey" style={{ fontSize: "14px" }}>
          Get Started <RightArrow fill="#787676" />{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterBusiness;
