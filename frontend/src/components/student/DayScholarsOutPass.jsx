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
  const [reasonError, setReasonError] = useState(false);
  const [parentPermissionError, setParentPermissionError] = useState("");
  const [fromDateError, setFromDateError] = useState(false);
  const [leavingTimeError, setLeavingTimeError] = useState("");
  const [toDateError, setToDateError] = useState(false);
  const today = new Date().toISOString().split("T")[0];
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
            <label>REGISTRATION NUMBER</label>
            <input
              type="text"
              style={inputStyle}
              value={regNo}
              disabled
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
                  style={{
                    ...inputStyle,
                    border: reasonError ? "2px solid red" : inputStyle.border,
                  }}
                  value={form.reason}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm({ ...form, reason: value });

                    // Remove red when typing
                    if (value.trim() !== "") setReasonError(false);
                  }}
                  onBlur={() => {
                    // Show red border if empty (same as TextField error)
                    setReasonError(!form.reason.trim());
                  }}
                  required
                />
                {reasonError && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    Reason for leaving is required
                  </p>
                )}
              </div>

              <div style={{ display: "flex", gap: "30px", width: "34.3vw" }}>
                {/* FROM DATE */}
                <div style={{ flex: 1 }}>
                  <label>FROM DATE</label>
                  <input
                    type="date"
                    style={{
                      ...inputStyle,
                      border: fromDateError ? "2px solid red" : inputStyle.border,
                    }}
                    min={today}
                    value={form.fromDate}
                    required
                    onBlur={() => {
                      setFromDateError(!form.fromDate);
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm({ ...form, fromDate: value });

                      if (value) setFromDateError(false);
                    }}
                  />

                  {fromDateError && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                      FROM DATE is required
                    </p>
                  )}
                </div>

                {/* TO DATE */}
                <div style={{ flex: 1 }}>
                  <label>TO DATE</label>
                  <input
                    type="date"
                    style={{
                      ...inputStyle,
                      border: toDateError ? "2px solid red" : inputStyle.border,
                    }}
                    value={form.toDate}
                    required
                    onBlur={() => {
                      setToDateError(!form.toDate);
                    }}
                    onChange={(e) => {
                      const toDate = e.target.value;
                      const fromDate = form.fromDate;

                      if (!fromDate) {
                        setToDateError(true);
                        return setForm({ ...form, toDate: "" });
                      }

                      if (toDate < fromDate) {
                        setToDateError(true);
                        return setForm({ ...form, toDate: "" });
                      }

                      setToDateError(false);
                      setForm({ ...form, toDate });
                    }}
                  />

                  {toDateError && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                      {form.fromDate
                        ? "TO DATE cannot be earlier than FROM DATE"
                        : "TO DATE is required"}
                    </p>
                  )}
                </div>
              </div>


              <div style={{ flex: 1, position: "relative", width: "34.4vw" }}>
                <label>LEAVING TIME</label>

                <div style={{ position: "relative" }}>
                  <input
                    type="time"
                    value={form.leavingTime}
                    style={{
                      ...inputStyle,
                      paddingRight: "12%",
                      border: leavingTimeError ? "2px solid red" : inputStyle.border,
                    }}
                    onBlur={() => {
                      if (!form.leavingTime) {
                        setLeavingTimeError("Leaving time is required");
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm({ ...form, leavingTime: value });

                      // clear error when user types
                      if (value) setLeavingTimeError("");
                    }}
                  />

                  {/* AM/PM next to time */}
                  {form.leavingTime && (
                    <span
                      style={{
                        position: "absolute",
                        left: "calc(100% - 55px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontWeight: "bold",
                        color: "#444",
                        pointerEvents: "none",
                      }}
                    >
                      {parseInt(form.leavingTime.split(":")[0]) >= 12 ? "PM" : "AM"}
                    </span>
                  )}
                </div>

                {/* Error message BELOW field */}
                {leavingTimeError && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {leavingTimeError}
                  </p>
                )}
              </div>




              <div style={{ width: "95%" }}>
                <label>PARENTS PERMISSION (Yes/No)</label>

                <select
                  style={{
                    ...inputStyle,
                    border: parentPermissionError ? "2px solid red" : inputStyle.border,
                  }}
                  value={form.parentPermission}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm({ ...form, parentPermission: value });

                    // Clear error when selected
                    if (value) setParentPermissionError("");
                  }}
                  onBlur={() => {
                    if (!form.parentPermission) {
                      setParentPermissionError("Parent permission is required");
                    }
                  }}
                >
                  <option value="">Select Permission</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                {/* Error message */}
                {parentPermissionError && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {parentPermissionError}
                  </p>
                )}
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
