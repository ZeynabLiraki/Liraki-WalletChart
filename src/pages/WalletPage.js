import React from "react";
import { useLocation } from "react-router-dom";
import { useGetWalltDetails } from "../utils/queries";
import ChartComponent from "../components/chartComponent/ChartComponent";
import { Flex, Spin } from "antd";
import ErrorPage from "./ErrorPage";
const WalletPage = () => {
  const { state } = useLocation();
  const { data, error, isLoading } = useGetWalltDetails(state.walletAddress);

  return (
    <>
      {!isLoading && data && (
        <div className="App">
          <ChartComponent walletData={data} />
        </div>
      )}

      {isLoading && (
        <Flex align="center" justify="center" className="App">
          <Spin size="large" />
        </Flex>
      )}

      {error && <ErrorPage message={error.message} />}
    </>
  );
};

export default WalletPage;
