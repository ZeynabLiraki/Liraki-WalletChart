import { useQuery } from "react-query";
import { ValuableWallets } from "../services/constants";
import { requestGet } from "./../services/requests";
import { WalletSummary } from "./../services/constants";

export const useGetValuableWallets = (pageNumber, pageSize) => {
  return useQuery(
    ["totalValuableWallets", pageNumber, pageSize],
    async () => {
      const res = await requestGet(ValuableWallets, {
        params: {
          network: "eth",
          page: pageNumber,
          limit: pageSize,
        },
      });
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetWalltDetails = (walletAdress) => {
  return useQuery(
    ["walletDetails", walletAdress],
    async () => {
      const res = await requestGet(`${WalletSummary}/${walletAdress}`, {
        params: {
          network: "eth",
        },
      });
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
