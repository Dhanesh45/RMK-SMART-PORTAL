import React, { useState } from "react";

const CounsApprovalList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { sno: 1, nof: 111723203001, name: "AKASH" },
    { sno: 2, nof: 111723203002, name: "ABISHEK" },
    { sno: 3, nof: 111723203003, name: "ARULJOTHEE" },
    { sno: 4, nof: 111723203004, name: "SARAVANAN" },
    { sno: 5, nof: 111723203005, name: "DHINESH" },
    { sno: 6, nof: 111723203006, name: "DHANRAJ" },
    { sno: 7, nof: 111723203007, name: "JAGADISH" },
    { sno: 8, nof: 111723203008, name: "GOKUL" },
  ];

  const dayScholars = ["AKASH", "ABISHEK", "GOKUL"];

  const handleViewForm = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
  };

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
                <th style={headerStyle}>REG NO</th>
                <th style={headerStyle}>ACCOMODATION</th>
                <th style={headerStyle}>FORM DETAILS</th>
                <th style={headerStyle}>VALIDATION</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const isDayScholar = dayScholars.includes(student.name);
                const accommodation = isDayScholar ? "Dayscholar" : "Hosteller";

                return (
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
                    <td style={cellStyle}>{accommodation}</td>
                    <td style={cellStyle}>
                      <button
                        style={viewBtn}
                        onClick={() => handleViewForm(student)}
                      >
                        VIEW FORM
                      </button>
                    </td>
                    <td style={cellStyle}>
                      <button style={approveBtn}>APPROVE</button>
                      <button style={rejectBtn}>REJECT</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Approve All Button */}
          <div style={{ textAlign: "end", marginTop: "2%" }}>
            <button style={approveAllBtn}>Approve All</button>
          </div>
        </div>
      </div>

      {/* POPUP CONTENT */}
      {showPopup && selectedStudent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            minHeight: "100vh",
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
              backgroundColor: "white",
              borderRadius: "2vh",
              padding: "3%",
              position: "relative",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              maxHeight: "90vh",
              overflowY: "auto",
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
              onClick={closePopup}
            >
              ×
            </button>

            {dayScholars.includes(selectedStudent.name) ? (
              <DayScholarForm />
            ) : (
              <HostellerForm />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* 🏠 Fixed Hosteller Form (layout like 1st image) */
const HostellerForm = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
    <h2 style={{ textAlign: "center", color: "#0d3b66" }}>Hosteller Outpass Form</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5vh 2vh",
        alignItems: "center",
      }}
    >
      {[
        "Name",
        "Year",
        "Section",
        "Gender",
        "Registration Number",
        "Counsellor",
        "Email Address",
        "Year Coordinator",
        "Branch",
        "No. of Days",
        "From Date",
        "To Date",
        "Name of the Parent",
        "Room No",
        "Leaving Date",
        "Leaving Time",
        "Native",
        "Reason for Leave",
        "Parent's Mobile No",
        "Parent's Permission",
        "Remarks",
      ].map((label) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            gridColumn:
              ["Reason for Leave", "Parent's Permission","Remarks"].includes(label)
                ? "span 2"
                : "auto",
          }}
        >
          <label style={labelStyle}>{label}</label>
          <input
            type={
              label.includes("Date")
                ? "date"
                : label.includes("Time")
                ? "time"
                : "text"
            }
            style={inputStyle}
          />
        </div>
      ))}
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "1vh",
        fontSize: "1.6vh",
        gap: "0.8vh",
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
);

/* 🚌 Day Scholar Form (unchanged) */
const DayScholarForm = () => (
  <div style={{ display: "flex", gap: "5%", height: "100%" }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: "2vh" }}>NAME OF THE STUDENT</label>
      <input type="text" style={inputField} />

      <label style={{ fontSize: "2vh" }}>REGISTER NUMBER</label>
      <input type="text" style={inputField} />

      <label style={{ fontSize: "2vh" }}>BRANCH</label>
      <input type="text" style={inputField} />

      <div style={{ display: "flex", gap: "5%" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>YEAR</label>
          <select style={selectStyle}>
            <option value="">SELECT</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>SECTION</label>
          <select style={selectStyle}>
            <option value="">SELECT</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: "5%" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>DATE</label>
          <input type="date" style={selectStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>TIME</label>
          <input type="time" style={selectStyle} />
        </div>
      </div>

      <label style={{ fontSize: "2vh" }}>PURPOSE OF LEAVING</label>
      <input type="text" style={inputField} />
    </div>

    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: "2vh" }}>NAME OF THE COUNSELLOR</label>
      <input type="text" style={inputField} />

      <label style={{ fontSize: "2vh" }}>NAME OF THE PARENT</label>
      <input type="text" style={inputField} />

      <label style={{ fontSize: "2vh" }}>CONTACT NUMBER OF THE PARENT</label>
      <input type="number" style={inputField} />

      <label style={{ fontSize: "2vh" }}>PARENT PERMISSION</label>
      <select style={inputField}>
        <option value="">SELECT</option>
        <option value="Phone">OBTAINED OVER PHONE</option>
        <option value="InPerson">HAS COME IN PERSON</option>
      </select>

      <label style={{ fontSize: "2vh" }}>REMARKS</label>
      <input type="text" style={inputField} />

      <button style={submitBtn}>SUBMIT</button>
    </div>
  </div>
);

/* 🎨 Styles */
const headerStyle = {
  backgroundColor: "white",
  padding: "10px",
  textAlign: "center",
  fontSize: "2vh",
  fontWeight: "bold",
};

const cellStyle = { padding: "9px", textAlign: "center" };
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
const inputField = {
  width: "100%",
  padding: "2%",
  marginBottom: "2%",
  borderRadius: "1vh",
  border: "0.2vh solid #ccc",
};
const selectStyle = { ...inputField, padding: "3%" };
const submitBtn = {
  padding: "1.5% 4%",
  fontSize: "2vh",
  fontWeight: "bold",
  backgroundColor: "#0d3b66",
  color: "white",
  border: "none",
  borderRadius: "5vh",
  cursor: "pointer",
  alignSelf: "flex-end",
  marginTop: "auto",
};

export default CounsApprovalList;
