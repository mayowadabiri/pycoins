import { useState, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";

import WithLoadingComponent from "./../../hoc/withLoading";

import Back from "../../components/Back";
import Balance from "./../../components/PaymentDetails/Balance";
import Table from "../../components/Table";
import Empty from "../../components/Empty";
import TransactionsDetails from "../../components/TransactionDetails";
import TableResponsive from "./../../components/TableResponsive";
import PaymentHeader from "./../../components/PaymentDetails/Header";
import PaymentForm from "./../../components/Payment/PaymentForm";

import { useGetUserPaymentLink } from "../../query/getUserPaymentLink";
import { useGetUserWallets } from "../../query/getCryptos";
import { useDeletePaymentLink } from "../../query/deletePaymentLink";
import { useDisablePaymentLink } from "../../query/disablePaymentLink";
import { useEnablePaymentLink } from "../../query/enablePaymentLink";
import { useGetPaymentTransactions } from "../../query/getPaymentTransactions";

import useWindowWidth from "../../hooks/windowWidth";
import useAmount from "../../hooks/amountForm";
import usePaymentForm from "../../hooks/paymentForm";

import { addPaymentUrl } from "./../../utils/addPaymentUrl";
import { formatTransactions } from "../../utils/formatTransaction";

import empty from "../../assets/empty.svg";
import Delete from "./../../components/UI/Delete";
import WithErrorComponent from "./../../hoc/withError";

const tableHeader = ["NAME", "EMAIL", "AMOUNT (USD)", "DATE", "STATUS"];

const PaymentDetails = ({ history }) => {
  const [show, setShow] = useState(false);
  const [ctas, setCtas] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const { params } = useRouteMatch();

  const [width] = useWindowWidth();

  const { data } = useGetUserPaymentLink(params.id);

  const {
    data: paymentData,
    isFetching: isTransactionLoading,
    isError: linkError,
  } = useGetPaymentTransactions(params.id);

  const { data: userData } = useGetUserWallets();

  const [amountForm, setAmountForm] = useAmount(data?.paymentPage.amount);

  const { mutate: deleteMutate, isLoading: deleteLoading } =
    useDeletePaymentLink(data?.paymentlink._id, history);

  const { mutate: disableMutate } = useDisablePaymentLink(
    data?.paymentlink._id
  );

  const { mutate: enableMutate } = useEnablePaymentLink(data?.paymentlink._id);

  const editDetails = useMemo(() => {
    const editParams = {
      pageName: data?.paymentPage.metaData.name,
      desc: data?.paymentPage.metaData.description,
      cryptos: data?.paymentPage.availableCrypto,
    };
    return editParams;
  }, [data]);

  const userAcceptedWallet = useMemo(() => {
    return userData;
  }, [userData]);

  const [paymentForm, setPayentForm, paymentFormValid, setPaymentFormValid] =
    usePaymentForm(userAcceptedWallet, editDetails);

  const transactions = useMemo(() => {
    if (paymentData?.length > 0) {
      return formatTransactions(paymentData);
    }
  }, [paymentData]);

  const updatedData = useMemo(() => {
    const updatedPaymentLink = data && addPaymentUrl(data?.paymentlink);

    return updatedPaymentLink;
  }, [data]);

  const available = useMemo(() => {
    return paymentData
      ?.filter((item) => item.confirmedAmountInUsd)
      .reduce((sum, item) => {
        return sum + +item.confirmedAmountInUsd;
      }, 0);
  }, [paymentData]);

  const handleClick = (evt) => {
    evt.stopPropagation();
    setCtas(!ctas);
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    setShowDelete(true);
  };

  const handleDisable = (evt) => {
    evt.preventDefault();
    disableMutate();
  };

  const selectedTransaction = (id) => {
    const transaction = transactions.find((item) => item.id === id);
    setSelected(transaction);
    setShow(true);
  };
  return (
    <>
      <WithLoadingComponent isLoading={isTransactionLoading}>
        <WithErrorComponent isError={linkError}>
          <div className="paymentdetails" onClick={() => setCtas(false)}>
            <Helmet>
              <title>Payment Page - Payercoins</title>
            </Helmet>
            <Back to="/payment/pay" title="Back" />
            <PaymentHeader
              handleDelete={handleDelete}
              link={updatedData}
              ctas={ctas}
              handleDisable={handleDisable}
              handleEnable={enableMutate}
              handleEdit={() => setIsEdit(true)}
              click={handleClick}
            />
            <h5 className="title title-black  ">Balance</h5>
            <Balance
              available={available}
              data={paymentData}
              customers={transactions?.length}
            />
            <h3 className="title title-black mt-small mb-small">
              Transactions
            </h3>

            {(transactions?.length < 1 || !transactions) && (
              <Empty>
                <img src={empty} alt="Empty State" />
                <h3 className="title title-black mb-small mt-small ta">
                  You don't have any transaction yet
                </h3>
                <p className="title title-grey ">
                  Create a payment link to start requesting money from friends,
                  family, customers or anyone anywhere around the world.
                </p>
              </Empty>
            )}
            {transactions?.length > 0 && (
              <>
                {width > 500 && (
                  <Table
                    tableHead={tableHeader}
                    data={transactions}
                    onclick={selectedTransaction}
                  />
                )}
                {width <= 500 && (
                  <TableResponsive
                    data={transactions}
                    onclick={selectedTransaction}
                  />
                )}
              </>
            )}
            {show && (
              <TransactionsDetails
                close={() => setShow(false)}
                details={selected}
              />
            )}
          </div>
        </WithErrorComponent>
      </WithLoadingComponent>
      {isEdit && (
        <PaymentForm
          paymentForm={paymentForm}
          setPaymentForm={setPayentForm}
          paymentFormValid={paymentFormValid}
          setPaymentFormValid={setPaymentFormValid}
          amountForm={amountForm}
          setAmountForm={setAmountForm}
          show={isEdit}
          isEditMode={isEdit}
          handleClose={() => setIsEdit(false)}
          amountType={data?.paymentPage.amountType}
        />
      )}

      {showDelete && (
        <Delete
          close={() => setShowDelete(false)}
          mutate={deleteMutate}
          isLoading={deleteLoading}
          text=" Deleting this payment page means you will loose all the transaction
          history attached to this payment page but your balance will still be
          intact."
        />
      )}
    </>
  );
};

export default PaymentDetails;
