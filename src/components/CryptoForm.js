// import Input from "./UI/Input";
import { LeftArrow } from "../icons";
// import Primary from "./UI/Primary";
import Button from "./UI/Button";
import useCryptoForm from "../hooks/cryptoForm";
import formGenerator from "./../utils/formGenerator";

const CryptoForm = ({ name, goBack }) => {
  const [cryptoForm, setCryptoForm, isValidForm, setValid] = useCryptoForm();

  const form = formGenerator(cryptoForm, setCryptoForm, setValid);

  return (
    <div className="popupform">
      <div className="popupform_back" onClick={goBack}>
        <LeftArrow fill={"#333333"} />
      </div>
      <h3 className="ta title title-black"> {name}</h3>
      <form>
        {form}
        {/* <Primary /> */}
        <Button disabled={isValidForm} bg={"button_primary"}>
          Saveewwejhweh
        </Button>
      </form>
    </div>
  );
};

export default CryptoForm;
