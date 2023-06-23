import Button from "../UI/Button";
import AuthFooter from "./AuthFooter";
import formGenerator from "./../../utils/formGenerator";

const PersonalInfo = ({
  personalform,
  formSubmit,
  personalFormUpdate,
  formValid,
  formValidFunc,
  isLoading,
}) => {
  const form = formGenerator(personalform, personalFormUpdate, formValidFunc);

  return (
    <>
      <h3 className="title title-black ta">Personal Information</h3>
      <form onSubmit={formSubmit} className="form mt-small">
        {form}
        <Button
          isLoading={isLoading}
          disabled={formValid}
          bg={"button_primary"}
          type="submit"
        >
          Create Account
        </Button>
      </form>
      <AuthFooter
        title={"Already have an account?"}
        linkTitle={"Login"}
        link={"/auth/login"}
      />
    </>
  );
};

export default PersonalInfo;
