import { useState, useMemo, useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";

import Disabled from "../Feedback/Disabled";

import { extractNumber } from "../../utils/numberWithComma";

import WithErrorComponent from "./../../hoc/withError";
import WithLoadingComponent from "./../../hoc/withLoading";

import Background from "./../../components/UI/Background";
import PaymentProcess from "../../components/PaymentPage";
import Button from "./../../components/UI/Button";
import Warning from "../../components/PaymentPage/Warning";

import { useGetPaymentInfo } from "./../../query/getPaymentInfo";
import { useGetRates } from "./../../query/getRates";

import formGenerator from "../../utils/formGenerator";
import pusher from "./../../utils/pusher";
import { addClassName } from "./../../utils/addClassName";

import usePaymentForm from "../../hooks/paymentPageForm";

import { useGetCrypto } from "./../../query/getCryptos";

import { processPaymentLink } from "../../services/userPaymentLink";

import Logo from "../../assets/Logo.svg";

const PaymentPage = ({ history }) => {
  const [processError, setProcessError] = useState();

  const [disabled, setDisabled] = useState(false);
  const [event, setEvent] = useState("");

  const { params } = useRouteMatch();

  const { data, isLoading, error } = useGetPaymentInfo(params.slug);
  const { data: rates } = useGetRates();

  const [show, setShow] = useState(false);

  const [amount, setAmount] = useState(0);
  const [usd, setUsd] = useState(0);
  useEffect(() => {
    function askNotificationPermission() {
      function handlePermission(permission) {
        if (
          Notification.permission === "denied" ||
          Notification.permission === "default"
        ) {
          console.log("Please allow notifications to continue");
        } else {
          console.log("Notifications are now enabled");
        }
      }

      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        toast.error("This browser does not support notifications.");
      } else {
        if (checkNotificationPromise()) {
          Notification.requestPermission().then((permission) => {
            handlePermission(permission);
          });
        } else {
          Notification.requestPermission(function (permission) {
            handlePermission(permission);
          });
        }
      }
    }
    function checkNotificationPromise() {
      try {
        Notification.requestPermission().then();
      } catch (e) {
        return false;
      }

      return true;
    }
    askNotificationPermission();
  }, []);

  useEffect(() => {
    if (error?.message === "Payment Link not found")
      history.push("/pageNotFound");
    if (error?.message === "Payment Link has been disabled") setDisabled(true);
    if (error?.message === "Error processing payment page")
      setProcessError(true);
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  const [paymentPageForm, setPaymentPageForm, formValid, setFormValid] =
    usePaymentForm(data?.paymentPage);

  const { data: cryptoData } = useGetCrypto();

  const form = formGenerator(paymentPageForm, setPaymentPageForm, setFormValid);

  const userCryptos = useMemo(() => {
    const environment = data?.paymentlink.environment;
    const availableCrypto = data?.paymentPage.availableCrypto;

    const filteredCrypto =
      cryptoData &&
      cryptoData[environment]?.filter((item) => {
        return availableCrypto?.includes(item.slug);
      });

    if (filteredCrypto?.length > 0) {
      const addedCrypto = addClassName(filteredCrypto);
      return addedCrypto;
    }
  }, [data, cryptoData]);

  const addedRates = useMemo(() => {
    const joinedArr = [];

    if (userCryptos) {
      for (let item of userCryptos) {
        for (let key in rates) {
          if (item.rate === key) {
            joinedArr.push({
              ...item,
              rateValue: parseFloat(rates[key].USD).toFixed(2),
            });
          }
        }
      }
    }

    return joinedArr;
  }, [rates, userCryptos]);

  const {
    data: processLinkData,
    mutate: processLinkMutate,
    isLoading: processLinkLoading,
    isError: processLinkError,
  } = useMutation("processpagelink", (data) => processPaymentLink(data), {
    onSuccess: (message) => {
      setAmount(+message.amount.amountInCrypto);
      setUsd(+message.amount.amountInUsd);
      setEvent("Awaiting Payment");
      const channel = pusher.subscribe(
        `payment-notification-${data?.paymentlink.environment}`
      );

      channel.bind(`payment-${message.reference}`, function (details) {
        const { data } = details;
        if (data.event === "PAYMENT_SEEN") {
          setEvent("Payment Seen");
          new Notification("Payercoins", {
            body: "Your payment has been seen",
          });
          toast.info("Your payment has been seen");
        }
        if (data.event === "PAYMENT_COMPLETED") {
          setEvent("Payment Completed");
          new Notification("Payercoins", {
            body: "Your payment has been successfully completed",
          });
          toast.success("Your payment has been successfully completed");
        }
        if (data.event === "PAYMENT_INCOMPLETE") {
          const totalAmount = data.paymentPageTransaction.transfers.reduce(
            (acc, value) => +acc + +value.amount,
            0
          );
          if (totalAmount >= +message.amount.amountInCrypto) {
            setEvent("Payment Seen");
            new Notification("Payercoins", {
              body: "Your payment has been seen",
            });
            toast.info("Your payment has been seen");
          } else {
            setAmount(
              (prevState) => +message.amount.amountInCrypto - +totalAmount
            );
            setUsd(
              (prevState) =>
                data.paymentPageTransaction.rate *
                (+message.amount.amountInCrypto - +totalAmount)
            );
            setEvent("Payment Incompleted");
            new Notification("Payercoins", {
              body: "You made an incomplete payment",
            });
            toast.info("You made an incomplete payment");
          }
        }
      });
    },
  });

  const handleProcessPaymentLink = async (slug) => {
    const paymentData = {};
    for (let key in paymentPageForm) {
      if (key === "amount")
        paymentData[key] = +extractNumber(paymentPageForm[key].value);
      else paymentData[key] = paymentPageForm[key].value;
    }
    const { uuid } = await userCryptos.find((item) => item.slug === slug);
    paymentData["crypto"] = uuid;
    const ref = data.paymentPage.reference;
    const environ = data.paymentlink.environment;
    processLinkMutate({ paymentData, ref, environ });
  };

  return (
    <>
      {disabled && <Disabled />}
      {!disabled && (
        <Background>
          <WithLoadingComponent isLoading={isLoading}>
            <WithErrorComponent isError={processError}>
              <div className="paymentpage">
                <Helmet>
                  <title> Make a payment - Payercoins</title>
                </Helmet>
                <div className="paymentpage_img mb-small">
                  <img src={data?.paymentlink.user.profileImage} alt="User" />
                </div>
                <h3 className="title title-black mb-small">
                  {data?.paymentlink.pageName}
                </h3>
                <p className="title title-grey ta">
                  {data?.paymentPage.metaData.description}
                </p>
                {!error && <form className="paymentpage_form">{form}</form>}
                <Button
                  disabled={formValid}
                  bg="button_primary"
                  onclick={() => setShow(true)}
                >
                  Pay Now
                </Button>
                <div className="paymentpage_powered">
                  <span className="title title-grey"> Powered by</span>
                  <a
                    href={"https://payercoins.com"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <img src={Logo} alt="payercoins" />
                  </a>
                </div>
              </div>
            </WithErrorComponent>
          </WithLoadingComponent>
        </Background>
      )}
      {data?.paymentlink.environment === "sandbox" && <Warning />}
      {show && (
        <PaymentProcess
          cryptos={addedRates}
          close={setShow}
          handlePayment={handleProcessPaymentLink}
          setEvent={setEvent}
          processPageData={processLinkData}
          isLoading={processLinkLoading}
          isError={processLinkError}
          event={event}
          amount={amount}
          usd={usd}
        />
      )}
    </>
  );
};

export default PaymentPage;
