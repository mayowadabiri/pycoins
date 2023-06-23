import { useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import TransactionsDetails from './../../components/TransactionDetails';
import FundWallet from '../../components/CryptoDetails/Fund';
import WithDraw from '../../components/CryptoDetails/Withdraw';
import Back from '../../components/Back';
import Table from './../../components/Table';
import TableResponsive from './../../components/TableResponsive';
import Details from '../../components/CryptoDetails/Details';
import LandingEmpty from './../../components/Dashboard/Empty';
import TransactionType from '../../components/TransactionType';

import { cryptos } from '../../constants';
import useWindowWidth from './../../hooks/windowWidth';
import { useGetWalletTransactions } from '../../query/getWalletTransactions';
import { useGetWalletBalance } from '../../query/getWalletBalance';
import WithLoadingComponent from './../../hoc/withLoading';
import { useGetStaticAddress } from './../../query/getStaticAddress';
import { dateFormatter } from './../../utils/dateFormatter';
import { useGetWalletFiatTransactions } from '../../query/getFiatTransations';

const cryptoTableHead = ['TRANSACTION', 'AMOUNT', 'DATE', 'STATUS'];
const fiatTableHead = ['AMOUNT (FIAT)', 'AMOUNT (USD)', 'DATE', 'STATUS'];

const CryptoDetails = ({ history }) => {
  const [tableType, setTableType] = useState('crypto');
  const [show, setShow] = useState(false);
  const [fund, setFund] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [width] = useWindowWidth();
  const [selected, setSelected] = useState({});

  const { slug } = useParams();
  // const currency = search.substring(10);

  const crypto = useMemo(() => {
    return cryptos.find((item) => item.slug === slug);
  }, [slug]);

  if (!crypto) history.push('/');
  const { isFetching, data: cryptoData } = useGetWalletTransactions(
    crypto?.slug
  );
  const { data: fiatData } = useGetWalletFiatTransactions(crypto?.slug, 1, 100);
  const { data: balance } = useGetWalletBalance(crypto?.slug);

  const formattedTransactions = useMemo(() => {
    return cryptoData?.transactions
      .filter((item) => item.transfer !== null)
      .map((item) => {
        const date = dateFormatter(item.createdAt);
        return {
          ...item,
          date,
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

  const { data: address } = useGetStaticAddress(crypto?.slug);

  const updateTable = useMemo(() => {
    if (tableType === 'crypto') {
      return formattedTransactions;
    } else {
      return formattedFiatTransactions;
    }
  }, [tableType, formattedTransactions, formattedFiatTransactions]);
  console.log(updateTable);

  const selectedTransaction = (id) => {
    const transaction = updateTable.find((item) => item.id === id);
    setSelected(transaction);
    setShow(true);
  };

  return (
    <>
      <div className="cryptodetails">
        <Helmet>
          <title>{slug} - Payercoins</title>
        </Helmet>
        <Back to="/wallets" title="Wallet" />
        <Details
          balance={balance}
          crypto={crypto}
          setFund={setFund}
          setWithdraw={setWithdraw}
        />
        <div className="mt-md">
          <h3 className="title title-black mb-small">Transaction </h3>

          <TransactionType
            tableType={tableType}
            setCrypto={() => setTableType('crypto')}
            setFiat={() => setTableType('fiat')}
          />
          <WithLoadingComponent isLoading={isFetching}>
            {updateTable?.length < 1 && <LandingEmpty />}
            {updateTable?.length > 0 && (
              <>
                {width > 500 && (
                  <Table
                    data={updateTable}
                    onclick={selectedTransaction}
                    tableHead={
                      tableType === 'crypto' ? cryptoTableHead : fiatTableHead
                    }
                    currency={crypto.name}
                  />
                )}
                {width <= 500 && (
                  <TableResponsive
                    data={updateTable}
                    onclick={selectedTransaction}
                    currency={crypto.name}
                  />
                )}
              </>
            )}
          </WithLoadingComponent>
        </div>
      </div>

      {show && (
        <TransactionsDetails
          close={() => setShow(false)}
          details={selected}
          selectedCrypto={crypto}
        />
      )}
      {fund && <FundWallet address={address} close={() => setFund(false)} />}
      {withdraw && (
        <WithDraw
          currency={slug}
          close={() => setWithdraw(false)}
          selectedCrypto={crypto}
          balance={balance}
        />
      )}
    </>
  );
};

export default CryptoDetails;
