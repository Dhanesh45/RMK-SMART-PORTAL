import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = () => {
  const data = {
    labels: ["APPROVED", "REJECTED", "PENDING"],
    datasets: [
      {
        data: [38, 12, 10], // Values
        backgroundColor: ["#1E2E4F", "#31487A", "#8FB3E2"], // Bar colors
        borderRadius: 2.5 * window.innerHeight / 100, // Rounded top corners in vh
        barPercentage: 0.4, // Bar thickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "end",
        align: "start",
        color: "white",
        font: {
          size: 2 * window.innerHeight / 100,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: 2 * window.innerHeight / 100,
            weight: "bold",
          },
        },
      },
      y: {
        grid: { display: false },
        ticks: { display: false }, // removes 0,10,20…
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "85%",
        display: "flex",              // 🔥 flexbox wrapper
        justifyContent: "center",     // move horizontally (flex-start, center, flex-end, space-around)
        alignItems: "center",         // move vertically (flex-start, center, flex-end)
      }}
    >
      <div
        style={{
          width: "90%",   // keep chart size stable
          height: "100%",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
