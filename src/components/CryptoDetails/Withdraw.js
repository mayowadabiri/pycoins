import { useState, useContext, useMemo } from "react";

import Accounts from "../Account";
import Confirmation from "./Confirmation";
import OtpForm from "./Otp";

import WithdrawForm from "./WithdrawForm";
import Modal from "../UI/Modal";
import Response from "../UI/Response";

import Success from "../../assets/success.svg";

import { cryptos } from "../../constants";
import useWithdrawForm from "./../../hooks/withdrawalForm";
import useFormattedWithdraw from "../../hooks/formattedForm";
import { useMutation, useQueryClient } from "react-query";
import { initiateWithdrawal, processWithdrawal } from "../../services/withdraw";
import useOtp from "./../../hooks/otpForm";
import { toast } from "react-toastify";
import { AppContext } from "./../../context/index";
import { extractNumber } from "../../utils/numberWithComma";

import { useGetNgnRate } from "../../query/getNgnRate";
const WithDraw = ({ currency, close, show, selectedCrypto, balance }) => {
  const { settlements, environment } = useContext(AppContext);

  console.log(settlements);

  const isBankAdded = useMemo(() => {
    return settlements.find((item) => item.key === "bank");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const crypto = useMemo(() => {
    return cryptos.filter((item) => item.slug === currency);
  }, []); // eslint-disable-line

  const { data: rateData } = useGetNgnRate(environment);

  const selectedSettlement = useMemo(() => {
    return settlements.find((item) => item.wallet_slug === currency);
  }, [settlements, currency]);

  const [withdrawForm, setWithdrawForm, formValid, setFormValid] =
    useWithdrawForm(selectedSettlement);

  const [
    formattedWithdrawalForm,
    setFormattedWithdrawalForm,
    formIsValid,
    setFormIsValid,
  ] = useFormattedWithdraw(" Amount (Naira)");
  const [otpForm, setOtpForm, isValidForm, setIsValidForm] = useOtp();

  const [name, setName] = useState("");

  const { mutate: initiateWithdrawalMutate, isLoading: isInitiateLoading } =
    useMutation((data) => initiateWithdrawal(data), {
      onSuccess: () => {
        toast.success("An Otp has been sent to your email address");
        setName("otp");
      },
    });

  const queryClient = useQueryClient();

  const { mutate: processWithdrawalMutate, isLoading: isProcessLoading } =
    useMutation((data) => processWithdrawal(data), {
      onSuccess: () => {
        setName("success");
        queryClient.invalidateQueries("getwallettransactions");
      },
    });

  // useEffect(() => {
  //   const data = axios.get(`http://api.exchangeratesapi.io/v1/`);
  // }, []);
  const handleChange = (name) => {
    setName(name);
  };

  const handleInitiateWithdrawal = async (evt, amount, rates) => {
    evt.preventDefault();
    let data = {};

    if (name === "bank") {
      data["type"] = "fiat";
      data["amount"] = parseFloat(amount).toFixed(6);
      data["fiat_amount"] = extractNumber(formattedWithdrawalForm.amount.value);
      data["wallet"] = selectedCrypto.slug;
      data["walletName"] = selectedCrypto.symbol;
      data["amount_in_usd"] =
        extractNumber(formattedWithdrawalForm.amount.value) / rateData;
    } else {
      data = {
        type: "crypto",
        wallet: selectedSettlement.wallet_slug,
        walletName: selectedSettlement.key,
        address: selectedSettlement.wallet_address,
      };
      for (const key in withdrawForm) data[key] = withdrawForm[key].value;
    }
    initiateWithdrawalMutate(data);
  };

  const handleProcessWithdrawal = (evt) => {
    evt.preventDefault();
    const data = {
      otp: otpForm.otp.value,
    };
    processWithdrawalMutate(data);
  };

  const handleSuccess = (evt) => {
    evt.preventDefault();
    setName("success");
  };

  let renderElement;
  switch (name) {
    case "":
      renderElement = (
        <>
          <Accounts
            header="Settlement Account"
            title="SELECT YOUR SETTLEMENT METHOD "
            cryptos={selectedSettlement ? crypto : null}
            name={name}
            showForm={handleChange}
            isBankAdded={!isBankAdded}
          />
        </>
      );
      break;
    case "bank":
      renderElement = (
        <>
          <WithdrawForm
            goBack={() => setName("")}
            name=""
            withdraw={handleInitiateWithdrawal}
            withdrawForm={formattedWithdrawalForm}
            setForm={setFormattedWithdrawalForm}
            validForm={formIsValid}
            setValidForm={setFormIsValid}
            isLoading={isInitiateLoading}
            crypto={selectedCrypto}
            isBank={true}
            balance={balance}
            rate={rateData}
          />
        </>
      );
      break;
    case currency:
      renderElement = (
        <>
          <WithdrawForm
            goBack={() => setName("")}
            name=""
            withdraw={handleInitiateWithdrawal}
            withdrawForm={withdrawForm}
            setForm={setWithdrawForm}
            validForm={formValid}
            setValidForm={setFormValid}
            crypto={selectedCrypto}
            isLoading={isInitiateLoading}
            isBank={false}
            balance={balance}
            rate={rateData}
          />
        </>
      );
      break;
    case "otp":
      renderElement = (
        <>
          <OtpForm
            goBack={() => setName("")}
            name=""
            verifyOtp={handleProcessWithdrawal}
            otpForm={otpForm}
            setForm={setOtpForm}
            validForm={isValidForm}
            setValidForm={setIsValidForm}
            isLoading={isProcessLoading}
          />
        </>
      );
      break;
    case "withdraw":
      renderElement = (
        <>
          <Confirmation
            goBack={() => setName("bank")}
            success={handleSuccess}
          />
        </>
      );
      break;
    case "success":
      renderElement = (
        <>
          <Response
            img={Success}
            title="Withdrawal Submitted"
            text="Your withdrawal has been submitted and is being processed"
          />
        </>
      );
      break;
    default:
      return null;
  }

  return (
    <Modal show={show} close={close}>
      {renderElement}
    </Modal>
  );
};

export default WithDraw;
