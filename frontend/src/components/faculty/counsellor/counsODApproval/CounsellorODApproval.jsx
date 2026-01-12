import React, { useState, useEffect } from "react";
import axios from "axios";
import CounsOutPass from "./CounsOutPass";
import CounsOnDuty from "./CounsOnDuty";

const CounsellorODApproval = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeForm, setActiveForm] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchCounsellorOD = async () => {
      try {
        const email = localStorage.getItem("facultyEmail");
        if (!email) return;

        // 🔹 get facultyId
        const facultyRes = await axios.get(
          `http://localhost:5000/api/faculty/email/${email}`
        );
        const facultyId = facultyRes.data.f_id;

        // 🔹 fetch hosteller OD
        const hostellerRes = await axios.get(
          `http://localhost:5000/api/od/counsellor/${facultyId}`
        );

        const hostellerMapped = hostellerRes.data.ODhosteller.map(
          (od, index) => ({
            sno: index + 1,
            nof: od.regNo,
            name: od.studentName || "—",
            od_id: od.od_id,
            type: "HOSTELLER",
          })
        );

        // 🔹 fetch dayscholar OD
        const dayscholarRes = await axios.get(
          `http://localhost:5000/api/dayscholar-od/counsellor/${facultyId}`
        );

        const dayscholarMapped = dayscholarRes.data.ODdayscholar.map(
          (od, index) => ({
            sno: hostellerMapped.length + index + 1,
            nof: od.regNo,
            name: od.studentName || "—",
            od_id: od.od_id,
            type: "DAYSCHOLAR",
          })
        );

        setStudents([...hostellerMapped, ...dayscholarMapped]);
      } catch (err) {
        console.error("Error fetching counsellor OD list", err);
      }
    };

    fetchCounsellorOD();
  }, []);

  // 🔹 APPROVE
  const handleApprove = async (student) => {
    const url =
      student.type === "HOSTELLER"
        ? `http://localhost:5000/api/od/approve/od/${student.od_id}`
        : `http://localhost:5000/api/dayscholar-od/cstatus/${student.od_id}`;

    await axios.put(url, { action: "approve" });

    setStudents((prev) =>
      prev.filter((s) => s.od_id !== student.od_id)
    );
  };
const handleApproveAll = async () => {
  try {
    await Promise.all(
      students.map((student) => {
        const url =
          student.type === "HOSTELLER"
        ? `http://localhost:5000/api/od/approve/od/${student.od_id}`
        : `http://localhost:5000/api/dayscholar-od/cstatus/${student.od_id}`;

        return axios.put(url, { action: "approve" });
      })
    );

    // clear all approved requests from UI
    setStudents([]);
  } catch (error) {
    console.error("Approve all failed", error);
  }
};
  // 🔹 REJECT
  const handleReject = async (student) => {
    const url =
      student.type === "HOSTELLER"
        ? `http://localhost:5000/api/od/approve/od/${student.od_id}`
        : `http://localhost:5000/api/dayscholar-od/cstatus/${student.od_id}`;

    await axios.put(url, { action: "reject" });

    setStudents((prev) =>
      prev.filter((s) => s.od_id !== student.od_id)
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, backgroundColor: "rgba(238, 238, 238, 0.5)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2%" }}>
        <div style={{ width: "90%", height: "10vh", display: "flex", justifyContent: "flex-end" }} />

        <div style={{ width: "90%", height: "65vh", backgroundColor: "rgba(217, 217, 217, 1)", border: "0.4% solid rgba(217, 217, 217,1)", borderRadius: "1%", padding: "0.8%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "grid", gridTemplateColumns: "8% 18% 20% 20% 17% 17%", backgroundColor: "white", fontWeight: "bold", textAlign: "center", padding: "0.8%", borderRadius: "0.5vh", marginBottom: "0.8%" }}>
            <div>S.NO</div>
            <div>NAME</div>
            <div>REG.NO</div>
            <div>OUTPASS DETAILS</div>
            <div>ONDUTY DETAILS</div>
            <div>VALIDATION</div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {students.map((student) => (
              <div key={student.sno} style={{ display: "grid", gridTemplateColumns: "8% 18% 20% 20% 17% 17%", alignItems: "center", backgroundColor: "white", borderRadius: "1vh", padding: "0.8%", marginBottom: "0.8%" }}>
                <div style={cardCell}>{student.sno}</div>
                <div style={cardCell}>{student.name}</div>
                <div style={cardCell}>{student.nof}</div>
                <div style={cardCell}>
                  <button style={formBtn} onClick={() => { setShowPopup(true); setActiveForm("outpass"); }}>
                    OUTPASS
                  </button>
                </div>
                <div style={cardCell}>
                  <button style={formBtn} onClick={() => { setShowPopup(true); setActiveForm("onduty"); }}>
                    ONDUTY
                  </button>
                </div>
                <div style={cardCell}>
                  <button style={approveBtn} onClick={() => handleApprove(student)}>APPROVE</button>
                  <button style={rejectBtn} onClick={() => handleReject(student)}>REJECT</button>
                </div>
              </div>
            ))}
          </div>
        </div>
         <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "auto",
            width: "90%",
          }}
        >
          <button style={bottomBtn}>Request Access</button>
          <button style={bottomBtn} onClick={() => handleApproveAll()}>Approve All</button>
        </div>
      </div>

      {showPopup && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ backgroundColor: "white", borderRadius: "10px", width: "80%", height: "90%", padding: "1%", position: "relative" }}>
            <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: "10px", right: "20px" }}>✕</button>
            {activeForm === "outpass" && <CounsOutPass isPopup />}
            {activeForm === "onduty" && <CounsOnDuty isPopup />}
          </div>
          
        </div>
      )}
    </div>
  );
};

const cardCell = { textAlign: "center", fontSize: "90%" };
const formBtn = { fontWeight: "bold", padding: "0.7% 5%", color: "white", backgroundColor: "#3b4b75", border: "none", borderRadius: "8%", cursor: "pointer" };
const approveBtn = { fontWeight: "bold", padding: "1% 3%", color: "white", backgroundColor: "#3b4b75", border: "none", borderRadius: "12%", marginRight: "1%" };
const rejectBtn = { fontWeight: "bold", padding: "1% 2%", color: "white", backgroundColor: "#d9534f", border: "none", borderRadius: "8%" };
const bottomBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "1% 3%",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "100%",
  fontWeight: "bold",
};
export default CounsellorODApproval;
