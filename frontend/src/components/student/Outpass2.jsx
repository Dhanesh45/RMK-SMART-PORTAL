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
    --green-bg: #e8faf1;
    --amber: #f59e0b;
    --border: rgba(10, 191, 184, 0.15);
    --border-input: #e2eaf0;
    --shadow-md: 0 4px 24px rgba(13, 31, 45, 0.10);
    --radius: 16px;
  }

  .op2-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .op2-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    padding: 28px 24px 48px;
  }

  /* ── WRAPPER ── */
  .op2-wrapper {
    max-width: 860px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  /* ── HEADER BANNER ── */
  .op2-header {
    height: 90px;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 45%, #0d5c8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 14px;
  }
  .op2-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }
  .op2-header-rings {
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 50px solid rgba(255,255,255,0.05);
    box-shadow: 0 0 0 30px rgba(255,255,255,0.03);
  }
  .op2-header-icon {
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
  .op2-header-text { z-index: 1; }
  .op2-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: white;
    letter-spacing: 2px;
  }
  .op2-header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  /* ── STEP INDICATOR ── */
  .op2-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 32px 0;
    gap: 0;
  }
  .op2-step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    max-width: 140px;
  }
  .op2-step-dot {
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
  .op2-step-dot.active {
    background: linear-gradient(135deg, var(--teal) 0%, #0d8fa6 100%);
    color: white;
    box-shadow: 0 4px 16px rgba(10,191,184,0.35);
  }
  .op2-step-dot.done {
    background: var(--green-bg);
    color: var(--green);
    border: 2px solid rgba(18,194,100,0.3);
  }
  .op2-step-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
  }
  .op2-step-label.active { color: var(--teal-dark); }
  .op2-step-label.done { color: var(--green); }
  .op2-step-connector {
    flex: 1;
    height: 2px;
    max-width: 80px;
    margin-bottom: 22px;
    background: var(--teal);
  }

  /* ── BODY ── */
  .op2-body { padding: 24px 32px 32px; }

  /* ── SECTION LABEL ── */
  .op2-section-label {
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
  .op2-section-label:first-child { margin-top: 0; }
  .op2-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── STUDENT PILL ── */
  .op2-student-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--teal-light);
    border: 1px solid rgba(10,191,184,0.2);
    border-radius: 12px;
    padding: 10px 16px;
    margin-bottom: 24px;
  }
  .op2-student-dot {
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
  .op2-student-name { font-weight: 600; font-size: 14px; color: var(--navy); }
  .op2-student-meta { font-size: 12px; color: var(--slate); margin-top: 1px; }

  /* ── OD BADGE ── */
  .op2-od-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: var(--teal-light);
    color: var(--teal-dark);
    border: 1px solid rgba(10,191,184,0.25);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  /* ── GRIDS ── */
  .op2-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .op2-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* ── FIELD ── */
  .op2-field { display: flex; flex-direction: column; gap: 6px; }
  .op2-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .op2-input {
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
  .op2-input:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  .op2-input:disabled {
    background: var(--surface);
    color: var(--slate);
    cursor: default;
  }
  .op2-input::placeholder { color: #c5d4de; }

  /* ── FOOTER ── */
  .op2-footer {
    padding: 20px 32px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid var(--border);
  }
  .op2-footer-note { font-size: 12px; color: var(--muted); }
  .op2-footer-note strong { color: var(--slate); }

  .op2-submit-btn {
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
  .op2-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(10,191,184,0.45); }
  .op2-submit-btn:active { transform: scale(0.97); }

  @media (max-width: 640px) {
    .op2-body { padding: 20px 16px; }
    .op2-grid-2, .op2-grid-3 { grid-template-columns: 1fr; }
    .op2-footer { flex-direction: column; align-items: flex-end; }
  }
`;

const Outpass2 = ({ regNo: passedRegNo, onSubmit, forOd }) => {
  const location = useLocation();
  const [regNo] = useState(passedRegNo || location.state?.regNo || "");
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
    if (regNo) fetchStudent(regNo);
  }, []);

  const handleSubmit = () => {
    for (let key in form) {
      if (!form[key]) { alert("❌ Fill all Outpass fields"); return; }
    }
    if (new Date(form.fromDate) > new Date(form.toDate)) {
      alert("❌ From Date must be before To Date"); return;
    }
    onSubmit({ regNo, ...form, forOd: forOd ? "Yes" : "No" });
  };

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const initials = student?.studentName
    ? student.studentName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="op2-root">
      <style>{styles}</style>

      <div className="op2-wrapper">
        {/* ── BANNER ── */}
        <div className="op2-header">
          <div className="op2-header-rings" />
          <div className="op2-header-icon">🎫</div>
          <div className="op2-header-text">
            <div className="op2-header-title">OUTPASS</div>
            <div className="op2-header-sub">
              {forOd ? "Step 2 of 2 · OD Departure Details" : "Leave & On-Duty Request Form"}
            </div>
          </div>
        </div>

        {/* ── STEP INDICATOR (only for OD flow) ── */}
        {forOd && (
          <div className="op2-steps">
            <div className="op2-step-item">
              <div className="op2-step-dot done">✓</div>
              <div className="op2-step-label done">OD Details</div>
            </div>
            <div className="op2-step-connector" />
            <div className="op2-step-item">
              <div className="op2-step-dot active">2</div>
              <div className="op2-step-label active">Outpass</div>
            </div>
          </div>
        )}

        {/* ── BODY ── */}
        <div className="op2-body">

          {/* Student identity */}
          <div className="op2-section-label">Student</div>

          {forOd && (
            <div className="op2-od-badge">
              📋 OD Request · Departure outpass
            </div>
          )}

          {student && (
            <div className="op2-student-pill">
              <div className="op2-student-dot">{initials}</div>
              <div>
                <div className="op2-student-name">{student.studentName}</div>
                <div className="op2-student-meta">
                  Reg. {regNo} · {student.year} Year · {student.branch}
                </div>
              </div>
            </div>
          )}

          <div className="op2-grid-2">
            <div className="op2-field">
              <label className="op2-label">Registration Number</label>
              <input className="op2-input" value={regNo} disabled />
            </div>
            {student && (
              <div className="op2-field">
                <label className="op2-label">Name</label>
                <input className="op2-input" value={student.studentName} disabled />
              </div>
            )}
          </div>

          {student && (
            <>
              {/* Stay & Duration */}
              <div className="op2-section-label">Stay & Duration</div>
              <div className="op2-grid-3">
                <div className="op2-field">
                  <label className="op2-label">Room No.</label>
                  <input className="op2-input" placeholder="e.g. A-204" onChange={f("roomNumber")} />
                </div>
                <div className="op2-field">
                  <label className="op2-label">No. of Days</label>
                  <input className="op2-input" placeholder="e.g. 3" onChange={f("noOfDays")} />
                </div>
                <div className="op2-field">
                  <label className="op2-label">Reason</label>
                  <input className="op2-input" placeholder="Brief reason…" onChange={f("reasonForLeave")} />
                </div>
              </div>

              <div className="op2-grid-2" style={{ marginTop: 16 }}>
                <div className="op2-field">
                  <label className="op2-label">From Date</label>
                  <input className="op2-input" type="date" onChange={f("fromDate")} />
                </div>
                <div className="op2-field">
                  <label className="op2-label">To Date</label>
                  <input className="op2-input" type="date" onChange={f("toDate")} />
                </div>
              </div>

              {/* Departure */}
              <div className="op2-section-label">Departure</div>
              <div className="op2-grid-2">
                <div className="op2-field">
                  <label className="op2-label">Leaving Date</label>
                  <input className="op2-input" type="date" onChange={f("leavingDate")} />
                </div>
                <div className="op2-field">
                  <label className="op2-label">Leaving Time</label>
                  <input className="op2-input" type="time" onChange={f("leavingTime")} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── FOOTER ── */}
        {student && (
          <div className="op2-footer">
            <div className="op2-footer-note">
              {forOd
                ? <>Final step — submitting OD + Outpass for <strong>{student.studentName}</strong></>
                : <>Submitting outpass for <strong>{student.studentName}</strong> · {regNo}</>
              }
            </div>
            <button className="op2-submit-btn" onClick={handleSubmit}>
              {forOd ? "SUBMIT OD & OUTPASS" : "SUBMIT OUTPASS"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Outpass2;