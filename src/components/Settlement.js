import Button from "./UI/Button";
import Plus from "../assets/plus.svg";
import { House } from "../icons";
const Settlement = ({handlechange}) => {
  return (
    <div className="settlement">
      <House width={"50"} height={"51"} fill="#48D189" />
      <h3 className="title title-black ta mb-small mt-small">
        Add a settlement method to receive your payouts
      </h3>
      <p className="title title-grey ta mb-small">
        Click on the button below to add new settlement method to your account.
      </p>
      <Button bg={"button_primary"} onclick={handlechange}>
        <img src={Plus} alt="Add" className="" />
        <span>Add Settlement Account</span>
      </Button>
    </div>
  );
};

export default Settlement;
