import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const HorizontalBarChart = ({ chartData }) => {
  const colorCode = "#777";
  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        beginAtZero: false,
        ticks: {
          color: colorCode,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
          color: colorCode,
        },
      },
    },
  };

  return <Bar type={"bar"} data={chartData} options={options} />;
};

export default HorizontalBarChart;
