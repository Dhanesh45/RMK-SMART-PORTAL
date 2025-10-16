import React, { useState } from "react";

const CounsApprovalList = () => {
  const [showPopup, setShowPopup] = useState(false);

  const students = [
    { sno: 1, nof: 20, name: "Nandhini" },
    { sno: 2, nof: 20, name: "Shobana" },
    { sno: 3, nof: 20, name: "Saravanan" },
    { sno: 4, nof: 20, name: "Vijayaraj" },
    { sno: 5, nof: 20, name: "Akila" },
    { sno: 6, nof: 20, name: "Rajitha" },
    { sno: 7, nof: 20, name: "Rekha" },
    { sno: 8, nof: 20, name: "Kanniga" },
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
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(238,238,238,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "rgba(14,73,71,1)",
            fontSize: "2.2vh",
            fontWeight: "bolder",
            margin: "2vh 0",
          }}
        >
          COUNSELLOR APPROVAL LIST
        </h1>

        <div
          style={{
            width: "90%",
            height: "75vh",
            border: "8px solid rgba(217,217,217,1)",
            borderRadius: "2vh",
            backgroundColor: "rgba(217,217,217,1)",
            padding: "0% 0.5% 0% 0.5%",
          }}
        >
          <table
            style={{
              width: "100%",
              height: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>S.NO</th>
                <th style={headerStyle}>NAME</th>
                <th style={headerStyle}>NO OF STUDENTS</th>
                <th style={headerStyle}>REMARK</th>
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
                  <td style={cellStyle}>{student.nof}</td>
                  <td style={cellStyle}>
                    <input
                      style={{
                        padding: "5px",
                        width: "90%",
                        border: "1px solid black",
                        borderRadius: "5px",
                        textAlign: "center",
                      }}
                      placeholder="Enter remark"
                    />
                  </td>
                  <td style={cellStyle}>
                    <button style={viewBtn} onClick={() => setShowPopup(true)}>
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

          {/* Approve All Button */}
          <div style={{ textAlign: "end", marginTop: "2%" }}>
            <button style={approveAllBtn}>Approve All</button>
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
            minHeight: "100vh", // Let it grow vertically
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            overflow: "visible", // <-- Removed internal scrolling
          }}
        >
          <div
            style={{
              width: "82%",
              backgroundColor: "white",
              borderRadius: "2vh",
              padding: "3%",
              position: "relative",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
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

            {/* Popup Form Content */}
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
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "1.6vh",
                      }}
                    >
                      <label style={labelStyle}>{label}</label>
                      <input type="text" style={inputStyle} />
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.6vh" }}>
                  <div style={rowGroup}>
                    {["Year", "Section", "Gender"].map((field) => (
                      <div
                        key={field}
                        style={{ flex: 1, display: "flex", flexDirection: "column" }}
                      >
                        <label style={labelStyle}>{field}</label>
                        <input type="text" style={inputStyle} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Counsellor</label>
                    <input type="text" style={inputStyle} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
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

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Reason for Leave</label>
                    <input type="text" style={inputStyle} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", marginTop: "1%" }}>
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

              {/* Remarks - full width */}
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
  fontSize: "2vh",
  fontWeight: "bold",
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

const viewBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
};

const approveAllBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "1% 4%",
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

export default CounsApprovalList;
