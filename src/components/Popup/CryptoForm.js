import { LeftArrow } from "../../icons";
// import Primary from "../UI/Label";
import Button from "../UI/Button";
import useCryptoForm from "../../hooks/cryptoForm";
import formGenerator from "../../utils/formGenerator";
import { cryptos } from "../../constants/index";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addCryptoSettlement } from "../../services/settlement";
import { toast } from "react-toastify";

const CryptoForm = ({ name, goBack, edit, address, close }) => {
  const crypto = useMemo(() => {
    return cryptos.find((item) => item.slug === name);
  }, [name]);
  const [cryptoForm, setCryptoForm, isValidForm, setValid] =
    useCryptoForm(address);
  const form = formGenerator(cryptoForm, setCryptoForm, setValid);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    "updatesettlemet",
    (data) => addCryptoSettlement(data),
    {
      onSuccess: (message) => {
        toast.success(message);
        queryClient.invalidateQueries("getsettlement");
        close();
      },
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      type: "crypto",
      wallet_slug: crypto.slug,
      wallet_address: cryptoForm.address.value,
      wallet_symbol: crypto.symbol,
    };

    mutate(data);
  };

  return (
    <div className="popupform">
      {!edit && (
        <div className="popupform_back " onClick={goBack}>
          <LeftArrow fill={"#333333"} />
        </div>
      )}
      <h3 className="ta title title-black"> {crypto.name}</h3>
      <form className="mt-md" onSubmit={handleSubmit}>
        {form}
        {/* <Primary
          title={"Make this my primary settlement account"}
          name={"primary"}
          id={"pimary"}
          type="checkbox"
        /> */}
        <Button
          isLoading={isLoading}
          disabled={isValidForm}
          bg={"button_primary"}
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default CryptoForm;
