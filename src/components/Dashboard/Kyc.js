import { useEffect, useState, useContext } from "react";
import Modal from "../UI/Modal";
import useSelectForm from "../../hooks/selectForm";
import useNinForm from "../../hooks/ninform";
import useDriverLicenseForm from "../../hooks/driverLicenseForm";
import useVotersForm from "../../hooks/votersForm";
import { useMutation, useQueryClient } from "react-query";
import formGenerator from "../../utils/formGenerator";
import Button from "./../UI/Button";
import { AppContext } from "./../../context/index";
import useCompanyForm from "../../hooks/companyForm";

import { verifyIdentity, verifyBusiness } from "../../services/kyc";

const Kyc = ({ close }) => {
  const {
    profile: { user, business },
  } = useContext(AppContext);
  const [selectForm, setSelectForm] = useSelectForm();
  const [ninForm] = useNinForm();
  const [driversLicenseForm] = useDriverLicenseForm();
  const [voterForm] = useVotersForm();
  const [companyForm, setCompanyForm] = useCompanyForm();
  const [selectedForm, setSelectedForm] = useState();
  const [validForm, setValidForm] = useState(false);
  const [type, setType] = useState("");
  const select = formGenerator(selectForm, setSelectForm);

  const queryClient = useQueryClient();

  const form = formGenerator(selectedForm, setSelectedForm, setValidForm);
  const company = formGenerator(companyForm, setCompanyForm, setValidForm);

  useEffect(() => {
    if (selectForm.select.value === "nin") {
      setSelectedForm(ninForm);
      setType("NIN");
    } else if (selectForm.select.value === "driversLicense") {
      setSelectedForm(driversLicenseForm);
      setType("DRIVERS_LICENSE");
    } else if (selectForm.select.value === "voter") {
      setType("VOTERS_CARD");
      setSelectedForm(voterForm);
    }
    setValidForm(false);
  }, [selectForm]); // eslint-disable-line

  const { mutate, isLoading } = useMutation(
    "verifyuser",
    (details) => verifyIdentity(details, type),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getuserprofile", 1]);
        close();
      },
    }
  );
  const { mutate: companyMutate, isLoading: isCoyLoading } = useMutation(
    "verifyuser",
    (details) => verifyBusiness(details, type),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getuserprofile", 1]);
        close();
      },
    }
  );

  const handleUserSubmit = (evt) => {
    evt.preventDefault();
    const data = {};

    for (let key in selectedForm) {
      data[key] = selectedForm[key].value;
    }
    mutate(data);
  };

  const handleCoySubmit = (evt) => {
    evt.preventDefault();
    const data = {};

    for (let key in companyForm) {
      data[key] = companyForm[key].value;
    }
    companyMutate(data);
  };

  return (
    <Modal close={close}>
      <div className="kyc">
        <h3 className="title title-black">Verify Your Identity</h3>
        <form
          className="mt-small"
          onSubmit={form.length > 0 ? handleUserSubmit : handleCoySubmit}
        >
          {!user?.isUserVerified && (
            <>
              {select}
              {form}
            </>
          )}
          {user?.isUserVerified &&
            business &&
            !business.isBusinessVerified &&
            company}
          <Button
            // onclick={handleUserSubmit}
            disabled={validForm}
            isLoading={isLoading || isCoyLoading}
            bg="button_primary"
            type="submit"
          >
            Verify
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default Kyc;
