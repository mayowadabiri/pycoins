import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import WithLoadingComponent from "./../../hoc/withLoading";

import Empty from "../../components/Empty";
import Button from "../../components/UI/Button";
import PaymentForm from "../../components/Payment/PaymentForm";
import PaymentTable from "../../components/Payment/Table";
import PaymentTableResponsive from "./../../components/Payment/PaymentTable";

import { useGetPaymentLinks } from "./../../query/getPaymentLinks";

import useWindowWidth from "../../hooks/windowWidth";

import { dateFormatter } from "./../../utils/dateFormatter";
import { addPaymentUrl } from "./../../utils/addPaymentUrl";

import Plus from "../../assets/plus.svg";
import Link from "../../assets/link.svg";
import WithErrorComponent from "./../../hoc/withError";

const Payment = ({ history, isLoading }) => {
  const [show, setShow] = useState(false);
  const [paymentLinks, setPaymentLinks] = useState([]);

  const [width] = useWindowWidth();
  const { data, isLoading: getLinksLoading, isError } = useGetPaymentLinks();

  useEffect(() => {
    if (data && !getLinksLoading) {
      const mappedArray = data?.paymentLinks?.map((item) => {
        const updatedData = addPaymentUrl(item);
        const date = dateFormatter(updatedData.createdAt);
        return {
          ...updatedData,
          createdAt: date,
        };
      });
      setPaymentLinks(mappedArray);
    }
  }, [data, getLinksLoading]);

  const handleChangePage = (slug, id) => {
    history.push(`/payment/pay/${slug}/${id}`);
  };

  // const handleCreateLink = (evt, isFixed) => {
  //   evt.preventDefault();
  //   mutate(data)
  //   // mutate(data);
  // };

  return (
    <WithLoadingComponent isLoading={isLoading || getLinksLoading}>
      <WithErrorComponent isError={isError}>
        <div className="payment">
          <Helmet>
            <title>Payment Page - Payercoins</title>
          </Helmet>
          <div className="payment_container">
            <h3 className="title title-black">Payment Page</h3>
            <Button
              disabled={true}
              bg={"button_primary"}
              onclick={() => setShow(true)}
            >
              <img src={Plus} alt="Add" />
              <span>Create New</span>
            </Button>
          </div>
          {paymentLinks?.length < 1 && (
            <Empty>
              <img src={Link} alt="Empty State" />
              <h3 className="title title-black mb-small mt-small">
                You haven’t created any payment link yet!
              </h3>
              <p className="title title-grey ">
                Create a payment link to start requesting money from friends,
                family, customers or anyone anywhere around the world.
              </p>
            </Empty>
          )}
          {paymentLinks?.length > 0 && (
            <>
              {width > 400 && (
                <PaymentTable
                  gotoDetails={handleChangePage}
                  data={paymentLinks}
                />
              )}
            </>
          )}
          <>
            {width <= 400 && (
              <PaymentTableResponsive
                gotoDetails={handleChangePage}
                data={paymentLinks}
              />
            )}
          </>
        </div>
        {show && <PaymentForm show={show} setShow={setShow} />}
      </WithErrorComponent>
    </WithLoadingComponent>
  );
};

export default Payment;
