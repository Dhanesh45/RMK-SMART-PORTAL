import React, { useState, useEffect } from "react";
import axios from "axios";
// Main Component
const HodApprovalList = () => {
  const [showPopup, setShowPopup] = useState(false);
    const [students, setStudents] = useState([]);
    const [filterType, setFilterType] = useState("");
const [filterReg, setFilterReg] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
        const email = localStorage.getItem("facultyEmail");
        if (!email) {
          console.error("Faculty email not found");
          return;
        }

        /* 🔹 1. GET FACULTY ID */
        const facultyRes = await axios.get(
          `http://localhost:5000/api/faculty/email/${email}`
        );

        const facultyId = facultyRes.data.f_id;
        console.log("Faculty response:", facultyRes.data);
      
        if (!facultyId) {
          console.error("Faculty ID not found");
          return;
        }

        /* 🔹 2. HOSTELLER OUTPASSES */
        const hostellerRes = await axios.get(
          `http://localhost:5000/api/outpass/hod/${facultyId}`
        );
        


        const hostellerMapped = hostellerRes.data.outpasses.map((op, index) => ({
          sno: index + 1,
          outpassId: op.outpassId,
          name: op.studentName,
          reg: op.regNo,
          couns: op.counsellorName,
          type: "HOSTELLER",
          fullData: op,
        }));

        /* 🔹 3. DAY SCHOLAR OUTPASSES */
        const dayScholarRes = await axios.get(
          `http://localhost:5000/api/dayscholarOutpass/hod/${facultyId}`
        );

        const dayScholarMapped = dayScholarRes.data.outpasses.map((op, index) => ({
          sno: hostellerMapped.length + index + 1,
          outpassId: op.dayscholaroutpassId,
          name: op.studentName,
          reg: op.regNo,
          couns: op.counsellorName || "N/A",
          type: "DAYSCHOLAR",
          fullData: op,
        }));

        /* 🔹 4. MERGE */
        setStudents([...hostellerMapped, ...dayScholarMapped]);

      } catch (err) {
        console.error("Error fetching hod coordinator outpasses", err);
      }
    };

    fetchOutpasses();
  }, []);

 
  /* ===========================
     APPROVE / REJECT
  =========================== */
 const handleApprove = async (student) => {
  const url =
    student.type === "HOSTELLER"
      ? `http://localhost:5000/api/outpass/hod/update/${student.outpassId}`
      : `http://localhost:5000/api/dayscholarOutpass/hod/update/${student.outpassId}`;

  await axios.put(url, { action: "approve" });

  setStudents((prev) =>
    prev.filter((s) => s.outpassId !== student.outpassId)
  );
};
const handleReject = async (student) => {
  const url =
    student.type === "HOSTELLER"
      ? `http://localhost:5000/api/outpass/hod/update/${student.outpassId}`
      : `http://localhost:5000/api/dayscholarOutpass/hod/update/${student.outpassId}`;

  await axios.put(url, { action: "reject" });

  setStudents((prev) =>
    prev.filter((s) => s.outpassId !== student.outpassId)
  );
};
const filteredStudents = students.filter((student) => {
  return (
    (filterType === "" || student.type === filterType) &&
    (filterReg === "" || student.reg.includes(filterReg))
  );
});

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
        {/* Filter Section */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            marginBottom: "2%",
          }}
        >
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "1% 2%",
              borderRadius: "1vh",
              border: "1px solid #ccc",
              fontSize: "2vh",
            }}
          >
            <option value="">All Types</option>
            <option value="Bonafide">Bonafide</option>
            <option value="Fee Receipt">Fee Receipt</option>
          </select>

          <input
            type="text"
            placeholder="Search Reg No"
            value={filterReg}
            onChange={(e) => setFilterReg(e.target.value)}
            style={{
              padding: "1% 2%",
              borderRadius: "1vh",
              border: "1px solid #ccc",
              fontSize: "2vh",
            }}
          />
        </div>

        {/* Table */}
        <div
          style={{
            width: "90%",
            height: "65vh",
            backgroundColor: "#D9D9D9",
            marginRight: "auto",
            marginLeft: "auto",
            borderRadius: "20px",
            overflowY: "auto",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            padding: "0px 10px 3px 10px",
            borderTop: "8px solid #D9D9D9",
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
                <th style={headerStyle}>REG.NO</th>
                {/* <th style={headerStyle}>TYPE</th> */}
                <th style={headerStyle}>FORM DETAILS</th>
                <th style={headerStyle}>VALIDATION</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
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
                  {/* <td style={cellStyle}>{student.couns}</td> */}
                  <td style={cellStyle}>
                    <button style={formBtn} onClick={() =>{
                       setSelectedStudent(student.fullData);
                        setShowPopup(true);}}>
                      VIEW FORM
                    </button>
                  </td>
                  <td style={cellStyle}>
                    <button style={approveBtn}   onClick={() => handleApprove(student)}>APPROVE</button>
                    <button style={rejectBtn} onClick={() => handleReject(student)}>REJECT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Button */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "90%",
            alignItems: "flex-end",
            height: "10%",
          }}
        >
          <button
            style={{
              backgroundColor: "#3b4b75",
              color: "white",
              border: "none",
              padding: "0.75% 2% ",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Approve All
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && selectedStudent &&(
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

            {/* Popup Form Fields */}
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
                        <input type={idx === 0 ? "text" : idx === 1 ? "date" : "time"} style={inputStyle} />
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
  position: "sticky",
  top: 0,
  zIndex: 1,
  padding: "0.75%",
  textAlign: "center",
};

const cellStyle = {
  padding: "0.7%",
  textAlign: "center",
};

const approveBtn = {
  fontWeight: "bold",
  padding: "1% 2%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "1vh",
  marginRight: "5%",
  cursor: "pointer",
};

const rejectBtn = {
  fontWeight: "bold",
  padding: "1% 2%",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "1vh",
  cursor: "pointer",
};

const formBtn = {
  fontWeight: "bold",
  padding: "2% 4%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "3vh",
  cursor: "pointer",
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

export default HodApprovalList;
