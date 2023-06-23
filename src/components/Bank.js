import useBankForm from "../hooks/bankForm";
import Input from "./UI/Input";
import { LeftArrow } from "../icons";
import Button from "./UI/Button";
import Primary from "./UI/Primary";
const Bank = ({ goBack }) => {
  const [bankForm] = useBankForm();

  const formArr = [];
  for (let key in bankForm) {
    formArr.push({
      key,
      config: bankForm[key],
    });
  }

  const form = formArr.map(({ key, config }) => (
    <Input
      key={key}
      value={config.value}
      elementType={config.elementType}
      valid={config.valid}
      options={config.options}
      placeholder={config.placeholder}
    />
  ));

  return (
    <div className="popupform">
      <div>
        <div className="popupform_back" onClick={goBack}>
          <LeftArrow fill={"#333333"} />
        </div>
        <h3 className="ta">Bank Account </h3>
      </div>
      <form>
        {form}
        <Primary />
        <Button bg={"button_primary"}>Save</Button>
      </form>
    </div>
  );
};

export default Bank;
