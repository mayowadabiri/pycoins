import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import WithSmallLoader from "./../../hoc/withLoadingIndicator";

import { AppContext } from "./../../context/index";

import Button from "./../UI/Button";

import useGeneralForm from "../../hooks/generalForm";

import settingsFormGenerator from "./../../utils/settingsFormGenerator";

import {
  changeUserImage,
  updateUserProfile,
  updateBusinessprofile,
  updatePassword,
  switchToBusiness,
} from "./../../services/user";
import { saveToLocalStorage } from "./../../services/auth";

import Avatar from "../../assets/avatar.svg";
import BusinessForm from "../BusinessForm";
import RegisterBusiness from "./RegisterBusiness";

const General = ({ history }) => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const { saveUser, profile } = useContext(AppContext);

  const [
    personalForm,
    setPersonalForm,
    businessForm,
    setBusinessForm,
    personalFormValid,
    setPersonalFormValid,
    businessFormValid,
    setBusinessFormValid,
    changePasswordForm,
    setChangePasswordForm,
    changePasswordValid,
    setChangePasswordValid,
  ] = useGeneralForm(profile);

  const personal = settingsFormGenerator(
    personalForm,
    setPersonalForm,
    setPersonalFormValid
  );

  const business = settingsFormGenerator(
    businessForm,
    setBusinessForm,
    setBusinessFormValid
  );

  const changePassword = settingsFormGenerator(
    changePasswordForm,
    setChangePasswordForm,
    setChangePasswordValid
  );

  const { mutate, isLoading } = useMutation((img) => changeUserImage(img), {
    mutationKey: "change image",
    onSuccess: (data) => saveUser(data.data),
    onSettled: () => setImage(null),
  });

  const { mutate: updateUserMutation, isLoading: updateUserLoading } =
    useMutation((data) => updateUserProfile(data), {
      onSuccess: (data) => saveUser(data.data),
    });

  const { mutate: upateBusinessMutation, isLoading: updateBusinessLoading } =
    useMutation((data) => updateBusinessprofile(data), {
      onSuccess: (data) => saveUser(data.data),
    });

  const { mutate: updatePasswordMutation, isLoading: updatePasswordLooading } =
    useMutation((data) => updatePassword(data), {
      mutationKey: "change-password",
      onSuccess: (data) => saveToLocalStorage(data.token),
    });

  const {
    mutate: switchMutate,
    data,
    isLoading: switchLoading,
    isSuccess,
  } = useMutation(
    (param) => switchToBusiness(param),

    {
      mutationKey: "switchToBusiness",
      onSuccess: () => {
        queryClient.invalidateQueries(["getuserprofile", 1]);
      },
    }
  );
  const handleChange = (evt) => {
    const param = new FormData();
    const value = evt.target.files[0];
    setImage(value);
    param.append("profileImage", value);
    mutate(param);
  };

  const handleUpdateUser = (evt) => {
    evt.preventDefault();
    let data = {};
    for (let key in personalForm) {
      if (personalForm[key].initialValue !== personalForm[key].value) {
        data[key] = personalForm[key].value;
      }
    }
    if (Object.values(data).length < 1)
      toast.info("Change any field to update your profile");
    else updateUserMutation(data);
  };

  const handleUpdateBusiness = (evt) => {
    evt.preventDefault();
    let data = {};
    for (let key in businessForm) {
      if (businessForm[key].initialValue !== businessForm[key].value) {
        data[key] = businessForm[key].value;
      }
    }
    if (Object.values(data).length < 1)
      toast.info("Change any field to update your profile");
    else {
      data["businessId"] = profile?.business?._id;
      upateBusinessMutation(data);
    }
  };

  const handleUpdatePassword = (evt) => {
    evt.preventDefault();
    const data = {};
    data["currentPassword"] = changePasswordForm["currentPassword"].value;
    data["newPassword"] = changePasswordForm["password"].value;
    updatePasswordMutation(data);
  };

  const handleSwitchBusiness = (evt, data) => {
    evt.preventDefault();
    switchMutate(data);
  };

  return (
    <div className="general">
      <h3 className="title title-black">Personal Information </h3>
      <form className="mt-small mb-small">
        <p className="title title-grey">Photo</p>
        <input
          accept=".jpg, .jpeg, .png"
          type="file"
          accepts="image/*"
          id="photo"
          hidden
          onChange={handleChange}
        />
        <WithSmallLoader isLoading={isLoading}>
          <div className="general_pic">
            <img
              src={
                profile?.user?.profileImage
                  ? profile?.user.profileImage
                  : Avatar
              }
              alt="avatar"
            />
            <label htmlFor="photo" className="general_upload">
              Change
            </label>
          </div>
        </WithSmallLoader>
        <p className="title title-grey mt-small">{image?.name}</p>
      </form>
      <form className="mt-small settingsform" onSubmit={handleUpdateUser}>
        {personal}
        {!profile?.user?.isUserVerified && (
          <Button
            disabled={personalFormValid}
            isLoading={updateUserLoading}
            type="submit"
            bg={"button_primary"}
          >
            Save Changes
          </Button>
        )}
      </form>
      <div className="mt-bg">
        <h3 className="title title-black mt-small">Change Password</h3>
        <form className="mt-small settingsform" onSubmit={handleUpdatePassword}>
          {changePassword}
          <Button
            disabled={changePasswordValid}
            isLoading={updatePasswordLooading}
            type="submit"
            bg={"button_primary"}
          >
            Save Changes
          </Button>
        </form>
      </div>
      {profile.user?.userType === "business" && (
        <div className="mt-bg">
          <h3 className="title title-black mt-small">Business Information</h3>
          <form
            className="mt-small settingsform"
            onSubmit={handleUpdateBusiness}
          >
            {business}
            {!profile?.business?.isBusinessVerified && (
              <Button
                disabled={businessFormValid}
                type="submit"
                bg={"button_primary"}
                isLoading={updateBusinessLoading}
              >
                Save Changes
              </Button>
            )}
          </form>
        </div>
      )}
      {profile.user?.userType === "individual" && (
        // <div className="home_switch mt-bg" onClick={}>
        //   <img src={userSwitch} alt="user switch" />
        //   <div>
        //     <p className="title title-small">Switch to Registered Business</p>
        //     <p className="title title-grey" style={{ fontSize: "14px" }}>
        //       Get Started <RightArrow fill="#787676" />{" "}
        //     </p>
        //   </div>
        // </div>
        <RegisterBusiness onclick={() => setShow(true)} />
      )}

      {show && (
        <BusinessForm
          close={() => setShow(false)}
          isLoading={switchLoading}
          data={data}
          show={show}
          submit={handleSwitchBusiness}
          success={isSuccess}
        />
      )}
    </div>
  );
};

export default withRouter(General);
