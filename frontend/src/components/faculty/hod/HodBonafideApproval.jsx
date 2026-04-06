import React, { useState, useEffect } from "react";
import axios from "axios";

const HodBonafideApproval = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [filterReg, setFilterReg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bonafide/hod/all");

      setStudentsData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approve = async (id) => {
    if (!window.confirm("Approve this application?")) return;

    try {
      await axios.put(`http://localhost:5000/api/bonafide/hod/approve/${id}`);

      setStudentsData(studentsData.filter((s) => s.ap_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (id) => {
    if (!window.confirm("Reject this application?")) return;

    try {
      await axios.put(`http://localhost:5000/api/bonafide/hod/reject/${id}`);

      setStudentsData(studentsData.filter((s) => s.ap_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const approveAll = async () => {
    if (studentsData.length === 0) return;

    if (!window.confirm("Approve ALL applications?")) return;

    try {
      await axios.put("http://localhost:5000/api/bonafide/hod/approve-all");

      fetchApplications(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const rejectAll = async () => {
    if (studentsData.length === 0) return;

    if (!window.confirm("Reject ALL applications?")) return;

    try {
      await axios.put("http://localhost:5000/api/bonafide/hod/reject-all");

      fetchApplications(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = studentsData.filter(
    (student) =>
      filterReg === "" ||
      student.Student?.regNo?.toString().includes(filterReg),
  );

  return (
    <div style={container}>
      <div style={content}>
        <div style={filterBox}>
          <input
            type="text"
            placeholder="Search Reg No"
            value={filterReg}
            onChange={(e) => setFilterReg(e.target.value)}
            style={search}
          />
        </div>

        <div style={tableBox}>
          <table style={table}>
            <thead>
              <tr>
                <th style={headerStyle}>S.NO</th>

                <th style={headerStyle}>NAME</th>

                <th style={headerStyle}>REG.NO</th>

                <th style={headerStyle}>TYPE</th>

                <th style={headerStyle}>FORM</th>

                <th style={headerStyle}>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.ap_id} style={row}>
                  <td style={cellStyle}>{index + 1}</td>

                  <td style={cellStyle}>{student.student?.studentName}</td>

                  <td style={cellStyle}>{student.student?.regNo}</td>

                  <td style={cellStyle}>Bonafide</td>

                  <td style={cellStyle}>
                    <button
                      style={formBtn}
                      onClick={() => {
                        setSelectedStudent(student);

                        setShowPopup(true);
                      }}
                    >
                      VIEW
                    </button>
                  </td>

                  <td style={cellStyle}>
                    <button
                      style={approveBtn}
                      onClick={() => approve(student.ap_id)}
                    >
                      APPROVE
                    </button>

                    <button
                      style={rejectBtn}
                      onClick={() => reject(student.ap_id)}
                    >
                      REJECT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Buttons */}

        {/* <div style={bottomBar}>
          <button style={approveAllBtn} onClick={approveAll}>
            APPROVE ALL
          </button>

          <button style={rejectAllBtn} onClick={rejectAll}>
            REJECT ALL
          </button>
        </div> */}
      </div>

      {/* Popup */}

      {showPopup && selectedStudent && (
        <div style={popupBg}>
          <div style={popup}>
            <button style={closeBtn} onClick={() => setShowPopup(false)}>
              ×
            </button>

            <div style={grid}>
              <div>
                <p>
                  <b>Name :</b>
                  {selectedStudent.student?.studentName}
                </p>

                <p>
                  <b>Reg No :</b>
                  {selectedStudent.student?.regNo}
                </p>

                <p>
                  <b>Department :</b>
                  {selectedStudent.student?.branch}
                </p>

                <p>
                  <b>Semester :</b>
                  {selectedStudent.semester}
                </p>

                <p>
                  <b>Father :</b>
                  {selectedStudent.fatherName}
                </p>
              </div>

              <div>
                <p>
                  <b>Reason :</b>
                  {selectedStudent.reason}
                </p>

                <p>
                  <b>City :</b>
                  {selectedStudent.city}
                </p>

                <p>
                  <b>State :</b>
                  {selectedStudent.state}
                </p>

                <p>
                  <b>Pincode :</b>
                  {selectedStudent.pincode}
                </p>

                <p>
                  <b>Category :</b>
                  {selectedStudent.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const container = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
};

const content = {
  flex: 1,
  backgroundColor: "rgba(238,238,238,0.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "1%",
};

const filterBox = {
  width: "90%",
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "2%",
};

const search = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const tableBox = {
  width: "90%",
  height: "65vh",
  backgroundColor: "#D9D9D9",
  borderRadius: "20px",
  overflowY: "auto",
  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  padding: "10px",
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 8px",
};

const headerStyle = {
  backgroundColor: "white",
  padding: "10px",
  textAlign: "center",
};

const row = {
  backgroundColor: "white",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
};

const cellStyle = {
  padding: "10px",
  textAlign: "center",
};

const approveBtn = {
  fontWeight: "bold",
  padding: "8px 12px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "6px",
  marginRight: "5px",
  cursor: "pointer",
};

const rejectBtn = {
  fontWeight: "bold",
  padding: "8px 12px",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const formBtn = {
  fontWeight: "bold",
  padding: "8px 15px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
};

const bottomBar = {
  width: "90%",
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "15px",
  gap: "10px",
};

const approveAllBtn = {
  backgroundColor: "#1E2E4F",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  fontWeight: "bold",
  cursor: "pointer",
};

const rejectAllBtn = {
  backgroundColor: "#c62828",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "20px",
  fontWeight: "bold",
  cursor: "pointer",
};

const popupBg = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popup = {
  width: "60%",
  background: "white",
  borderRadius: "10px",
  padding: "30px",
  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "20px",
  border: "none",
  background: "none",
  fontSize: "25px",
  cursor: "pointer",
};

export default HodBonafideApproval;
