//

import React, { useState, useEffect, useMemo, Suspense } from "react";
import "./ChartComponent.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
const Chart = React.lazy(() =>
  import("react-chartjs-2").then((module) => ({ default: module.Bar }))
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ walletData }) => {
  const [state, setState] = useState({
    labels: [],
    totalBuySellTimes: [],
    sellAmounts: [],
    buyAmounts: [],
  });

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (walletData) {
      setState({
        labels: Object.keys(walletData?.totalBuySellTimes?.month),
        totalBuySellTimes: Object.values(walletData?.totalBuySellTimes.month),
        sellAmounts: Object.values(walletData?.totalSellAmounts?.month),
        buyAmounts: Object.values(walletData?.totalBuyAmounts?.month),
      });
      setIsVisible(true);
    }
  }, [walletData]);

  const data = useMemo(
    () => ({
      labels: state.labels,
      datasets: [
        {
          type: "line",
          label: "Total Buy and Sell Times",
          data: state.totalBuySellTimes,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
          yAxisID: "y-axis-right",
        },
        {
          type: "bar",
          label: "Buy Amount",
          data: state.buyAmounts,
          backgroundColor: "rgba(0, 255, 0, 0.5)",
          yAxisID: "y-axis-left",
        },
        {
          type: "bar",
          label: "Sell Amount",
          data: state.sellAmounts,
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          yAxisID: "y-axis-left",
        },
      ],
    }),
    [state]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        "y-axis-left": {
          type: "linear",
          position: "left",
          ticks: {
            beginAtZero: true,
          },
        },
        "y-axis-right": {
          type: "linear",
          position: "right",
          ticks: {
            beginAtZero: true,
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    }),
    []
  );

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="chart-container">
      <h1>Wallets Detail</h1>
      <Button type="primary" onClick={handleBack}>
        Back
      </Button>

      {isVisible && (
        <Suspense fallback={<div>Loading Chart...</div>}>
          <div className="chart">
            <Chart data={data} options={options} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default ChartComponent;
