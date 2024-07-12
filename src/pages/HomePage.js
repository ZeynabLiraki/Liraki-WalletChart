import { Flex, Spin } from "antd";
import ErrorPage from "./ErrorPage";
import { useGetValuableWallets } from "./../utils/queries";
import Table from "./../components/table/Table";

const HomePage = () => {
  const { data, error, isLoading } = useGetValuableWallets(1, 50);
  const columns = [
    { header: "Net Profit", accessor: "netProfit" },
    { header: "Wallet Address", accessor: "walletAddress" },
  ];

  return (
    <>
      {!isLoading && (
        <div className="App">
          <h1>Valuable Wallets</h1>
          <Table columns={columns} data={data} rowsPerPage={5} />
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

export default HomePage;
