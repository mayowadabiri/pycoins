import { useContext, useEffect, useState } from "react";

import User from "./User";

import VerifyUser from "./VerifyUser";

import { AppContext } from "./../../context/index";

const LandingHeader = ({ date, setShow }) => {
  const [show, setShowVerify] = useState(false);
  const {
    profile: { user, business },
  } = useContext(AppContext);

  useEffect(() => {
    if (!user?.isUserVerified || (business && !business.isBusinessVerified))
      setShowVerify(true);
    else setShowVerify(false);
  }, [user, business]);

  return (
    <div className="home_container">
      <div className="home_container-date">
        <User date={date} />
      </div>

      {show && (
        <div className="home_container-reg">
          <VerifyUser onclick={() => setShow(true)} />
        </div>
      )}
    </div>
  );
};

export default LandingHeader;
