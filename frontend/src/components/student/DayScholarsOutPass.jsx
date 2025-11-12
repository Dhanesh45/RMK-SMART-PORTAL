import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const submitBtn = {
  padding: "10px 40px",
  backgroundColor: "#1E2E4F",
  color: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
};

const DayscholarOutpass = ({ regNo: passedRegNo }) => {
  const location = useLocation();
  const [regNo, setRegNo] = useState(passedRegNo || location.state?.regNo || "");
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
    leavingTime: "",
    parentPermission: "",
  });

  // Fetch student by regNo or email
  const fetchStudent = async (reg = regNo) => {
    if (!reg) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/dayscholarOutpass/student/${reg}`);
      setStudent(res.data);
    } catch (err) {
      alert("❌ Student not found");
      setStudent(null);
    }
  };

  // Fetch student when regNo changes
  useEffect(() => {
    fetchStudent();
  }, [regNo]);

  // Handle form submission
  const handleSubmit = async () => {
    // 1. Ensure student exists
    if (!student || !student.regNo) {
      alert("❌ Please enter a valid student registration number first!");
      return;
    }

    // 2. Validate form fields
    if (!form.reason || !form.fromDate || !form.leavingTime || !form.parentPermission) {
      alert("❌ Please fill all required fields!");
      return;
    }

    try {
      // 3. Send request to backend
      await axios.post("http://localhost:5000/api/dayscholarOutpass/create", {
        regNo: student.regNo,             // required by backend
        reason: form.reason,              // maps to "Purpose of Leaving"
        fromDate: form.fromDate,             // date
        toDate: form.toDate || form.fromDate,// optional
        leavingTime: form.leavingTime,
        // maps to "time"
        parentPermission: form.parentPermission, // maps to "Parent Permission"
      });

      alert("✅ Day Scholar Outpass submitted!");

      // 4. Reset form
      setForm({
        reason: "",
        fromDate: "",
        toDate: "",
        leavingTime: "",
        parentPermission: "",
      });
    } catch (err) {
      console.error("❌ Failed to submit outpass:", err);
      alert("❌ Failed to submit outpass. Check console for details.");
    }
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        paddingTop: "3vh",
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
          maxHeight: "85vh",
        }}
      >
        <div style={{ width: "100%", textAlign: "center", fontSize: "3vh", fontWeight: "bold", marginBottom: "1%" }}>
          <h3>DAY SCHOLAR OUTPASS</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Registration Number Input */}
          <div style={{ width: "95%" }}>
            <label>REGISTRATION NUMBER / EMAIL</label>
            <input
              type="text"
              style={inputStyle}
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
          </div>

          {/* Auto-filled fields */}
          {student && (
            <>
              <div style={{ width: "95%" }}>
                <label>NAME OF THE STUDENT</label>
                <input type="text" style={inputStyle} value={student.studentName} disabled />
              </div>

              <div style={{ width: "95%" }}>
                <label>BRANCH</label>
                <input type="text" style={inputStyle} value={student.branch} disabled />
              </div>

              <div style={{ width: "95%" }}>
                <label>NAME OF THE COUNSELLOR</label>
                <input type="text" style={inputStyle} value={student.counsellor} disabled />
              </div>

              <div style={{ width: "95%" }}>
                <label>NAME OF THE PARENT</label>
                <input type="text" style={inputStyle} value={student.parentName} disabled />
              </div>

              <div style={{ width: "95%" }}>
                <label>CONTACT NUMBER OF THE PARENT</label>
                <input type="text" style={inputStyle} value={student.parentPhone} disabled />
              </div>

              {/* User inputs */}
              <div style={{ width: "95%" }}>
                <label>REASON FOR LEAVING</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ flex: 1 }}>
                  <label>FROM DATE</label>
                  <input
                    type="date"
                    style={inputStyle}
                    value={form.fromDate}
                    onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>TO DATE</label>
                  <input
                    type="date"
                    style={inputStyle}
                    value={form.toDate}
                    onChange={(e) => setForm({ ...form, toDate: e.target.value })}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>LEAVING TIME</label>
                  <input
                    type="time"
                    style={inputStyle}
                    value={form.leavingTime}
                    onChange={(e) => setForm({ ...form, leavingTime: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ width: "95%" }}>
                <label>PARENTS PERMISSION (Yes/No)</label>
                <select
                  style={inputStyle}
                  value={form.parentPermission}
                  onChange={(e) => setForm({ ...form, parentPermission: e.target.value })}
                >
                  <option value="">Select Permission</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Submit button */}
              <div style={{ width: "100%", paddingTop: "3.2%", textAlign: "end" }}>
                <button onClick={handleSubmit} style={submitBtn}>
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

export default DayscholarOutpass;
