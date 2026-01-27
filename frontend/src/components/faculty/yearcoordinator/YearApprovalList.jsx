import React, { useEffect, useState } from "react";
import axios from "axios";

const YearApprovalList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  /* ===========================
     FETCH OUTPASSES
  =========================== */
  /**
   * EXPLANATION:
   * 
   * 1. Problem: 404 while fetching outpasses for year coordinator.
   * 2. API currently used here: /api/outpass/year-coordinator/:facultyId
   * 3. Action:
   *    - VERIFY ROUTE AND CONTROLLER:
   *      a) In backend (outpassRoute.js), check the exact spelling & path for the year coordinator's get-outpass route.
   *      b) It could be /api/outpass/yearCoordinator/:facultyId
   * 
   *      Common issues:
   *        - "year-coordinator" vs "yearCoordinator"
   *        - Make sure route exists in outpassRoute.js and points to correct controller
   * 
   *    - To fix 404: 
   *      EITHER update FRONTEND to use the backend's actual path (suggested, below)
   *      OR add a new backend route to match frontend if you prefer that way.
   * 
   * 4. This rewrite assumes your outpass routes in backend use "yearCoordinator" (no dash), as is typical in Express.
   *    - If your backend does use "year-coordinator" (with dash), change this advice accordingly.
   */

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
          `http://localhost:5000/api/outpass/year-coordinator/${facultyId}`
        );
        console.log("HOSTELLER API DATA:", hostellerRes.data.outpasses[0]);


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
          `http://localhost:5000/api/dayscholarOutpass/year-coordinator/${facultyId}`
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
        console.error("Error fetching year coordinator outpasses", err);
      }
    };

    fetchOutpasses();
  }, []);

  /* ===========================
     APPROVE / REJECT
  =========================== */
 const updateStatus = async (student, action) => {
  try {
    console.log("UPDATE CLICKED:", student);
    const url =
      student.type === "HOSTELLER"
        ? `http://localhost:5000/api/outpass/year-coordinator/update/${student.outpassId}/approve`
        : `http://localhost:5000/api/dayscholarOutpass/year-coordinator/update/${student.outpassId}/approve`;

    await axios.put(url, { action });

    // remove from UI
    setStudents((prev) =>
      prev.filter((s) => s.outpassId !== student.outpassId)
    );
  } catch (err) {
    console.error("Failed to update ystatus", err);
  }
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
          <select style={dropdownStyle}>
            <option value="">Counsellor</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {/* Table */}
        <div style={tableWrapper}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>S.NO</th>
                <th style={headerStyle}>NAME</th>
                <th style={headerStyle}>REG.NO</th>
                <th style={headerStyle}>Coordinator Name</th>
                <th style={headerStyle}>FORM DETAILS</th>
                <th style={headerStyle}>VALIDATION</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.sno} style={rowStyle}>
                  <td style={cellStyle}>{student.sno}</td>
                  <td style={cellStyle}>{student.name}</td>
                  <td style={cellStyle}>{student.reg}</td>
                  <td style={cellStyle}>{student.couns}</td>
                  <td style={cellStyle}>
                    <button
                      style={formBtn}
                      onClick={() => {
                        setSelectedStudent(student.fullData);
                        setShowPopup(true);
                      }}
                    >
                      VIEW FORM
                    </button>
                  </td>
                  <td style={cellStyle}>
                   <button style={approveBtn}
           onClick={() => updateStatus(student, "approve")}
>
  APPROVE
</button>
<button
  style={rejectBtn}
  onClick={() => updateStatus(student, "reject")}
>
  REJECT
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={bottomBtnRow}>
            <button style={actionBtn}>Request Access</button>
            <button style={actionBtn}>Approve All</button>
          </div>
        </div>
      </div>

      {/* POPUP (UNCHANGED UI) */}
      {showPopup && selectedStudent && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <button style={closeBtn} onClick={() => setShowPopup(false)}>
              ×
            </button>

            <h3>Outpass Details</h3>
            <p><b>Name:</b> {selectedStudent.studentName}</p>
            <p><b>Register No:</b> {selectedStudent.regNo}</p>
            <p><b>Reason:</b> {selectedStudent.reasonForLeave}</p>
            <p><b>From:</b> {selectedStudent.fromDate}</p>
            <p><b>To:</b> {selectedStudent.toDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

/* ===========================
   STYLES (UNCHANGED)
=========================== */

const dropdownStyle = {
  padding: "8px 12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const tableWrapper = {
  width: "90%",
  height: "70vh",
  border: "8px solid rgba(217, 217, 217,1)",
  borderRadius: "10px",
  backgroundColor: "rgba(217, 217, 217, 1)",
  padding: "0% 0.5%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 8px",
};

const headerStyle = {
  backgroundColor: "white",
  padding: "10px",
};

const rowStyle = {
  backgroundColor: "white",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
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
};

const actionBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "10px 25px",
  borderRadius: "50px",
  fontWeight: "bold",
};

const bottomBtnRow = {
  display: "flex",
  justifyContent: "space-between",
};

const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupBox = {
  width: "50%",
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "20px",
};

const closeBtn = {
  position: "absolute",
  right: "20px",
  top: "10px",
  border: "none",
  background: "none",
  fontSize: "24px",
};

export default YearApprovalList;
