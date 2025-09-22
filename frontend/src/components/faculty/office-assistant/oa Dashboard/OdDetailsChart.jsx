import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const data = {
    labels: ["Hostellers", "Day Scholars"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#1E2E4F", "#8FB3E2"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        color: (context) => {
          const colors = ["white", "white"]; // 👈 same as slice colors
          return colors[context.dataIndex]; // different color for each number
        },
        font: {
          size: 2 * window.innerHeight / 100,
          weight: "bold",
        },
        formatter: (value) => `${value}`, // show raw value (65, 35)
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "85%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* Chart Area */}
      <div
        style={{
          width: "45%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Doughnut data={data} options={options} />
      </div>

      {/* Legend Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
          fontSize: "2vh",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1vh" }}>
          <div
            style={{
              width: "2vh",
              height: "2vh",
              backgroundColor: "#1E2E4F",
              borderRadius: "0.5vh",
            }}
          ></div>
          <span>Hostellers</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1vh" }}>
          <div
            style={{
              width: "2vh",
              height: "2vh",
              backgroundColor: "#8FB3E2",
              borderRadius: "0.5vh",
            }}
          ></div>
          <span>Day Scholars</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
