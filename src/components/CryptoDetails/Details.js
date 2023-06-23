import Button from "../UI/Button";

import Plus from "../../assets/plus.svg";

import { RightArrow } from "../../icons/index";
import { useContext } from "react";
import { AppContext } from "./../../context/index";
import { useHistory } from "react-router-dom";
const Details = ({ crypto, setFund, setWithdraw, balance }) => {
  const { settlements } = useContext(AppContext);

  const history = useHistory();

  const handleWithdraw = () => {
    if (settlements.length < 1) {
      history.push({
        pathname: "/settings/settlements",
      });
    } else {
      setWithdraw(true);
    }
  };
  return (
    <>
      <div className="cryptodetails_name">
        <div type={crypto?.name} className={"crypto_img"}>
          <img src={crypto?.img} alt={crypto?.name} />
        </div>
        <p className="title title-grey">{crypto?.name}</p>
      </div>
      <p className="title title-grey mt-small">TOTAL BALANCE</p>
      {balance && (
        <p className="title title-grey mt-small">
          {parseFloat(balance).toFixed(6)} {crypto?.rate}
        </p>
      )}
      <div className="cryptodetails_btns">
        <Button
          disabled={true}
          bg={"button_primary"}
          onclick={() => setFund(true)}
        >
          <img src={Plus} alt="Add" className="" />
          <span>Fund</span>
        </Button>
        <Button disabled={true} bg={"button_white"} onclick={handleWithdraw}>
          <RightArrow fill="#48d189" />
          <span> Withdraw</span>
        </Button>
      </div>
    </>
  );
};
export default Details;
