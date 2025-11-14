import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const BonafideForm = ({ regNo: passedRegNo }) => {
  const location = useLocation();
  const [regNo, setRegNo] = useState(
    passedRegNo || location.state?.regNo || ""
  );
  const [student, setStudent] = useState(null);

  const [form, setForm] = useState({
    reason: "",
    semester: "",
    fatherName: "",
    houseno: "",
    age: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    date_of_birth: "",
    fees_detail_year: "",
    boarding: "",
    category: "",
    type_of_application: "",
  });

  // ✅ Fetch student details by RegNo
  const fetchStudent = async (reg = regNo) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bonafide/${reg}`);
      setStudent(res.data);
    } catch {
      alert("❌ Student not found");
    }
  };

  useEffect(() => {
    if (regNo) fetchStudent(regNo);
  }, []);

  // ✅ Handle Submit
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/bonafide", {
        regNo,
        ...form,
      });
      alert("✅ Bonafide application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit bonafide form");
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Form Container */}
      <div
        style={{
          marginTop: "1%",
          width: "90%",
          maxWidth: "1000px",
          backgroundColor: "#fff",
          borderRadius: "2vh",
          padding: "2vh 2vw",
          boxShadow: "0 0 1vh rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh", // You can adjust this value as needed
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2%",
            fontSize: "3.2vh",
            fontWeight: "bolder",
            color: "rgba(30, 46, 79, 1)",
          }}
        >
          APPLICATION FORM FOR BONAFIDE CERTIFICATE
        </h2>

        {/* Form Fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // ✅ 2-column layout
            gap: "2vh 2vw",
            fontSize: "2vh",
          }}
        >
          {/* Row 1 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Reason for Bonafide Request</label>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Father's/Guardian's Name</label>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={student ? student.studentName : ""}
              disabled
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Register Number</label>
            <input
              type="number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>Branch</label>
              <input
                type="text"
                value={student ? student.branch : ""}
                disabled
                style={{
                  padding: "1vh",
                  borderRadius: "1vh",
                  border: "1px solid #999",
                  width: "100%",
                }}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Semester</label>
              <select
                style={{
                  padding: "1vh",
                  borderRadius: "1vh",
                  border: "1px solid #999",
                  width: "126%",
                }}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
              >
                <option>Select the semester</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4 </option>
                <option>5</option>
                <option>6</option>
                <option>7 </option>
                <option>8</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>House No</label>
            <input
              type="number"
              onChange={(e) => setForm({ ...form, houseno: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "96%",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>Date of Birth</label>
              <input
                type="date"
                onChange={(e) =>
                  setForm({ ...form, date_of_birth: e.target.value })
                }
                style={{
                  padding: "1vh",
                  borderRadius: "1vh",
                  border: "1px solid #999",
                  width: "130%",
                }}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Age</label>
              <input
                type="number"
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                style={{
                  padding: "1vh",
                  borderRadius: "1vh",
                  border: "1px solid #999",
                  width: "109%",
                }}
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Street Name</label>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          {/* Row 4 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter Area</label>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Enter City</label>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          {/* Row 5 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter State</label>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Enter Pincode</label>
            <input
              type="Number"
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }}
            />
          </div>

          {/* Row 6 */}

          {/* Row 7 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Select Category</label>
            <select
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>Select Category</option>
              <option>GOVERMENT QUOTA</option>
              <option>MANAGEMENT QUOTA</option>
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Fees Details Required Year</label>
            <select
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }}
              onChange={(e) =>
                setForm({ ...form, fees_detail_year: e.target.value })
              }
            >
              <option>Year</option>
              <option>I Year</option>
              <option>II Year</option>
              <option>III Year</option>
              <option>IV Year</option>
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Accommodation</label>
            <input
              type="text"
              value={student ? student.accommodation : ""}
              disabled
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }}
              onChange={(e) =>
                setForm({ ...form, accommodation: e.target.value })
              }
            />
          </div>
   
          <div style={fieldStyle}>
            <label style={labelStyle}>If Dayscholar, Boarding Place</label>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, boarding: e.target.value })}
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Select the Type of Bonafide</label>
            <select
              style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }}
              onChange={(e) =>
                setForm({ ...form, type_of_application: e.target.value })
              }
            >
              <option>Select the Type of Bonafide</option>
              <option>WITH FEE STRUCTURE</option>
              <option>WITHOUT FEE STRUCTURE</option>
              <option>INPLANT TRAINING /PROJECT WORK</option>
              <option>PAPER PRESENTATION </option>
              <option>GENERAL</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "2%",
              width: "100%",
              alignItems: "end",
            }}
          >
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#1f2a44",
                color: "rgba(224, 231, 231, 1)",
                borderRadius: "2vh",
                padding: "2% 9% 2%",
                fontSize: "2vh",
                fontWeight: "bolder",
                cursor: "pointer",
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  height: "10vh",
  fontSize: "2.1vh",
};

const labelStyle = {
  marginBottom: "0.9vh",
  fontWeight: "600",
  fontSize: "2.5vh",
  color: "rgba(0, 0, 0, 1)",
};

export default BonafideForm;
