import Button from "../UI/Button";

import formGenerator from "../../utils/formGenerator";

const Business = ({
  businessForm,
  handleSubmit,
  children,
  businessFormUpdate,
  businessFormValid,
  setBusinessFormVallid,
  isLoading,
}) => {
  const form = formGenerator(
    businessForm,
    businessFormUpdate,
    setBusinessFormVallid
  );
  return (
    <>
      <h3 className="title title-black ta">Business Information</h3>
      <form className="mt-small" onSubmit={handleSubmit}>
        {form}

        <Button
          disabled={businessFormValid}
          isLoading={isLoading}
          bg={"button_primary"}
          type={"submit"}
        >
          Continue
        </Button>
      </form>
      {children && children}
    </>
  );
};

export default Business;
