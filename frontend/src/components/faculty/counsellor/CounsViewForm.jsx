import React, { useState } from "react";

const CounsViewForm = () => {
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
          fontSize: "2.2vh",
        }}
      >
        NAV BAR
      </div>

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
            height: "85vh",
            border: "8px solid rgba(217,217,217,1)",
            borderRadius: "2vh",
            backgroundColor: "rgba(217,217,217,1)",
            padding: "1%",
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
                <th
                  style={{
                    backgroundColor: "white",
                    padding: "1vh",
                    textAlign: "center",
                    fontSize: "2vh",
                  }}
                >
                  S.NO
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    padding: "1vh",
                    textAlign: "center",
                    fontSize: "2vh",
                  }}
                >
                  NAME
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    padding: "1vh",
                    textAlign: "center",
                    fontSize: "2vh",
                  }}
                >
                  NO OF STUDENTS
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    padding: "1vh",
                    textAlign: "center",
                    fontSize: "2vh",
                  }}
                >
                  REMARK
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    padding: "1vh",
                    textAlign: "center",
                    fontSize: "2vh",
                  }}
                >
                  FORM DETAILS
                </th>
                <th
                  style={{
                    backgroundColor: "white",
                    padding: "1vh",
                    textAlign: "center",
                    fontSize: "2vh",
                  }}
                >
                  VALIDATION
                </th>
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
                  <td style={{ padding: "1vh", textAlign: "center" }}>
                    {student.sno}
                  </td>
                  <td style={{ padding: "1vh", textAlign: "center" }}>
                    {student.name}
                  </td>
                  <td style={{ padding: "1vh", textAlign: "center" }}>
                    {student.nof}
                  </td>
                  <td style={{ padding: "1vh", textAlign: "center" }}>
                    <input
                      placeholder="Enter remark"
                      style={{
                        padding: "1vh",
                        width: "90%",
                        border: "1px solid black",
                        borderRadius: "1vh",
                        textAlign: "center",
                      }}
                    />
                  </td>
                  <td style={{ padding: "1vh", textAlign: "center" }}>
                    <button
                      style={{
                        fontWeight: "bold",
                        padding: "1vh 3vh",
                        color: "white",
                        backgroundColor: "#3b4b75",
                        border: "none",
                        borderRadius: "3vh",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowPopup(true)}
                    >
                      VIEW FORM
                    </button>
                  </td>
                  <td style={{ padding: "1vh", textAlign: "center" }}>
                    <button
                      style={{
                        fontWeight: "bold",
                        padding: "1vh 3vh",
                        color: "white",
                        backgroundColor: "#3b4b75",
                        border: "none",
                        borderRadius: "3vh",
                        marginRight: "1vh",
                        cursor: "pointer",
                      }}
                    >
                      APPROVE
                    </button>
                    <button
                      style={{
                        fontWeight: "bold",
                        padding: "1vh 3vh",
                        color: "white",
                        backgroundColor: "#d9534f",
                        border: "none",
                        borderRadius: "3vh",
                        cursor: "pointer",
                      }}
                    >
                      REJECT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5vh",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2vh",
                }}
              >
                {/* Left column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.9%" }}>
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
                      <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                        {label}
                      </label>
                      <input
                        type="text"
                        style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Right column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
                  {/* Year, Section, Gender */}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5vh" }}>
                    {["Year", "Section", "Gender"].map((field) => (
                      <div key={field} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                          {field}
                        </label>
                        <input type="text" style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                      </div>
                    ))}
                  </div>

                  {/* Counsellor */}
                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh" }}>
                    <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                      Counsellor
                    </label>
                    <input type="text" style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                  </div>

                  {/* Year Coordinator */}
                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh" }}>
                    <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                      Year Coordinator
                    </label>
                    <input type="text" style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                  </div>

                  {/* No. of Days, From Date, To Date */}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5vh" }}>
                    {["No. of Days", "From Date", "To Date"].map((field, idx) => (
                      <div key={field} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                          {field}
                        </label>
                        <input type={idx === 0 ? "text" : "date"} style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                      </div>
                    ))}
                  </div>

                  {/* Room No, Leaving Date, Leaving Time */}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1.5vh" }}>
                    {["Room No", "Leaving Date", "Leaving Time"].map((field, idx) => (
                      <div key={field} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                          {field}
                        </label>
                        <input type={idx === 0 ? "text" : idx === 1 ? "date" : "time"} style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                      </div>
                    ))}
                  </div>

                  {/* Reason for Leave */}
                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh" }}>
                    <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                      Reason for Leave
                    </label>
                    <input type="text" style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                  </div>

                  {/* Parent’s Permission */}
                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh", marginTop: "1%" }}>
                    <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                      Parent’s Permission
                    </label>
                    <input type="text" style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "1vh", marginLeft: "1vh", gap: "0.8vh", fontSize: "1.6vh", textTransform: "uppercase" }}>
                      <label>
                        <input type="checkbox" /> Obtained Over Phone
                      </label>
                      <label>
                        <input type="checkbox" /> Has Come in Person
                      </label>
                    </div>
                  </div>

                  {/* Remarks full width */}
                  <div style={{ display: "flex", flexDirection: "column", fontSize: "1.6vh", marginTop: "2vh" }}>
                    <label style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "1.4vh", marginBottom: "1%" }}>
                      Remarks
                    </label>
                    <input type="text" style={{ padding: "1vh", border: "1px solid #aaa", borderRadius: "0.8vh", fontSize: "1.7vh" }} />
                  </div>

                  {/* Buttons */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3vh", gap: "2vh" }}>
                    <button
                      style={{
                        fontWeight: "bold",
                        padding: "1vh 3vh",
                        color: "white",
                        backgroundColor: "#3b4b75",
                        border: "none",
                        borderRadius: "1vh",
                        cursor: "pointer",
                      }}
                    >
                      APPROVE
                    </button>
                    <button
                      style={{
                        fontWeight: "bold",
                        padding: "1vh 3vh",
                        color: "white",
                        backgroundColor: "#d9534f",
                        border: "none",
                        borderRadius: "1vh",
                        cursor: "pointer",
                      }}
                    >
                      REJECT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsViewForm;
