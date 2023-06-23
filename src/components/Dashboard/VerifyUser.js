import UserSwitch from "../../assets/user-switch.svg";
import { RightArrow } from "../../icons";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "./../../context/index";

const RegisterBusiness = ({ date, onclick }) => {
  const { profile } = useContext(AppContext);
  const [type, setType] = useState("");

  useEffect(() => {
    if (!profile?.user.isUserVerified) setType("Verify your Identity");
    else if (profile?.user.isUserVerified && !profile?.user.isBusinessVerified)
      setType("Verify your Business");
  }, []); // eslint-disable-line

  return (
    <div className="home_switch" onClick={onclick}>
      <img src={UserSwitch} alt="user switch" />
      <div>
        <p className="title title-small">{type}</p>
        <p className="title title-grey" style={{ fontSize: "14px" }}>
          Get Started <RightArrow fill="#787676" />{" "}
        </p>
      </div>
    </div>
  );
};
export default RegisterBusiness;
