import React from "react";
import OutpassDetailsChart from "./OutpassDetailsChart";
import ApplicationFormDetailsChart from "./ApplicationFormDetailsChart";
import OdDetailsChart from "./OdDetailsChart";

const OaDashboard = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ height: "10vh", width: "100vw" }}> nav bar</div>
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
            justifyContent:"space-between",
            
          }}
        >
          {/* empty and bonafide */}
          <div
            style={{ width: "49%", height: "75vh" }}
          >
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
                  paddingLeft:"2%",
                  paddingTop:"1%",
                }}
              >
                 <h3
              style={{
                fontSize: "2.5vh",
                fontWeight: "bold",
                marginBottom: "1%",
              }}
            >
              ON DUTY DETAILS
            </h3>
            <OdDetailsChart />
              </div>
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
                  paddingLeft:"2%",
                  paddingTop:"1%",
                }}
              >
                 <h3
              style={{
                fontSize: "2.5vh",
                fontWeight: "bold",
                marginBottom: "1%",
              }}
            >
              APPLICATION FORM DETAILS
            </h3>
            <ApplicationFormDetailsChart />
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
                  paddingLeft:"2%",
                  paddingTop:"1%",
                }}
              >
                 <h3
              style={{
                fontSize: "2.5vh",
                fontWeight: "bold",
                marginBottom: "2%",
              }}
            >
              OUTPASS DETAILS <span style={{ fontSize: "2vh",marginLeft:"55%"}}>No Of Request: 60</span>
            </h3>
            <OutpassDetailsChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OaDashboard;
