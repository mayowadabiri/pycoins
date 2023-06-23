import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQueryClient } from 'react-query';

import WithLoadingComponent from './../../hoc/withLoading';
import WithErrorComponent from './../../hoc/withError';

import CryptoCurrency from '../../components/Dashboard/CrytptoCurrency';
import Table from '../../components/Table';
import Kyc from '../../components/Dashboard/Kyc';
import TableResponsive from './../../components/TableResponsive';
import useWindowWidth from './../../hooks/windowWidth';
import LandingHeader from './../../components/Dashboard/Header';
import LandingEmpty from './../../components/Dashboard/Empty';
import TransactionType from './../../components/TransactionType';

import { RightArrow } from '../../icons';
import { getTransactions } from '../../services/crypto';

import { useGetWallets } from './../../query/getWallets';

// import { useGetFiatTransactions } from '../../query/getFiatTransations';

import { addClassName } from './../../utils/addClassName';
import { useGetTransactions } from '../../query/getTransactions';
import { useGetFiatTransactions } from '../../query/getFiatTransations';
import { dateFormatter } from './../../utils/dateFormatter';
import Pagination from './../../components/Pagination';

const cryptoTableHead = ['PAYMENT TYPE', 'AMOUNT (CRYPTO)', 'DATE', 'STATUS'];
const fiatTableHead = ['AMOUNT (FIAT)', 'AMOUNT (USD)', 'DATE', 'STATUS'];

const Dashboard = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const [width] = useWindowWidth();
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: walletData } = useGetWallets();
  const queryClient = useQueryClient();
  const [tableType, setTableType] = useState('crypto');

  useEffect(() => {
    queryClient.prefetchQuery(['gettransactions', currPage], () =>
      getTransactions(1, pageSize)
    );

    setCurrPage(1);
  }, [pageSize]); // eslint-disable-line

  const {
    isLoading: isLoadingTransactions,
    data: cryptoData,
    isError,
  } = useGetTransactions(currPage, pageSize);

  const {
    // isLoading: isLoadingTransactions,
    data: fiatData,
  } = useGetFiatTransactions(currPage, pageSize);
  console.log('fiatData', fiatData);

  const date = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
  }, []); // eslint-disable-line

  const wallets = useMemo(() => {
    const mappedWallet = walletData?.map((item) => {
      return {
        ...item,
        ...item.crypto,
      };
    });

    if (mappedWallet?.length > 0) {
      const addedWallet = addClassName(mappedWallet);

      return addedWallet.map((item) => {
        var symbol;
        if (
          item?.crypto?.symbol?.includes('USDT') ||
          item?.crypto?.symbol?.includes('UDST')
        ) {
          symbol = 'USDT';
        }
        return {
          ...item,
          symbol: symbol || item.crypto.symbol,
        };
      });
    }
  }, [walletData]);

  const formattedTransactions = useMemo(() => {
    return cryptoData?.transactions?.map((item) => {
      const date = dateFormatter(item.createdAt);
      return {
        ...item,
        paymentType:
          item.transferableType === 'wallet' ? 'Wallet' : 'Payment Page',
        date,
        cryptoType: item.crypto.type.includes('USDT')
          ? item.crypto.type.split('-').splice(1, 2).join(' ')
          : item.crypto.type,
        walletType:
          item?.cryptoWalletTransaction?.length > 0 &&
          item?.cryptoWalletTransaction[0].type === 'send'
            ? 'Withdrawal'
            : item.cryptoWalletTransaction.length > 0 &&
              item.cryptoWalletTransaction[0].type === 'deposit'
            ? 'Deposit'
            : null,
        amount:
          item?.paymentPageTransaction?.length > 0
            ? item.paymentPageTransaction[0].amountInCrypto
            : item.amount,
      };
    });
  }, [cryptoData]);

  const formattedFiatTransactions = useMemo(() => {
    return fiatData?.transactions.map((item) => {
      const date = dateFormatter(item.createdAt);
      return {
        fiat_amount: item.fiat_amount,
        usd_amount: item.amount_usd,
        date,
        status: item.status,
      };
    });
  }, [fiatData]);

  const updateTable = useMemo(() => {
    if (tableType === 'crypto') {
      return formattedTransactions;
    } else {
      return formattedFiatTransactions;
    }
  }, [tableType, formattedTransactions, formattedFiatTransactions]);

  const paginated = useMemo(() => {
    return {
      count: cryptoData?.count,
      page: cryptoData?.page + 1,
      noOfPages: cryptoData?.count / +cryptoData?.perPage,
      pageSize,
    };
  }, [cryptoData]);

  const handlePrevPage = () => {
    setCurrPage(currPage - 1);
  };
  const handleNextPage = () => {
    setCurrPage(currPage + 1);
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <>
      <WithLoadingComponent isLoading={isLoadingTransactions}>
        <WithErrorComponent isError={isError}>
          <div className="home">
            <Helmet>
              <title>Home - Payercoins</title>
            </Helmet>
            <LandingHeader date={date} setShow={setShow} />
            <div className="home_wallets">
              <p className="title title-small">Wallet</p>
              <Link to="/wallet" className="home_link">
                <span className="link link-small">View All</span>
                <RightArrow fill={'#48D189'} />
              </Link>
            </div>
            <div className="home_container-crypto">
              <CryptoCurrency wallets={wallets} />
            </div>
            <div className="home_empty">
              <p className="title title-small mb-small">Recent Transactions </p>
              <TransactionType
                tableType={tableType}
                setCrypto={() => setTableType('crypto')}
                setFiat={() => setTableType('fiat')}
              />
              {updateTable?.length < 1 && <LandingEmpty />}
              {updateTable?.length > 0 && (
                <div className="home_table">
                  {width > 500 && (
                    <Table
                      data={updateTable}
                      onclick={() => {}}
                      tableHead={
                        tableType === 'crypto' ? cryptoTableHead : fiatTableHead
                      }
                    />
                  )}
                  {width <= 500 && (
                    <TableResponsive
                      data={formattedTransactions}
                      onclick={() => {}}
                    />
                  )}
                  <Pagination
                    data={paginated}
                    nextPage={handleNextPage}
                    prevPage={handlePrevPage}
                    currPage={currPage}
                    handlePageSize={handlePageSize}
                  />
                </div>
              )}
            </div>
          </div>
        </WithErrorComponent>
      </WithLoadingComponent>
      {show && <Kyc close={() => setShow(false)} />}
    </>
  );
};

export default Dashboard;
