import React, { useState } from "react";
import axios from "axios";
import Outpass2 from "./Outpass2";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ODform = ({ regNo: passedRegNo }) => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const [regNo, setRegNo] = useState(passedRegNo || location.state?.regNo || "");
  const [odData, setOdData] = useState({
    name: "",
    department: "",
    regNo: regNo,
    purpose: "",
    numberOfDays: "",
    collegeName: "",
    eventName: "",
    fromDate: "",
    toDate: "",
    place: "",
    date:""
  });
  const [student, setStudent] = useState(null);
  const [outpassData, setOutpassData] = useState(null);

  const [proof, setProof] = useState(null);

  // ---------------- VALIDATIONS ----------------
  const validateRegNo = (regNo) => /^\d{12}$/.test(regNo);

  const validateDates = (from, to) => new Date(from) <= new Date(to);

  const validateOD = () => {
    for (let key in odData) {
      if (!odData[key]) {
        alert("❌ Please fill all OD fields");
        return false;
      }
    }

    if (!validateRegNo(odData.regNo)) {
      alert("❌ Register number must be exactly 12 digits");
      return false;
    }

    if (!validateDates(odData.fromDate, odData.toDate)) {
      alert("❌ From date must be before To date");
      return false;
    }

    return true;
  };

  // ---------------- FINAL SUBMIT ----------------
  const handleFinalSubmit = async (outpassPayload) => {
    try {
      await axios.post("http://localhost:5000/api/od", {
        od: odData,
        outpass: outpassPayload,
      });

      alert("✅ OD & Outpass submitted successfully");
      setStep(1);
      setOutpassData(null);
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed");
    }
  };

  const fetchStudent = async (reg = regNo) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/outpass/${reg}`
    );

    setStudent(res.data);
    // ✅ COPY into form state
    setOdData((prev) => ({
      ...prev,
      name: res.data.studentName || "",
      department: res.data.branch || "",
      regNo: reg,
    }));
  } catch {
    alert("❌ Student not found");
    setStudent(null);
  }
};


  useEffect(() => {
    if (regNo) {
      fetchStudent(regNo);
    }
  }, [regNo]);

  // ---------------- FILE HANDLING ----------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setProof({
        type: "image",
        url: URL.createObjectURL(file),
        name: file.name,
      });
    } else if (file.type === "application/pdf") {
      setProof({ type: "pdf", name: file.name });
    } else {
      setProof(null);
    }
  };

  // ---------------- RENDER ----------------
  return (
    <>
      {step === 1 && (
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
            {/* LEFT COLUMN */}
            <div style={{ flex: 1, minWidth: "45%" }}>
              <label style={{ fontSize: "2vh" }}>NAME OF THE STUDENT</label>
              <input
                type="text"
                value={odData.name}
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontSize: "2vh" }}>DEPARTMENT</label>
              <input
                type="text"
                value={odData.department}
               
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontSize: "2vh" }}>
                REGISTER NUMBER
              </label>
              <input
                type="text"
                value={regNo}
               
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontSize: "2vh" }}>
                PURPOSE OF OD
              </label>
              <select
                value={odData.purpose}
                onChange={(e) =>
                  setOdData({ ...odData, purpose: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">SELECT</option>
                <option value="Competition">COMPETITION</option>
                <option value="Workshop">WORKSHOP</option>
                <option value="Others">OTHERS</option>
              </select>

              <label style={{ fontSize: "2vh" }}>
                NUMBER OF DAYS
              </label>
              <input
                type="number"
                value={odData.numberOfDays}
                onChange={(e) =>
                  setOdData({ ...odData, numberOfDays: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontSize: "2vh" }}>
                NAME OF THE COLLEGE
              </label>
              <input
                type="text"
                value={odData.collegeName}
                onChange={(e) =>
                  setOdData({ ...odData, collegeName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontSize: "2vh" }}>
                NAME OF THE EVENT
              </label>
              <input
                type="text"
                value={odData.eventName}
                onChange={(e) =>
                  setOdData({ ...odData, eventName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ flex: 1, minWidth: "45%" }}>
              <label style={{ fontSize: "2vh" }}>
                DATE OF COMPETITION
              </label>
              <input
                type="date"
                value={odData.date}
                onChange={(e) =>
                  setOdData({ ...odData, date: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
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
                  <label style={{ fontSize: "2vh" }}>
                    FROM DATE
                  </label>
                  <input
                    type="date"
                    value={odData.fromDate}
                    onChange={(e) =>
                      setOdData({
                        ...odData,
                        fromDate: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "4%",
                      marginBottom: "2%",
                      borderRadius: "1vh",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: "45%" }}>
                  <label style={{ fontSize: "2vh" }}>
                    TO DATE
                  </label>
                  <input
                    type="date"
                    value={odData.toDate}
                    onChange={(e) =>
                      setOdData({
                        ...odData,
                        toDate: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "4%",
                      marginBottom: "2%",
                      borderRadius: "1vh",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              </div>

              <label style={{ fontSize: "2vh" }}>
                PLACE OF COMPETITION
              </label>
              <input
                type="text"
                value={odData.place}
                onChange={(e) =>
                  setOdData({ ...odData, place: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2%",
                  marginBottom: "3%",
                  borderRadius: "1vh",
                  border: "1px solid #ccc",
                }}
              />

              {/* PROOF UPLOAD — UNTOUCHED */}
              <label
                style={{
                  fontSize: "2vh",
                  display: "block",
                  marginBottom: "1%",
                }}
              >
                UPLOAD PROOF (IMAGE/PDF)
              </label>
              <input
                type="file"
                id="proofUpload"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div style={{ width: "80%", margin: "2% auto" }}>
            <button onClick={() => validateOD() && setStep(2)} style={{
              padding: "1% 4%",
              fontSize: "2vh",
              fontWeight: "bold",
              backgroundColor: "#0d3b66",
              color: "white",
              border: "none",
              borderRadius: "5vh",
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}>
              NEXT
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <Outpass2
          regNo={odData.regNo}
          forOd={true}
          onSubmit={(data) => {
            setOutpassData(data);
            handleFinalSubmit(data);
          }}
        />
      )}
    </>
  );
};

export default ODform;
