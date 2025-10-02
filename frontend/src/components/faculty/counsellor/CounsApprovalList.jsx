import React from "react";

const CounsApprovalList = () => {
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
        overflow: "hidden", // ❌ no page scroll
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
          flex: 1, // take remaining height (90vh)
          backgroundColor: "rgba(238, 238, 238, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margintop: "3%",
        }}
      >
        <h1
          style={{
            color: "rgba(14, 73, 71, 1)",
            fontSize: "20px",
            fontWeight: "bolder",
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          COUNSELLOR APPROVAL LIST
        </h1>

        {/* Table Container */}
        <div
          style={{
            width: "90%",
            height: "75vh", // fixed height
            border: "8px solid rgba(217, 217, 217,1)",
            borderRadius: "10px",
            backgroundColor: "rgba(217, 217, 217, 1)",
           padding: "0% 0.5% 0% 0.5%"
             // ✅ equal spacing on all sides
    
    //  flexDirection: "column",
    // justifyContent: "space-between",
          }}
        >
          <table
            style={{
              width: "100%",
              height: "100%", // table fits container
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
                    <button style={approveBtn}>APPROVE</button>
                    <button style={rejectBtn}>REJECT</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
                  <div style={{ textAlign: "end", marginTop: "2%" }}>
          <button
            style={{
              backgroundColor: "#3b4b75",
              color: "white",
              border: "none",
              padding: "1% 4%",
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

export default CounsApprovalList;
