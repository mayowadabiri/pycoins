import { useQuery } from 'react-query';
import {
  getFiatTransations,
  getWalletFiatTransactions,
} from '../services/crypto';

export const useGetFiatTransactions = (page, pageSize) => {
  return useQuery(
    'getwallettransactions',
    () => getFiatTransations(page, pageSize),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

export const useGetWalletFiatTransactions = (crypto, page, pageSize) => {
  return useQuery(
    'getwalletfiattransactions',
    () => getWalletFiatTransactions(page, pageSize, crypto),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
