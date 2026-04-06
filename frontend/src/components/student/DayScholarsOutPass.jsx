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
    --amber-bg: #fef3c7;
    --border: rgba(10, 191, 184, 0.15);
    --border-input: #e2eaf0;
    --shadow-md: 0 4px 24px rgba(13, 31, 45, 0.10);
    --radius: 16px;
  }

  .ds-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ds-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    padding: 28px 24px 48px;
  }

  /* ── WRAPPER ── */
  .ds-wrapper {
    max-width: 860px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  /* ── HEADER BANNER ── */
  .ds-header {
    height: 90px;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 45%, #0d5c8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 14px;
  }
  .ds-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }
  .ds-header-rings {
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 50px solid rgba(255,255,255,0.05);
    box-shadow: 0 0 0 30px rgba(255,255,255,0.03);
  }
  .ds-header-icon {
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
  .ds-header-text { z-index: 1; }
  .ds-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: white;
    letter-spacing: 2px;
  }
  .ds-header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  /* ── BODY ── */
  .ds-body { padding: 28px 32px 8px; }

  /* ── SECTION LABEL ── */
  .ds-section-label {
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
  .ds-section-label:first-child { margin-top: 0; }
  .ds-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── SEARCH ROW ── */
  .ds-search-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }
  .ds-search-row .ds-field { flex: 1; }
  .ds-search-btn {
    padding: 10px 20px;
    background: var(--navy);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
    height: 42px;
  }
  .ds-search-btn:hover { background: var(--navy-mid); }

  /* ── STUDENT PILL ── */
  .ds-student-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--teal-light);
    border: 1px solid rgba(10,191,184,0.2);
    border-radius: 12px;
    padding: 10px 16px;
    margin-bottom: 20px;
  }
  .ds-student-dot {
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
  .ds-student-name { font-weight: 600; font-size: 14px; color: var(--navy); }
  .ds-student-meta { font-size: 12px; color: var(--slate); margin-top: 1px; }

  /* ── DAY SCHOLAR BADGE ── */
  .ds-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: var(--amber-bg);
    color: #92400e;
    border: 1px solid rgba(245,158,11,0.25);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  /* ── GRIDS ── */
  .ds-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ds-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* ── FIELD ── */
  .ds-field { display: flex; flex-direction: column; gap: 6px; }
  .ds-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .ds-input {
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
  .ds-input:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  .ds-input:disabled {
    background: var(--surface);
    color: var(--slate);
    cursor: default;
  }
  .ds-input::placeholder { color: #c5d4de; }

  /* ── PARENT INFO CARD ── */
  .ds-parent-card {
    background: var(--surface);
    border: 1px solid var(--border-input);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ds-parent-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--navy);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .ds-parent-name { font-size: 13px; font-weight: 600; color: var(--navy); }
  .ds-parent-phone { font-size: 12px; color: var(--slate); margin-top: 2px; }

  /* ── FOOTER ── */
  .ds-footer {
    padding: 20px 32px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid var(--border);
    margin-top: 12px;
  }
  .ds-footer-note { font-size: 12px; color: var(--muted); }
  .ds-footer-note strong { color: var(--slate); }

  .ds-submit-btn {
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
  .ds-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(10,191,184,0.45); }
  .ds-submit-btn:active { transform: scale(0.97); }

  @media (max-width: 640px) {
    .ds-body { padding: 20px 16px 8px; }
    .ds-grid-2, .ds-grid-3 { grid-template-columns: 1fr; }
    .ds-footer { flex-direction: column; align-items: flex-end; }
  }
`;

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

  const fetchStudent = async (reg = regNo) => {
    if (!reg) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/dayscholarOutpass/student/${reg}`);
      setStudent(res.data);
    } catch {
      alert("❌ Student not found");
      setStudent(null);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [regNo]);

  const handleSubmit = async () => {
    if (!student || !student.regNo) {
      alert("❌ Please enter a valid student registration number first!");
      return;
    }
    if (!form.reason || !form.fromDate || !form.leavingTime) {
      alert("❌ Please fill all required fields!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/dayscholarOutpass/create", { regNo, ...form });
      alert("✅ Day Scholar Outpass submitted!");
      setForm({ reason: "", fromDate: "", toDate: "", leavingTime: "" });
    } catch (err) {
      alert("❌ Failed to submit outpass. Check console for details.");
    }
  };

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const initials = student?.studentName
    ? student.studentName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="ds-root">
      <style>{styles}</style>

      <div className="ds-wrapper">
        {/* ── BANNER ── */}
        <div className="ds-header">
          <div className="ds-header-rings" />
          <div className="ds-header-icon">🏠</div>
          <div className="ds-header-text">
            <div className="ds-header-title">DAY SCHOLAR OUTPASS</div>
            <div className="ds-header-sub">Leave Request · Day Scholar Students</div>
          </div>
        </div>

        <div className="ds-body">

          {/* ── STUDENT LOOKUP ── */}
          <div className="ds-section-label">Student Identification</div>

          <div className="ds-search-row">
            <div className="ds-field">
              <label className="ds-label">Registration Number</label>
              <input
                className="ds-input"
                type="text"
                placeholder="e.g. 111723203000"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>
            <button className="ds-search-btn" onClick={() => fetchStudent()}>
              Fetch →
            </button>
          </div>

          {student && (
            <>
              {/* Student identity pill */}
              <div style={{ marginTop: 16 }}>
                <div className="ds-student-pill">
                  <div className="ds-student-dot">{initials}</div>
                  <div>
                    <div className="ds-student-name">{student.studentName}</div>
                    <div className="ds-student-meta">
                      Reg. {regNo} · {student.branch}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ds-badge">🏠 Day Scholar</div>

              {/* Academic info */}
              <div className="ds-grid-2">
                <div className="ds-field">
                  <label className="ds-label">Branch</label>
                  <input className="ds-input" value={student.branch} disabled />
                </div>
                <div className="ds-field">
                  <label className="ds-label">Counsellor</label>
                  <input className="ds-input" value={student.counsellor} disabled />
                </div>
              </div>

              {/* Parent info card */}
              <div className="ds-section-label">Parent / Guardian</div>
              <div className="ds-parent-card">
                <div className="ds-parent-icon">👤</div>
                <div>
                  <div className="ds-parent-name">{student.parentName}</div>
                  <div className="ds-parent-phone">📞 {student.parentPhone}</div>
                </div>
              </div>

              {/* Leave details */}
              <div className="ds-section-label">Leave Details</div>
              <div className="ds-field" style={{ marginBottom: 16 }}>
                <label className="ds-label">Reason for Leaving</label>
                <input
                  className="ds-input"
                  placeholder="Brief reason for leaving campus…"
                  value={form.reason}
                  onChange={f("reason")}
                />
              </div>

              <div className="ds-grid-3">
                <div className="ds-field">
                  <label className="ds-label">From Date</label>
                  <input className="ds-input" type="date" value={form.fromDate} onChange={f("fromDate")} />
                </div>
                <div className="ds-field">
                  <label className="ds-label">To Date</label>
                  <input className="ds-input" type="date" value={form.toDate} onChange={f("toDate")} />
                </div>
                <div className="ds-field">
                  <label className="ds-label">Leaving Time</label>
                  <input className="ds-input" type="time" value={form.leavingTime} onChange={f("leavingTime")} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── FOOTER ── */}
        {student && (
          <div className="ds-footer">
            <div className="ds-footer-note">
              Submitting for <strong>{student.studentName}</strong> · {regNo}
            </div>
            <button className="ds-submit-btn" onClick={handleSubmit}>
              SUBMIT OUTPASS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayscholarOutpass;