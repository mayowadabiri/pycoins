// import { cryptos } from "../../constants";
import Accounts from "../Account";

const Select = ({ name, onclick, cryptos }) => {
  return (
    <Accounts
      cryptos={cryptos}
      header="Select Payment Method"
      title="PAY WITH"
      name={name}
      showForm={onclick}
    />
  );
};

export default Select;
