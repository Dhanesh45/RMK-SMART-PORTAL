import React from "react";

const YearApprovalList = () => {
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
        overflow: "hidden", // prevent scroll
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          height: "10vh",
          width: "100%",
          background: "#2c3e50",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        NAV BAR
      </div>

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
        {/* Heading + Dropdown */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent:"flex-end",
            marginBottom: "2%",
          }}
        >
                  

          {/* Dropdown */}
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

        {/* Table Container */}
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
                    <button style={formBtn}>VIEW FORM</button>
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
            {/* Request Access */}
            <button
              style={{
                backgroundColor: "#3b4b75",
                color: "white",
                border: "none",
                padding: "10px 25px",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Request Access
            </button>

            {/* Approve All */}
            <button
              style={{
                backgroundColor: "#3b4b75",
                color: "white",
                border: "none",
                padding: "10px 25px",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Approve All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header style
const headerStyle = {
  backgroundColor: "white",
  padding: "10px",
  textAlign: "center",
};

// Cell style
const cellStyle = {
  padding: "9px",
  textAlign: "center",
};

// Buttons
const approveBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "5px",
  marginRight: "5%",
};

const rejectBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "5px",
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

export default YearApprovalList;
