import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const approveBtn = {
  padding: "10px 40px",
  backgroundColor: "#1E2E4F",
  color: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
};

const Outpass = ({regNo:passedRegNo}) => {
  const location = useLocation();
  const [regNo, setRegNo] = useState(passedRegNo||location.state?.regNo || "");
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({
    roomNumber: "",
    noOfDays: "",
    fromDate: "",
    toDate: "",
    reasonForLeave: "",
    forOd: "No",
    leavingDate: "",
    leavingTime: "",
  });

  const fetchStudent = async (reg = regNo) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/outpass/${reg}`);
      setStudent(res.data);
    } catch {
      alert("❌ Student not found");
    }
  };

  useEffect(() => {
    if (regNo) {
      fetchStudent(regNo);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/outpass", {
        regNo,
        ...form,
      });
      alert("✅ Outpass submitted!");
    } catch (err) {
      alert("❌ Failed to submit");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // so it doesn’t stick to the middle of viewport
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        paddingTop: "10vh", // space for navbar
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "2%",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
          overflowY: "auto",
          minHeight: "85vh",
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "3vh",
            fontWeight: "bold",
            marginBottom: "1%",
          }}
        >
          <h3>OUTPASS</h3>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Row 1 */}
          <div style={{ width: "95%" }}>
            <label>REGISTRATION NUMBER</label>
            <input
              type="text"
              style={inputStyle}
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
          </div>

          {student && (
            <>
              <div style={{ width: "95%" }}>
                <label>NAME</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={student.studentName}
                  disabled
                />
              </div>

              {/* Row 2 */}
              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ flex: 1 }}>
                  <label>YEAR</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={student.year}
                    disabled
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>BRANCH</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={student.branch}
                    disabled
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>ROOM NO</label>
                  <input
                    type="text"
                    style={inputStyle}
                    onChange={(e) =>
                      setForm({ ...form, roomNumber: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div style={{ width: "95%" }}>
                <label>PARENT NAME</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={student.parentName}
                  disabled
                />
              </div>
              <div style={{ width: "95%" }}>
                <label>PARENT PHONE</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={student.parentPhone}
                  disabled
                />
              </div>

              {/* Row 4 */}
              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ flex: 1 }}>
                  <label>NO. OF DAYS</label>
                  <input
                    type="text"
                    style={inputStyle}
                    onChange={(e) =>
                      setForm({ ...form, noOfDays: e.target.value })
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>FROM DATE</label>
                  <input
                    type="date"
                    style={inputStyle}
                    onChange={(e) =>
                      setForm({ ...form, fromDate: e.target.value })
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>TO DATE</label>
                  <input
                    type="date"
                    style={inputStyle}
                    onChange={(e) =>
                      setForm({ ...form, toDate: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div style={{ width: "95%" }}>
                <label>REASON FOR LEAVE</label>
                <input
                  type="text"
                  style={inputStyle}
                  onChange={(e) =>
                    setForm({ ...form, reasonForLeave: e.target.value })
                  }
                />
              </div>

              {/* <div style={{ width: "95%" }}>
                <label>PARENTS PERMISSION (Write Yes / No / Any remark)</label>
                <input
                  type="text"
                  placeholder="e.g., Yes, informed over call"
                  style={inputStyle}
                  onChange={(e) =>
                    setForm({ ...form, parentsPermission: e.target.value })
                  }
                />
              </div>
               */}
              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ flex: 1 }}>
                  <label>LEAVING DATE</label>
                  <input
                    type="date"
                    style={inputStyle}
                    onChange={(e) =>
                      setForm({ ...form, leavingDate: e.target.value })
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>LEAVING TIME</label>
                  <input
                    type="time"
                    style={inputStyle}
                    onChange={(e) =>
                      setForm({ ...form, leavingTime: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Button */}
              <div
                style={{
                  width: "100%",
                  paddingTop: "3.2%",
                  textAlign: "end",
                }}
              >
                <button onClick={handleSubmit} style={approveBtn}>
                  SUBMIT
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outpass;
