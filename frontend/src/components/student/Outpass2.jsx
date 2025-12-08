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

const Outpass2 = ({ regNo: passedRegNo, onSubmit, forOd }) => {
  const location = useLocation();
  const [regNo, setRegNo] = useState(
    passedRegNo || location.state?.regNo || ""
  );
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({
    roomNumber: "",
    noOfDays: "",
    fromDate: "",
    toDate: "",
    reasonForLeave: "",
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
    if (regNo) 
        {fetchStudent(regNo);}
  }, []);

  // ✅ FIXED SUBMIT
  const handleSubmit = () => {
    // basic validation
    for (let key in form) {
      if (!form[key]) {
        alert("❌ Fill all Outpass fields");
        return;
      }
    }

    if (new Date(form.fromDate) > new Date(form.toDate)) {
      alert("❌ From Date must be before To Date");
      return;
    }

    // ✅ PASS DATA TO ODFORM
    onSubmit({
      regNo,
      
      ...form,
      forOd: forOd ? "Yes" : "No",
    });
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
        <h3 style={{ textAlign: "center" }}>OUTPASS</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <label>REGISTRATION NUMBER</label>
            <input
              type="text"
              style={inputStyle}
              value={regNo}
              disabled
            />
          </div>

          {student && (
            <>
              <div>
                <label>NAME</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={student.studentName}
                  disabled
                />
              </div>

              <div style={{ display: "flex", gap: "30px" }}>
                <div>
                <label style={{ fontSize: "2vh" }}>ROOM NO</label>
                <input
                  placeholder="ROOM NO"
                  style={inputStyle}
                  onChange={(e) =>
                    setForm({ ...form, roomNumber: e.target.value })
                  }
                />
                </div>
                <div>
                  <label style={{ fontSize: "2vh" }}>NO OF DAYS</label>
                <input
                  placeholder="NO OF DAYS"
                  style={inputStyle}
                  onChange={(e) =>
                    setForm({ ...form, noOfDays: e.target.value })
                  }
                />
                </div>
              </div>
              <div>
              <label style={{ fontSize: "2vh" }}>FROM DATE</label>      
              <input
                type="date"
                style={inputStyle}
                onChange={(e) =>
                  setForm({ ...form, fromDate: e.target.value })
                }
              />
              </div>
              <div>
              <label style={{ fontSize: "2vh" }}>TO DATE</label> 
              <input
                type="date"
                style={inputStyle}
                onChange={(e) =>
                  setForm({ ...form, toDate: e.target.value })
                }
              />
              </div>
              <div>
              <label style={{ fontSize: "2vh" }}>REASON</label> 
              <input
                placeholder="REASON"
                style={inputStyle}
                onChange={(e) =>
                  setForm({ ...form, reasonForLeave: e.target.value })
                }
              />
              </div>
              <div>
              <label style={{ fontSize: "2vh" }}>LEAVING DATE</label>   
              <input
                type="date"
                style={inputStyle}
                onChange={(e) =>
                  setForm({ ...form, leavingDate: e.target.value })
                }
              />
              </div>
              <div>
              <label style={{ fontSize: "2vh" }}>LEAVING TIME</label> 
              <input
                type="time"
                style={inputStyle}
                onChange={(e) =>
                  setForm({ ...form, leavingTime: e.target.value })
                }
              /></div>

              <button onClick={handleSubmit} style={approveBtn}>
                SUBMIT
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outpass2;
