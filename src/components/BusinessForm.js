import Modal from "./UI/Modal";

import Business from "./Auth/Business";

import useBusinessForm from "../hooks/businessForm";

import Response from "./UI/Response";

import Success from "../assets/success.svg";

const BusinessForm = ({ close, isLoading, data, show, submit, success }) => {
  const [
    businessForm,
    setBusinessForm,
    businessFormValid,
    setBusinessFormVallid,
  ] = useBusinessForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const params = new FormData();
    for (let key in businessForm)
      params.append(`${key}`, businessForm[key].value);
    params.append("country", "Nigeria");
    submit(evt, params);
  };

  return (
    <Modal close={close}>
      <div className="home_businessForm">
        {!success && (
          <Business
            businessForm={businessForm}
            handleSubmit={handleSubmit}
            businessFormUpdate={setBusinessForm}
            businessFormValid={businessFormValid}
            isLoading={isLoading}
            setBusinessFormVallid={setBusinessFormVallid}
          />
        )}
        {success && (
          <Response
            img={Success}
            title="Verification Submitted"
            text="Your business document has been submitted successfully and in
        currently in progress. You wil receive an email after being verified
        by the team."
          />
        )}
      </div>
    </Modal>
  );
};

export default BusinessForm;
