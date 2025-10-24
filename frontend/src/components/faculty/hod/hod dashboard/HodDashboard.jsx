import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
const HodDashboard = () => {
  return (
   
      
      <div
        style={{
          width: "100%",
          height: "90vh",
          backgroundColor: "#EEEEEE",
          padding: "4% 3%",
      
        }}
      >
        <div
          style={{
            width: "100%",
            height: "75vh",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* empty and bonafide */}
          <div style={{ width: "49%", height: "75vh" }}>
            <div
              style={{
                width: "100%",
                height: "35vh",
                marginBottom: "3%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "35vh",
                  backgroundColor: "#fff",
                  borderRadius: "2vh",
                  boxShadow: "0 0 1vh rgba(0,0,0,0.1)",
                  paddingLeft: "2%",
                  paddingTop: "1%",
                }}
              ></div>
            </div>
            <div
              style={{
                width: "100%",
                height: "35vh",
                marginBottom: "2%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "35vh",
                  backgroundColor: "#fff",
                  borderRadius: "2vh",
                  boxShadow: "0 0 1vh rgba(0,0,0,0.1)",
                  paddingLeft: "2%",
                  paddingTop: "1%",
                }}
              >
                <h3
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "bold",
                    marginBottom: "1%",
                  }}
                >
                  BONAFIDE/FEES RECEIPT
                </h3>
                <PieChart />
              </div>
            </div>
          </div>
          {/* approve/reject */}
          <div style={{ width: "49%", height: "75vh" }}>
            <div
              style={{
                width: "100%",
                height: "72.5vh",
                marginBottom: "3%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "72.5vh",
                  backgroundColor: "#fff",
                  borderRadius: "2vh",
                  boxShadow: "0 0 1vh rgba(0,0,0,0.1)",
                  paddingLeft: "2%",
                  paddingTop: "1%",
                }}
              >
                <h3
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "bold",
                    marginBottom: "2%",
                  }}
                >
                  APPROVED/REJECTED{" "}
                  <span style={{ fontSize: "2vh", marginLeft: "60%" }}>
                    Total: 60
                  </span>
                </h3>
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HodDashboard;
