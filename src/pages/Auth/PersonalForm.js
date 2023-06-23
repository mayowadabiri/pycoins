import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useMutation } from "react-query";

import withRegistrationType from "../../hoc/withRegisterType";

import VerifyMsg from "./Verify";

import PersonalInfo from "../../components/Auth/Personal";
import PersonalIndicator from "./../../components/UI/PersonalIndicator";

import usePersonalForm from "../../hooks/personalForm";

import { registerUser } from "./../../services/auth";

const PersonalForm = ({ history }) => {
  const [indicate, setIndicate] = useState(false);

  const [personalForm, setPersonalForm, formValid, setFormValid] =
    usePersonalForm();

  const { mutate, isLoading, data, isSuccess } = useMutation((data) =>
    registerUser(data)
  );

  useEffect(() => {
    if (isSuccess && data && data.status === "success") setIndicate(true);
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    for (let key in personalForm) {
      if (key === "phoneNumber")
        data.append(key, `+${personalForm[key].value}`);
      else data.append(key, personalForm[key].value);
    }

    data.append(`userType`, "individual");

    mutate(data);
  };
  return (
    <div className="personal">
      <Helmet>
        <title>Personal - Payercoins</title>
      </Helmet>
      <PersonalIndicator indicate={indicate} />
      <div className="auth_form">
        <div className="auth_form-container">
          {indicate ? (
            <VerifyMsg />
          ) : (
            <PersonalInfo
              personalform={personalForm}
              personalFormUpdate={setPersonalForm}
              formSubmit={handleSubmit}
              formValid={formValid}
              formValidFunc={setFormValid}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRegistrationType(PersonalForm);
