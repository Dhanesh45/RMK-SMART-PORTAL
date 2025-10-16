import React, { useState } from "react";
import HododView from "./HodOdView";
import HodOutpassView from "./HodOutpassView";

const HodOdAppList = () => {
  const [showPopup, setShowPopup] = useState(false); // Control popup
  const [activeForm, setActiveForm] = useState(""); // "outpass" or "onduty"

  const students = [
    { sno: 1, nof: 20, name: "Nandhini" },
    { sno: 2, nof: 20, name: "Shobana" },
    { sno: 3, nof: 20, name: "Saravanan" },
    { sno: 4, nof: 20, name: "Vijayaraj" },
    { sno: 5, nof: 20, name: "Akila" },
    { sno: 6, nof: 20, name: "Rajitha" },
    { sno: 7, nof: 20, name: "Akila" },
    { sno: 8, nof: 20, name: "Rajitha" },
    { sno: 9, nof: 20, name: "Akila" },
    { sno: 10, nof: 20, name: "Rajitha" },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      

      {/* Content Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(238, 238, 238, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "2%",
        }}
      >
        {/* Dropdown */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1.5%",
          }}
        >
          <select
            style={{
              padding: "1%",
              borderRadius: "0.6%",
              border: "0.1% solid #ccc",
              fontSize: "90%",
            }}
          >
            <option value="">Counsellor</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {/* Table Container */}
        <div
          style={{
            width: "90%",
            height: "65vh",
            backgroundColor: "rgba(217, 217, 217, 1)",
            border: "0.4% solid rgba(217, 217, 217,1)",
            borderRadius: "1%",
            padding: "0.8%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "8% 18% 20% 20% 17% 17%",
              backgroundColor: "white",
              fontWeight: "bold",
              textAlign: "center",
              padding: "0.8%",
              borderRadius: "0.5vh",
              marginBottom: "0.8%",
            }}
          >
            <div>S.NO</div>
            <div>NAME</div>
            <div>REG.NO</div>
            <div>OUTPASS DETAILS</div>
            <div>ONDUTY DETAILS</div>
            <div>VALIDATION</div>
          </div>

          {/* Table Body */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {students.map((student) => (
              <div
                key={student.sno}
                style={{
                  display: "grid",
                  gridTemplateColumns: "8% 18% 20% 20% 17% 17%",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "1vh",
                  padding: "0.8%",
                  marginBottom: "0.8%",
                  boxShadow: "0% 0.3% 0.6% rgba(0,0,0,0.15)",
                }}
              >
                <div style={cardCell}>{student.sno}</div>
                <div style={cardCell}>{student.name}</div>
                <div style={cardCell}>{student.nof}</div>
                <div style={cardCell}>
                  <button
                    style={formBtn}
                    onClick={() => {
                      setShowPopup(true);
                      setActiveForm("outpass");
                    }}
                  >
                    OUTPASS
                  </button>
                </div>
                <div style={cardCell}>
                  <button
                    style={formBtn}
                    onClick={() => {
                      setShowPopup(true);
                      setActiveForm("onduty");
                    }}
                  >
                    ONDUTY
                  </button>
                </div>
                <div style={cardCell}>
                  <button style={approveBtn}>APPROVE</button>
                  <button style={rejectBtn}>REJECT</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            margin: "auto",
            width: "90%",
          }}
        >
          <button style={bottomBtn}>Approve All</button>
        </div>
      </div>

      {/* Conditional Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              width: "80%",
              height: "90%",
              overflowY: "auto",
              padding: "1%",
              position: "relative",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>

            {/* Conditional Rendering with clean popup */}
            {activeForm === "outpass" && <HodOutpassView isPopup={true} />}
            {activeForm === "onduty" && <HododView isPopup={true} />}
          </div>
        </div>
      )}
    </div>
  );
};

// Common Styles
const cardCell = { textAlign: "center", fontSize: "90%" };

const formBtn = {
  fontWeight: "bold",
  padding: "0.7% 5%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "8%",
  cursor: "pointer",
  alignItems: "center",
};

const approveBtn = {
  fontWeight: "bold",
  padding: "1% 3%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "12%",
  marginRight: "1%",
  cursor: "pointer",
};

const rejectBtn = {
  fontWeight: "bold",
  padding: "1% 2%",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "8%",
  cursor: "pointer",
};

const bottomBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "1% 3%",
  borderRadius: "8%",
  cursor: "pointer",
  fontSize: "100%",
  fontWeight: "bold",
};

export default HodOdAppList;
