import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DayscholarOD = ({ regNo: passedRegNo }) => {
  const location = useLocation();
  const [regNo] = useState(passedRegNo || location.state?.regNo || "");

  const [student, setStudent] = useState(null);

  const [form, setForm] = useState({
    purpose: "",
    numberOfDays: "",
    fromDate: "",
    toDate: "",
    place: "",
    collegeName: "",
    eventName: "",
    date:""
  });

  const [proof, setProof] = useState(null);

  // ✅ fetch student
  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/dayscholar-od/${regNo}`
      );
      setStudent(res.data);
    } catch {
      alert("❌ Student not found");
    }
  };

  useEffect(() => {
    if (regNo) fetchStudent();
  }, [regNo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setProof({ type: "image", name: file.name });
    } else {
      setProof({ type: "pdf", name: file.name });
    }
  };

  // ✅ submit
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/dayscholar-od", {
        regNo,
        ...form,
      });
      alert("✅ Dayscholar OD applied successfully");
    } catch {
      alert("❌ OD submission failed");
    }
  };

  return (
    
      <div
        style={{
          height: "80%",
          width: "80%",
          margin: "2% auto",
          backgroundColor: "white",
          borderRadius: "2vh",
          padding: "3%",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "3%",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "3vh",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          STUDENTS OD FORM
        </h2>

        <div
          style={{
            display: "flex",
            gap: "5%",
            flexWrap: "wrap",
          }}
        >
          {/* Left Column */}
          <div style={{ flex: 1, minWidth: "45%" }}>
            <label style={{ fontSize: "2vh" }}>NAME OF THE STUDENT</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={student?.studentName}
            />

            <label style={{ fontSize: "2vh" }}>DEPARTMENT</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={student?.branch || ""}
            />

            <label style={{ fontSize: "2vh" }}>REGISTER NUMBER</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={regNo}
            />

            <label style={{ fontSize: "2vh" }}>PURPOSE OF OD</label>
            <select
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={form.purpose}
            onChange={(e) =>
              setForm({ ...form, purpose: e.target.value })
            }
            >
              <option value="">SELECT</option>
              <option value="Competition">COMPETITION</option>
              <option value="Workshop">WORKSHOP</option>
              <option value="Others">OTHERS</option>
            </select>

            <label style={{ fontSize: "2vh" }}>NUMBER OF DAYS</label>
            <input
              type="number"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
               value={form.numberOfDays}
            onChange={(e) =>
              setForm({ ...form, numberOfDays: e.target.value })
            }
            />

            <label style={{ fontSize: "2vh" }}>NAME OF THE COLLEGE</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={form.collegeName}
            onChange={(e) =>
              setForm({ ...form, collegeName: e.target.value })
            }
            />

            <label style={{ fontSize: "2vh" }}>NAME OF THE EVENT</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={form.eventName}
            onChange={(e) =>
              setForm({ ...form, eventName: e.target.value })
            }
            />
          </div>

          {/* Right Column */}
          <div style={{ flex: 1, minWidth: "45%" }}>
            <label style={{ fontSize: "2vh" }}>DATE OF COMPETITION</label>
            <input
              type="date"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            />

            <div
              style={{
                display: "flex",
                gap: "4%",
                marginBottom: "3%",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "45%" }}>
                <label style={{ fontSize: "2vh" }}>FROM DATE</label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "4%",
                    marginBottom: "2%",
                    borderRadius: "1vh",
                    border: "1px solid #ccc",
                  }}
                  value={form.fromDate}
            onChange={(e) =>
              setForm({ ...form, fromDate: e.target.value })
            }
                />
              </div>
              <div style={{ flex: 1, minWidth: "45%" }}>
                <label style={{ fontSize: "2vh" }}>TO DATE</label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "4%",
                    marginBottom: "2%",
                    borderRadius: "1vh",
                    border: "1px solid #ccc",
                  }}
                   value={form.toDate}
            onChange={(e) =>
              setForm({ ...form, toDate: e.target.value })
            }
                />
              </div>
            </div>

            <label style={{ fontSize: "2vh" }}>PLACE OF COMPETITION</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              value={form.place}
            onChange={(e) =>
              setForm({ ...form, place: e.target.value })
            }
            />

            <label style={{ fontSize: "2vh" }}>
              NUMBER OF DAYS OD ALREADY AVAILED (TILL DATE IN CURRENT SEMESTER)
            </label>
            <input
              type="number"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ fontSize: "2vh" }}>COMMENTS BY COUNSELLOR</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
              disabled
            />

          {/* Upload Proof */}
          <label style={{ fontSize: "2vh", display: "block", marginBottom: "1%" }}>
              UPLOAD PROOF (IMAGE/PDF)
            </label>
            <input
              type="file"
              id="proofUpload"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="proofUpload"
              style={{
                display: "inline-block",
                padding: "2% 4%",
                backgroundColor: "#0d3b66",
                color: "white",
                borderRadius: "5vh",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              Upload Proof
            </label>

             {/* Inline Preview */}
             {proof && (
              <span>
                {proof.type === "image" ? (
                  <img
                    src={proof.url}
                    alt="Preview"
                    style={{
                      height: "10%",
                      width: "auto",
                      borderRadius: "2vh",
                      border: "1px solid #ccc",
                      verticalAlign: "middle",
                    }}
                  />
                ) : (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    ✅ {proof.name}
                  </span>
                )}
              </span>
            )}

          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "1% 4%",
              fontSize: "2vh",
              fontWeight: "bold",
              backgroundColor: "#0d3b66",
              color: "white",
              border: "none",
              borderRadius: "5vh",
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
  
  );
};

export default DayscholarOD;