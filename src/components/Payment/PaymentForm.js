import { useState, useEffect, useMemo, memo } from "react";
import { useMutation, useQueryClient } from "react-query";

import Created from "./Created";

import useAmount from "../../hooks/formattedForm";
import usePaymentForm from "../../hooks/paymentForm";

import Modal from "../UI/Modal";
import Label from "../UI/Label";
import Button from "../UI/Button";

import formGenerator from "../../utils/formGenerator";
import { addPaymentUrl } from "./../../utils/addPaymentUrl";
import { createPaymentLink } from "../../services/userPaymentLink";

import { useGetUserWallets } from "./../../query/getCryptos";
import { extractNumber } from "../../utils/numberWithComma";

const PaymentForm = ({
  show,
  isEditMode,
  amountType,
  handleSubmit,
  setShow,
}) => {
  const [isFixed, setIsFixed] = useState("");
  const [updatedData, setUpdatedData] = useState();
  const [name, setName] = useState("");

  const { data: userData } = useGetUserWallets();

  const queryClient = useQueryClient();

  const [amountForm, setAmountForm] = useAmount("Enter your amount (USD)");

  const userAcceptedWallet = useMemo(() => {
    return userData;
  }, [userData]);

  const [paymentForm, setPaymentForm, paymentFormValid, setPaymentFormValid] =
    usePaymentForm(userAcceptedWallet);

  const { mutate, isLoading, data } = useMutation(
    (data) => createPaymentLink(data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getpaymentlinks");
        setName("success");
      },
    }
  );

  const form = formGenerator(paymentForm, setPaymentForm);

  const amount = formGenerator(amountForm, setAmountForm);

  useEffect(() => {
    if (amountType === "fixed") setIsFixed("fixed");
    else if (amountType === "custom") setIsFixed("custom");
    else setIsFixed("");
  }, [amountType]);

  useEffect(() => {
    let isValid = true;

    for (let id in paymentForm) {
      isValid = paymentForm[id].valid && isValid;
    }
    if (isFixed === "custom" && isValid) {
      setPaymentFormValid(true);
    } else {
      setPaymentFormValid(false);
    }
    if (isFixed === "fixed") setPaymentFormValid(false);

    let isAmountValid = true;

    isAmountValid = amountForm.amount.valid && isAmountValid;

    if (isValid && isAmountValid && isFixed === "fixed") {
      setPaymentFormValid(true);
    }
  }, [isFixed, paymentForm, amountForm]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      const updatedData = addPaymentUrl(data?.paymentlink);

      setUpdatedData(updatedData);
    }
  }, [data]);

  const handleChange = (evt) => {
    if (evt.target.value === "fixed") {
      setIsFixed("fixed");
    } else setIsFixed("custom");
  };

  const handleSubmitHandler = (evt) => {
    evt.preventDefault();
    const data = {};
    for (let key in paymentForm) data[key] = paymentForm[key].value;
    data["isAmountFixed"] = isFixed === "fixed" ? true : false;
    data["amount"] =
      isFixed === "fixed" ? +extractNumber(amountForm.amount.value) : 0;

    mutate(data);
  };

  const handleClose = () => {
    setShow(!show);
  };

  return (
    <Modal show={show} close={handleClose}>
      {name === "" && (
        <>
          <h3 className="title title-black">Payment Page</h3>
          <form className="mt-small" onSubmit={handleSubmitHandler}>
            {form}
            <div className="payment_amount mb-small">
              <Label
                id={"fixed"}
                title="Fixed Amount"
                name={"amount"}
                type="radio"
                onchange={handleChange}
                // checked={amountType === "fixed" && true}
              />
              <Label
                id={"custom"}
                title="Custom Amount"
                name={"amount"}
                type="radio"
                onchange={handleChange}
              />
            </div>
            {isFixed === "fixed" && amount}
            <Button
              isLoading={isLoading}
              type="submit"
              disabled={paymentFormValid}
              bg={"button_primary"}
            >
              {isEditMode ? `Update Page` : "Create Page"}
            </Button>
          </form>
        </>
      )}
      {name === "success" && <Created data={updatedData} />}
    </Modal>
  );
};

export default memo(PaymentForm, (prevProps, nextProps) => {
  return prevProps.show !== nextProps.show;
});
