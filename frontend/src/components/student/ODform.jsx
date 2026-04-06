import React, { useState, useEffect } from "react";
import axios from "axios";
import Outpass2 from "./Outpass2";
import { useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --teal: #0abfb8;
    --teal-dark: #089e98;
    --teal-light: #e6faf9;
    --teal-glow: rgba(10, 191, 184, 0.15);
    --navy: #0d1f2d;
    --navy-mid: #1a3245;
    --slate: #4a6378;
    --muted: #8fa3b3;
    --surface: #f5f8fa;
    --white: #ffffff;
    --green: #12c264;
    --green-bg: #e8faf1;
    --amber: #f59e0b;
    --amber-bg: #fef3c7;
    --border: rgba(10, 191, 184, 0.15);
    --border-input: #e2eaf0;
    --shadow-md: 0 4px 24px rgba(13, 31, 45, 0.10);
    --radius: 16px;
  }

  .od-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .od-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    padding: 28px 24px 48px;
  }

  /* ── WRAPPER ── */
  .od-wrapper {
    max-width: 900px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  /* ── HEADER BANNER ── */
  .od-header {
    height: 90px;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 45%, #0d5c8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 14px;
  }
  .od-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }
  .od-header-rings {
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 50px solid rgba(255,255,255,0.05);
    box-shadow: 0 0 0 30px rgba(255,255,255,0.03);
  }
  .od-header-icon {
    width: 44px;
    height: 44px;
    background: rgba(255,255,255,0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 1;
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(8px);
    flex-shrink: 0;
  }
  .od-header-text { z-index: 1; }
  .od-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: white;
    letter-spacing: 2px;
  }
  .od-header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  /* ── STEP INDICATOR ── */
  .od-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 32px 0;
    gap: 0;
  }
  .od-step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    max-width: 140px;
  }
  .od-step-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    transition: all 0.3s;
  }
  .od-step-dot.active {
    background: linear-gradient(135deg, var(--teal) 0%, #0d8fa6 100%);
    color: white;
    box-shadow: 0 4px 16px rgba(10,191,184,0.35);
  }
  .od-step-dot.done {
    background: var(--green-bg);
    color: var(--green);
    border: 2px solid rgba(18,194,100,0.3);
  }
  .od-step-dot.idle {
    background: var(--surface);
    color: var(--muted);
    border: 2px solid var(--border-input);
  }
  .od-step-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
  }
  .od-step-label.active { color: var(--teal-dark); }
  .od-step-label.done { color: var(--green); }
  .od-step-label.idle { color: var(--muted); }
  .od-step-connector {
    flex: 1;
    height: 2px;
    background: var(--border-input);
    margin-bottom: 22px;
    max-width: 80px;
    transition: background 0.4s;
  }
  .od-step-connector.filled { background: var(--teal); }

  /* ── BODY ── */
  .od-body { padding: 24px 32px 32px; }

  /* ── SECTION LABEL ── */
  .od-section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--teal-dark);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    margin-top: 28px;
  }
  .od-section-label:first-child { margin-top: 0; }
  .od-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── STUDENT PILL ── */
  .od-student-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--teal-light);
    border: 1px solid rgba(10,191,184,0.2);
    border-radius: 12px;
    padding: 10px 16px;
    margin-bottom: 24px;
  }
  .od-student-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--teal) 0%, #0d5c8a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .od-student-name { font-weight: 600; font-size: 14px; color: var(--navy); }
  .od-student-meta { font-size: 12px; color: var(--slate); margin-top: 1px; }

  /* ── GRIDS ── */
  .od-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .od-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* ── FIELD ── */
  .od-field { display: flex; flex-direction: column; gap: 6px; }
  .od-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .od-input, .od-select {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid var(--border-input);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    color: var(--navy);
    background: var(--white);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    appearance: none;
  }
  .od-input:focus, .od-select:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  .od-input:disabled {
    background: var(--surface);
    color: var(--slate);
    cursor: default;
  }
  .od-input::placeholder { color: #c5d4de; }

  /* SELECT arrow */
  .od-select-wrap { position: relative; }
  .od-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    font-size: 12px;
  }
  .od-select { padding-right: 32px; }

  /* ── PURPOSE PILLS ── */
  .od-purpose-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 2px; }
  .od-purpose-pill {
    padding: 7px 18px;
    border-radius: 100px;
    border: 1.5px solid var(--border-input);
    font-size: 13px;
    font-weight: 500;
    color: var(--slate);
    background: var(--white);
    cursor: pointer;
    transition: all 0.18s;
    font-family: 'DM Sans', sans-serif;
  }
  .od-purpose-pill:hover { border-color: var(--teal); color: var(--teal-dark); }
  .od-purpose-pill.selected {
    background: var(--teal-light);
    border-color: var(--teal);
    color: var(--teal-dark);
    font-weight: 600;
    box-shadow: 0 0 0 3px var(--teal-glow);
  }

  /* ── FILE UPLOAD ── */
  .od-upload-area {
    border: 2px dashed var(--border-input);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: var(--surface);
  }
  .od-upload-area:hover { border-color: var(--teal); background: var(--teal-light); }
  .od-upload-area.has-file { border-color: var(--green); background: var(--green-bg); border-style: solid; }
  .od-upload-icon { font-size: 28px; margin-bottom: 6px; }
  .od-upload-text { font-size: 13px; color: var(--slate); }
  .od-upload-sub { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .od-upload-filename { font-size: 13px; color: var(--green); font-weight: 600; }

  /* ── FOOTER ── */
  .od-footer {
    padding: 20px 32px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid var(--border);
  }
  .od-footer-note { font-size: 12px; color: var(--muted); }
  .od-footer-note strong { color: var(--slate); }

  .od-next-btn {
    padding: 12px 44px;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 100%);
    color: white;
    border: none;
    border-radius: 100px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(10,191,184,0.35);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .od-next-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(10,191,184,0.45); }
  .od-next-btn:active { transform: scale(0.97); }

  @media (max-width: 680px) {
    .od-body { padding: 20px 16px; }
    .od-grid-2, .od-grid-3 { grid-template-columns: 1fr; }
    .od-footer { flex-direction: column; align-items: flex-end; }
  }
`;

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
    date: "",
  });
  const [student, setStudent] = useState(null);
  const [proof, setProof] = useState(null);

  const validateRegNo = (r) => /^\d{12}$/.test(r);
  const validateDates = (from, to) => new Date(from) <= new Date(to);

  const validateOD = () => {
    for (let key in odData) {
      if (!odData[key]) { alert("❌ Please fill all OD fields"); return false; }
    }
    if (!validateRegNo(odData.regNo)) { alert("❌ Register number must be exactly 12 digits"); return false; }
    if (!validateDates(odData.fromDate, odData.toDate)) { alert("❌ From date must be before To date"); return false; }
    return true;
  };

  const handleFinalSubmit = async (outpassPayload) => {
    try {
      await axios.post("http://localhost:5000/api/od", { od: odData, outpass: outpassPayload });
      alert("✅ OD & Outpass submitted successfully");
      setStep(1);
    } catch (err) {
      alert("❌ Submission failed");
    }
  };

  const fetchStudent = async (reg = regNo) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/outpass/${reg}`);
      setStudent(res.data);
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
    if (regNo) fetchStudent(regNo);
  }, [regNo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.startsWith("image/")) {
      setProof({ type: "image", url: URL.createObjectURL(file), name: file.name });
    } else if (file.type === "application/pdf") {
      setProof({ type: "pdf", name: file.name });
    } else {
      setProof(null);
    }
  };

  const set = (key) => (e) => setOdData({ ...odData, [key]: e.target.value });

  const initials = student?.studentName
    ? student.studentName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const purposes = ["Competition", "Workshop", "Seminar", "Others"];

  return (
    <div className="od-root">
      <style>{styles}</style>

      {step === 1 && (
        <div className="od-wrapper">
          {/* ── BANNER ── */}
          <div className="od-header">
            <div className="od-header-rings" />
            <div className="od-header-icon">📋</div>
            <div className="od-header-text">
              <div className="od-header-title">ON DUTY FORM</div>
              <div className="od-header-sub">Step 1 of 2 · Student OD Request</div>
            </div>
          </div>

          {/* ── STEP INDICATOR ── */}
          <div className="od-steps">
            <div className="od-step-item">
              <div className="od-step-dot active">1</div>
              <div className="od-step-label active">OD Details</div>
            </div>
            <div className="od-step-connector" />
            <div className="od-step-item">
              <div className="od-step-dot idle">2</div>
              <div className="od-step-label idle">Outpass</div>
            </div>
          </div>

          {/* ── FORM BODY ── */}
          <div className="od-body">

            {/* Student info */}
            <div className="od-section-label">Student Details</div>

            {student && (
              <div className="od-student-pill">
                <div className="od-student-dot">{initials}</div>
                <div>
                  <div className="od-student-name">{student.studentName}</div>
                  <div className="od-student-meta">{student.year} Year · {student.branch}</div>
                </div>
              </div>
            )}

            <div className="od-grid-3">
              <div className="od-field">
                <label className="od-label">Name</label>
                <input className="od-input" value={odData.name} disabled placeholder="Auto-filled" />
              </div>
              <div className="od-field">
                <label className="od-label">Department</label>
                <input className="od-input" value={odData.department} disabled placeholder="Auto-filled" />
              </div>
              <div className="od-field">
                <label className="od-label">Register No.</label>
                <input className="od-input" value={regNo} disabled />
              </div>
            </div>

            {/* Event info */}
            <div className="od-section-label">Event Information</div>
            <div className="od-grid-2">
              <div className="od-field">
                <label className="od-label">College Name</label>
                <input className="od-input" value={odData.collegeName} onChange={set("collegeName")} placeholder="Hosting institution" />
              </div>
              <div className="od-field">
                <label className="od-label">Event Name</label>
                <input className="od-input" value={odData.eventName} onChange={set("eventName")} placeholder="Name of the event" />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="od-field">
                <label className="od-label">Place of Competition</label>
                <input className="od-input" value={odData.place} onChange={set("place")} placeholder="City / Venue" />
              </div>
            </div>

            {/* Purpose */}
            <div className="od-section-label">Purpose of OD</div>
            <div className="od-purpose-row">
              {purposes.map((p) => (
                <button
                  key={p}
                  className={`od-purpose-pill${odData.purpose === p ? " selected" : ""}`}
                  onClick={() => setOdData({ ...odData, purpose: p })}
                  type="button"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Dates */}
            <div className="od-section-label">Duration</div>
            <div className="od-grid-3">
              <div className="od-field">
                <label className="od-label">Date of Competition</label>
                <input className="od-input" type="date" value={odData.date} onChange={set("date")} />
              </div>
              <div className="od-field">
                <label className="od-label">From Date</label>
                <input className="od-input" type="date" value={odData.fromDate} onChange={set("fromDate")} />
              </div>
              <div className="od-field">
                <label className="od-label">To Date</label>
                <input className="od-input" type="date" value={odData.toDate} onChange={set("toDate")} />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="od-field">
                <label className="od-label">Number of Days</label>
                <input
                  className="od-input"
                  type="number"
                  value={odData.numberOfDays}
                  onChange={set("numberOfDays")}
                  placeholder="e.g. 2"
                  style={{ maxWidth: 200 }}
                />
              </div>
            </div>

            {/* Proof Upload */}
            <div className="od-section-label">Supporting Proof</div>
            <input
              type="file"
              id="proofUpload"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="proofUpload">
              <div className={`od-upload-area${proof ? " has-file" : ""}`}>
                <div className="od-upload-icon">{proof ? "✅" : "📎"}</div>
                {proof ? (
                  <div className="od-upload-filename">{proof.name}</div>
                ) : (
                  <>
                    <div className="od-upload-text">Click to upload proof document</div>
                    <div className="od-upload-sub">Supports JPG, PNG, PDF</div>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* ── FOOTER ── */}
          <div className="od-footer">
            <div className="od-footer-note">
              {student
                ? <>Submitting for <strong>{student.studentName}</strong> · {regNo}</>
                : "Fill all fields before proceeding"}
            </div>
            <button
              className="od-next-btn"
              onClick={() => validateOD() && setStep(2)}
            >
              NEXT →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <Outpass2
          regNo={odData.regNo}
          forOd={true}
          onSubmit={(data) => handleFinalSubmit(data)}
        />
      )}
    </div>
  );
};

export default ODform;