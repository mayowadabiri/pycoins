import { Helmet } from "react-helmet";
import { useMemo } from "react";

import WithLoadingComponent from "./../../hoc/withLoading";

import Cryptocurrency from "../../components/Wallets/CryptoCurrency";

import { useGetWallets } from "./../../query/getWallets";

import { addClassName } from "./../../utils/addClassName";

const Wallet = () => {
  const { data: walletData, isLoading } = useGetWallets();

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
          item?.crypto?.symbol?.includes("USDT") ||
          item?.crypto?.symbol?.includes("UDST")
        ) {
          symbol = "USDT";
        }
        return {
          ...item,
          symbol: symbol || item.crypto.symbol,
        };
      });
    }
  }, [walletData]);

  return (
    <WithLoadingComponent isLoading={isLoading}>
      <div className="wallets">
        <Helmet>
          <title>Wallet - Payercoins</title>
        </Helmet>
        <h3 className="title title-black">Wallets</h3>
        <div className="wallets_crypto">
          <Cryptocurrency wallets={wallets} />
        </div>
      </div>
    </WithLoadingComponent>
  );
};

export default Wallet;
