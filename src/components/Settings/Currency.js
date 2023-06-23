import { useMutation, useQueryClient } from "react-query";
import { useMemo, useState, useContext } from "react";

import WithLoadingComponent from "./../../hoc/withLoading";

import { AppContext } from "./../../context/index";

import Toggle from "./../UI/Switch";
import SmallLoader from "./../UI/SmallLoader";

import { useGetUserCryptos } from "./../../query/getCryptos";

import { activateWallet, deactivateWallet } from "../../services/crypto";
import { toast } from "react-toastify";

const Currency = () => {
  const [selected, setSelected] = useState("");

  const { environment } = useContext(AppContext);

  const data = useGetUserCryptos();

  const queryClient = useQueryClient();

  const cryptos = useMemo(() => {
    if (data[0].data) {
      return data[0]?.data[environment];
    }
  }, [data, environment]);

  const acceptedCryptos = useMemo(() => {
    return data[1].data;
  }, [data]);

  const isFetching = useMemo(() => {
    return data.some((item) => item.isLoading);
  }, [data]);

  const { mutate: deactivateMutate, isLoading: deactivateLoading } =
    useMutation("deactivate-wallet", (wallet) => deactivateWallet(wallet), {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getusercrypto");
        const selectedCrypto = cryptos.find((item) => item.slug === data);
        toast.success(`${selectedCrypto.name} has been deactivated`);
      },
    });

  const { mutate: activateMutate, isLoading: activateLoading } = useMutation(
    "activate-wallet",
    (wallet) => activateWallet(wallet),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getusercrypto");
        const selectedCrypto = cryptos.find((item) => item.slug === data);
        toast.success(`${selectedCrypto.name} has been activated`);
      },
    }
  );

  const handleCheckIncludes = (wallet) => {
    return acceptedCryptos?.includes(wallet) ? true : false;
  };

  const handleToggle = (slug) => {
    if (handleCheckIncludes(slug)) deactivateMutate({ wallet: slug });
    else activateMutate({ wallet: slug });
    setSelected(slug);
  };

  return (
    <div className="currency">
      <h3 className="title title-black mb-small">Currency</h3>
      <p className="title title-grey mb-small">
        Enable or disable cyptocurrency you would like to get paid with.
      </p>
      <WithLoadingComponent isLoading={isFetching}>
        <div>
          {cryptos?.map((item) => (
            <div className="currency_item" key={item.uuid}>
              <p className="title title-black">{item.name}</p>
              <Toggle
                param={item.slug}
                checked={handleCheckIncludes(item.slug)}
                toggle={() => handleToggle(item.slug)}
                disabled={deactivateLoading || activateLoading}
                offColor="#E4E8F1"
              />
              <SmallLoader
                isLoading={
                  (deactivateLoading || activateLoading) &&
                  item.slug === selected
                }
                height={30}
                width={30}
              />
            </div>
          ))}
        </div>
      </WithLoadingComponent>
    </div>
  );
};

export default Currency;
