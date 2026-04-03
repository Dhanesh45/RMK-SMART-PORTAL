import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
    --border: rgba(10, 191, 184, 0.15);
    --border-input: #e2eaf0;
    --shadow-sm: 0 2px 8px rgba(13, 31, 45, 0.06);
    --shadow-md: 0 4px 24px rgba(13, 31, 45, 0.10);
    --radius: 16px;
  }

  .op-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .op-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    padding: 28px 24px 48px;
  }

  /* ── WRAPPER ── */
  .op-wrapper {
    max-width: 860px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  /* ── HEADER BANNER ── */
  .op-header {
    height: 90px;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 45%, #0d5c8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 14px;
  }
  .op-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }
  .op-header-rings {
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 50px solid rgba(255,255,255,0.05);
    box-shadow: 0 0 0 30px rgba(255,255,255,0.03);
  }
  .op-header-icon {
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
  }
  .op-header-text { z-index: 1; }
  .op-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: white;
    letter-spacing: 2px;
  }
  .op-header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  /* ── BODY ── */
  .op-body { padding: 32px; }

  /* ── SECTION LABEL ── */
  .op-section-label {
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
  .op-section-label:first-child { margin-top: 0; }
  .op-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── GRID ── */
  .op-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .op-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .op-grid-full { margin-top: 16px; }
  .op-row { margin-top: 16px; display: grid; gap: 16px; }

  /* ── FIELD ── */
  .op-field { display: flex; flex-direction: column; gap: 6px; }

  .op-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }

  .op-input {
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
  .op-input:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  .op-input:disabled {
    background: var(--surface);
    color: var(--slate);
    cursor: default;
  }
  .op-input::placeholder { color: #c5d4de; }

  /* ── REG SEARCH ROW ── */
  .op-search-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }
  .op-search-row .op-field { flex: 1; }
  .op-search-btn {
    padding: 10px 20px;
    background: var(--navy);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    white-space: nowrap;
    height: 42px;
  }
  .op-search-btn:hover { background: var(--navy-mid); }
  .op-search-btn:active { transform: scale(0.97); }

  /* ── STUDENT CARD (auto-fill preview) ── */
  .op-student-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--teal-light);
    border: 1px solid rgba(10,191,184,0.2);
    border-radius: 12px;
    padding: 10px 16px;
    margin-top: 16px;
  }
  .op-student-dot {
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
  .op-student-name { font-weight: 600; font-size: 14px; color: var(--navy); }
  .op-student-meta { font-size: 12px; color: var(--slate); margin-top: 1px; }

  /* ── DIVIDER ── */
  .op-divider { height: 1px; background: var(--border); margin: 24px 0; }

  /* ── FOOTER / SUBMIT ── */
  .op-footer {
    padding: 20px 32px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid var(--border);
  }
  .op-footer-note { font-size: 12px; color: var(--muted); }
  .op-footer-note strong { color: var(--slate); }

  .op-submit-btn {
    padding: 12px 40px;
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
  .op-submit-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(10,191,184,0.45);
  }
  .op-submit-btn:active { transform: scale(0.97); }
  .op-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 640px) {
    .op-body { padding: 20px 16px; }
    .op-grid-2, .op-grid-3 { grid-template-columns: 1fr; }
    .op-footer { flex-direction: column; align-items: flex-end; }
  }
`;

const Outpass = ({ regNo: passedRegNo }) => {
  const location = useLocation();
  const [regNo, setRegNo] = useState(passedRegNo || location.state?.regNo || "");
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
    if (regNo) fetchStudent(regNo);
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/outpass", { regNo, ...form });
      alert("✅ Outpass submitted!");
    } catch {
      alert("❌ Failed to submit");
    }
  };

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const initials = student?.studentName
    ? student.studentName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="op-root">
      <style>{styles}</style>

      <div className="op-wrapper">
        {/* ── BANNER ── */}
        <div className="op-header">
          <div className="op-header-rings" />
          <div className="op-header-icon">🎫</div>
          <div className="op-header-text">
            <div className="op-header-title">OUTPASS</div>
            <div className="op-header-sub">Leave & On-Duty Request Form</div>
          </div>
        </div>

        {/* ── FORM BODY ── */}
        <div className="op-body">

          {/* Section: Student Lookup */}
          <div className="op-section-label">Student Identification</div>
          <div className="op-search-row">
            <div className="op-field">
              <label className="op-label">Registration Number</label>
              <input
                className="op-input"
                type="text"
                placeholder="e.g. 111723203000"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>
            <button className="op-search-btn" onClick={() => fetchStudent()}>
              Fetch →
            </button>
          </div>

          {/* Student pill */}
          {student && (
            <div className="op-student-pill">
              <div className="op-student-dot">{initials}</div>
              <div>
                <div className="op-student-name">{student.studentName}</div>
                <div className="op-student-meta">
                  {student.year} Year · {student.branch} · Parent: {student.parentName}
                </div>
              </div>
            </div>
          )}

          {student && (
            <>
              {/* Section: Academic Info */}
              <div className="op-section-label" style={{ marginTop: 24 }}>Academic Details</div>
              <div className="op-grid-3">
                <div className="op-field">
                  <label className="op-label">Year</label>
                  <input className="op-input" value={student.year} disabled />
                </div>
                <div className="op-field">
                  <label className="op-label">Branch</label>
                  <input className="op-input" value={student.branch} disabled />
                </div>
                <div className="op-field">
                  <label className="op-label">Room No.</label>
                  <input
                    className="op-input"
                    placeholder="e.g. A-204"
                    onChange={f("roomNumber")}
                  />
                </div>
              </div>

              <div className="op-grid-2" style={{ marginTop: 16 }}>
                <div className="op-field">
                  <label className="op-label">Parent Name</label>
                  <input className="op-input" value={student.parentName} disabled />
                </div>
                <div className="op-field">
                  <label className="op-label">Parent Phone</label>
                  <input className="op-input" value={student.parentPhone} disabled />
                </div>
              </div>

              {/* Section: Leave Details */}
              <div className="op-section-label" style={{ marginTop: 28 }}>Leave Details</div>
              <div className="op-grid-3">
                <div className="op-field">
                  <label className="op-label">No. of Days</label>
                  <input
                    className="op-input"
                    placeholder="e.g. 3"
                    onChange={f("noOfDays")}
                  />
                </div>
                <div className="op-field">
                  <label className="op-label">From Date</label>
                  <input className="op-input" type="date" onChange={f("fromDate")} />
                </div>
                <div className="op-field">
                  <label className="op-label">To Date</label>
                  <input className="op-input" type="date" onChange={f("toDate")} />
                </div>
              </div>

              <div className="op-grid-full" style={{ marginTop: 16 }}>
                <div className="op-field">
                  <label className="op-label">Reason for Leave</label>
                  <input
                    className="op-input"
                    placeholder="Brief reason for your leave request…"
                    onChange={f("reasonForLeave")}
                  />
                </div>
              </div>

              {/* Section: Departure */}
              <div className="op-section-label" style={{ marginTop: 28 }}>Departure Info</div>
              <div className="op-grid-2">
                <div className="op-field">
                  <label className="op-label">Leaving Date</label>
                  <input className="op-input" type="date" onChange={f("leavingDate")} />
                </div>
                <div className="op-field">
                  <label className="op-label">Leaving Time</label>
                  <input className="op-input" type="time" onChange={f("leavingTime")} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── FOOTER ── */}
        {student && (
          <div className="op-footer">
            <div className="op-footer-note">
              Submitting for <strong>{student.studentName}</strong> · {regNo}
            </div>
            <button className="op-submit-btn" onClick={handleSubmit}>
              SUBMIT OUTPASS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Outpass;