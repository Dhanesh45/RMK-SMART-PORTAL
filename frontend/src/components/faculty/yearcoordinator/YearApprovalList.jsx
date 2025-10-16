import React, { useState } from "react";

const YearApprovalList = () => {
  const [showPopup, setShowPopup] = useState(false);

  const students = [
    { sno: 1, reg: 111723203001, name: "Akash", couns: "Annalakshmi" },
    { sno: 2, reg: 111723203003, name: "Leo", couns: "Nandhini" },
    { sno: 3, reg: 111723203004, name: "Dhinesh", couns: "Shobana" },
    { sno: 4, reg: 111723203005, name: "Mukesh", couns: "Nagarajan" },
    { sno: 5, reg: 111723203006, name: "Arul", couns: "Nagarajan" },
    { sno: 6, reg: 111723203007, name: "Nair", couns: "Nagarajan" },
    { sno: 7, reg: 111723203007, name: "Nair", couns: "Nagarajan" },
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
      

      {/* Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(238, 238, 238, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "1%",
        }}
      >
        {/* Dropdown */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "2%",
          }}
        >
          <select
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="">Counsellor</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {/* Table */}
        <div
          style={{
            width: "90%",
            height: "70vh",
            border: "8px solid rgba(217, 217, 217,1)",
            borderRadius: "10px",
            backgroundColor: "rgba(217, 217, 217, 1)",
            padding: "0% 0.5% 0% 0.5%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>S.NO</th>
                <th style={headerStyle}>NAME</th>
                <th style={headerStyle}>REG.NO</th>
                <th style={headerStyle}>Counsellor Name</th>
                <th style={headerStyle}>FORM DETAILS</th>
                <th style={headerStyle}>VALIDATION</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.sno}
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <td style={cellStyle}>{student.sno}</td>
                  <td style={cellStyle}>{student.name}</td>
                  <td style={cellStyle}>{student.reg}</td>
                  <td style={cellStyle}>{student.couns}</td>
                  <td style={cellStyle}>
                    <button style={formBtn} onClick={() => setShowPopup(true)}>
                      VIEW FORM
                    </button>
                  </td>
                  <td style={cellStyle}>
                    <button style={approveBtn}>APPROVE</button>
                    <button style={rejectBtn}>REJECT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button style={actionBtn}>Request Access</button>
            <button style={actionBtn}>Approve All</button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "82%",
              height: "88vh",
              backgroundColor: "white",
              borderRadius: "2vh",
              padding: "3%",
              position: "relative",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              // overflowY: "auto", // ✅ Removed scroll
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "1%",
                right: "2%",
                border: "none",
                background: "none",
                fontSize: "3.5vh",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2vh",
                }}
              >
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.4vh" }}>
                  {[
                    "Name",
                    "Registration Number",
                    "Email Address",
                    "Branch",
                    "Name of the Parent",
                    "Native",
                    "Parent's Mobile No",
                  ].map((label) => (
                    <div key={label} style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh" }}>
                      <label style={labelStyle}>{label}</label>
                      <input type="text" style={inputStyle} />
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.6vh" }}>
                  <div style={rowGroup}>
                    {["Year", "Section", "Gender"].map((field) => (
                      <div key={field} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={labelStyle}>{field}</label>
                        <input type="text" style={inputStyle} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh" }}>
                    <label style={labelStyle}>Counsellor</label>
                    <input type="text" style={inputStyle} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh" }}>
                    <label style={labelStyle}>Year Coordinator</label>
                    <input type="text" style={inputStyle} />
                  </div>

                  <div style={rowGroup}>
                    {["No. of Days", "From Date", "To Date"].map((field, idx) => (
                      <div key={field} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={labelStyle}>{field}</label>
                        <input type={idx === 0 ? "text" : "date"} style={inputStyle} />
                      </div>
                    ))}
                  </div>

                  <div style={rowGroup}>
                    {["Room No", "Leaving Date", "Leaving Time"].map((field, idx) => (
                      <div key={field} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={labelStyle}>{field}</label>
                        <input
                          type={idx === 0 ? "text" : idx === 1 ? "date" : "time"}
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh" }}>
                    <label style={labelStyle}>Reason for Leave</label>
                    <input type="text" style={inputStyle} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh", marginTop: "1%" }}>
                    <label style={labelStyle}>Parent’s Permission</label>
                    <input type="text" style={inputStyle} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "1vh",
                        marginLeft: "1vh",
                        gap: "0.8vh",
                        fontSize: "1.6vh",
                        textTransform: "uppercase",
                      }}
                    >
                      <label>
                        <input type="checkbox" /> Obtained Over Phone
                      </label>
                      <label>
                        <input type="checkbox" /> Has Come in Person
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh", marginTop: "1vh" }}>
                <label style={labelStyle}>Remarks</label>
                <input type="text" style={inputStyle} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const headerStyle = {
  backgroundColor: "white",
  padding: "10px",
  textAlign: "center",
};

const cellStyle = {
  padding: "9px",
  textAlign: "center",
};

const approveBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "5px",
  marginRight: "5%",
  cursor: "pointer",
};

const rejectBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const formBtn = {
  fontWeight: "bold",
  padding: "5px 15px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
};

const actionBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "10px 25px",
  borderRadius: "50px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
};

const labelStyle = {
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1.4vh",
  marginBottom: "1%",
};

const inputStyle = {
  padding: "1vh",
  border: "1px solid #aaa",
  borderRadius: "0.8vh",
  fontSize: "1.7vh",
};

const rowGroup = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1.5vh",
};

export default YearApprovalList;
