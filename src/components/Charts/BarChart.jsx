import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
const BarChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };
  return <Bar data={chartData} options={options} />;
};

export default BarChart;
