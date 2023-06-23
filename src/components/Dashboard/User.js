import { useContext, useState, useEffect } from "react";

import { AppContext } from "./../../context/index";

import verifiedImg from "../../assets/verified.svg";
import unverifiedImg from "../../assets/unverified.svg";

const User = ({ date }) => {
  const [verified, setVerified] = useState(false);
  const {
    fullname,
    profile: { user, business },
  } = useContext(AppContext);

  useEffect(() => {
    if (
      (user?.userType === "individual" && user?.isUserVerified) ||
      (user?.userType === "business" && business?.isBusinessVerified)
    )
      setVerified(true);
    else setVerified(false);
  }, [user, business]);
  return (
    <div className="home_name">
      <h3 className="title title-black mb-smaller">Hello, {fullname} 👋</h3>
      <p className="title title-grey mb-smaller" style={{ fontWeight: "600 " }}>
        {date}
      </p>
      <p className="title title-grey verified ">
        <span>{verified ? "Verified" : "Unverified"} Account</span>
        <img src={verified ? verifiedImg : unverifiedImg} alt="Verified" />
      </p>
    </div>
  );
};
export default User;
