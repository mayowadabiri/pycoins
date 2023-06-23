import useBankForm from "../../hooks/bankForm";
import { LeftArrow } from "../../icons";
import Button from "../UI/Button";
// import Primary from "../UI/Label";
import formGenerator from "../../utils/formGenerator";
import { addBankSettlement } from "../../services/settlement";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
const Bank = ({ goBack, edit, close, ...bank }) => {
  const [bankForm, setBankForm, formValid, setFormValid] = useBankForm(bank);

  const form = formGenerator(bankForm, setBankForm, setFormValid);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation((data) => addBankSettlement(data), {
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries("getsettlement");
      close();
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = {};
    for (let key in bankForm) data[key] = bankForm[key].value;
    data["type"] = "bank";

    mutate(data);
  };
  return (
    <div className="popupform">
      <div>
        {!edit && (
          <div className="popupform_back" onClick={goBack}>
            <LeftArrow fill={"#333333"} />
          </div>
        )}
        <h3 className="ta">Bank Account </h3>
      </div>
      <form className="mt-md" onSubmit={handleSubmit}>
        {form}
        {/* <Primary /> */}
        <Button
          type={"submit"}
          isLoading={isLoading}
          disabled={formValid}
          bg={"button_primary"}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default Bank;
