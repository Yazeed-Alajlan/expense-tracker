import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ chartData }) => {
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

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
