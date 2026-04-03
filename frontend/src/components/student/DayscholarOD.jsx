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

  .dod-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .dod-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    padding: 28px 24px 48px;
  }

  /* ── WRAPPER ── */
  .dod-wrapper {
    max-width: 900px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  /* ── HEADER BANNER ── */
  .dod-header {
    height: 90px;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 45%, #0d5c8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 14px;
  }
  .dod-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }
  .dod-header-rings {
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 50px solid rgba(255,255,255,0.05);
    box-shadow: 0 0 0 30px rgba(255,255,255,0.03);
  }
  .dod-header-icon {
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
  .dod-header-text { z-index: 1; }
  .dod-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: white;
    letter-spacing: 2px;
  }
  .dod-header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  /* ── BODY ── */
  .dod-body { padding: 28px 32px 8px; }

  /* ── SECTION LABEL ── */
  .dod-section-label {
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
  .dod-section-label:first-child { margin-top: 0; }
  .dod-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── STUDENT PILL ── */
  .dod-student-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--teal-light);
    border: 1px solid rgba(10,191,184,0.2);
    border-radius: 12px;
    padding: 10px 16px;
    margin-bottom: 16px;
  }
  .dod-student-dot {
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
  .dod-student-name { font-weight: 600; font-size: 14px; color: var(--navy); }
  .dod-student-meta { font-size: 12px; color: var(--slate); margin-top: 1px; }

  /* ── DAY SCHOLAR BADGE ── */
  .dod-badge {
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
  .dod-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .dod-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* ── FIELD ── */
  .dod-field { display: flex; flex-direction: column; gap: 6px; }
  .dod-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ── INPUT / SELECT ── */
  .dod-input, .dod-select {
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
  .dod-input:focus, .dod-select:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  .dod-input:disabled {
    background: var(--surface);
    color: var(--slate);
    cursor: default;
  }
  .dod-input::placeholder { color: #c5d4de; }

  /* SELECT arrow */
  .dod-select-wrap { position: relative; }
  .dod-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    font-size: 12px;
  }
  .dod-select { padding-right: 32px; cursor: pointer; }

  /* ── PURPOSE PILLS ── */
  .dod-purpose-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .dod-purpose-pill {
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
  .dod-purpose-pill:hover { border-color: var(--teal); color: var(--teal-dark); }
  .dod-purpose-pill.selected {
    background: var(--teal-light);
    border-color: var(--teal);
    color: var(--teal-dark);
    font-weight: 600;
    box-shadow: 0 0 0 3px var(--teal-glow);
  }

  /* ── COUNSELLOR NOTE ── */
  .dod-note-card {
    background: var(--surface);
    border: 1px solid var(--border-input);
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 13px;
    color: var(--muted);
    font-style: italic;
  }

  /* ── AVAILED INFO ── */
  .dod-availed-row {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--surface);
    border: 1px solid var(--border-input);
    border-radius: 10px;
    padding: 10px 14px;
  }
  .dod-availed-num {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--navy);
  }
  .dod-availed-label { font-size: 12px; color: var(--muted); }

  /* ── FILE UPLOAD ── */
  .dod-upload-area {
    border: 2px dashed var(--border-input);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: var(--surface);
  }
  .dod-upload-area:hover { border-color: var(--teal); background: var(--teal-light); }
  .dod-upload-area.has-file { border-color: var(--green); background: var(--green-bg); border-style: solid; }
  .dod-upload-icon { font-size: 26px; margin-bottom: 6px; }
  .dod-upload-text { font-size: 13px; color: var(--slate); }
  .dod-upload-sub { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .dod-upload-filename { font-size: 13px; color: var(--green); font-weight: 600; }

  /* ── FOOTER ── */
  .dod-footer {
    padding: 20px 32px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid var(--border);
    margin-top: 12px;
  }
  .dod-footer-note { font-size: 12px; color: var(--muted); }
  .dod-footer-note strong { color: var(--slate); }

  .dod-submit-btn {
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
  .dod-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(10,191,184,0.45); }
  .dod-submit-btn:active { transform: scale(0.97); }

  @media (max-width: 680px) {
    .dod-body { padding: 20px 16px 8px; }
    .dod-grid-2, .dod-grid-3 { grid-template-columns: 1fr; }
    .dod-footer { flex-direction: column; align-items: flex-end; }
  }
`;

const purposes = ["Competition", "Workshop", "Seminar", "Others"];

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
    date: "",
  });
  const [proof, setProof] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/dayscholar-od/${regNo}`);
        setStudent(res.data);
      } catch {
        alert("❌ Student not found");
      }
    };
    if (regNo) fetchStudent();
  }, [regNo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProof({
      type: file.type.startsWith("image/") ? "image" : "pdf",
      name: file.name,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/dayscholar-od", { regNo, ...form });
      alert("✅ Dayscholar OD applied successfully");
    } catch {
      alert("❌ OD submission failed");
    }
  };

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const initials = student?.studentName
    ? student.studentName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="dod-root">
      <style>{styles}</style>

      <div className="dod-wrapper">

        {/* ── BANNER ── */}
        <div className="dod-header">
          <div className="dod-header-rings" />
          <div className="dod-header-icon">📋</div>
          <div className="dod-header-text">
            <div className="dod-header-title">DAY SCHOLAR OD FORM</div>
            <div className="dod-header-sub">On-Duty Request · Day Scholar Students</div>
          </div>
        </div>

        <div className="dod-body">

          {/* ── STUDENT DETAILS ── */}
          <div className="dod-section-label">Student Details</div>

          {student && (
            <>
              <div className="dod-student-pill">
                <div className="dod-student-dot">{initials}</div>
                <div>
                  <div className="dod-student-name">{student.studentName}</div>
                  <div className="dod-student-meta">Reg. {regNo} · {student.branch}</div>
                </div>
              </div>
              <div className="dod-badge">🏠 Day Scholar</div>
            </>
          )}

          <div className="dod-grid-3">
            <div className="dod-field">
              <label className="dod-label">Student Name</label>
              <input className="dod-input" value={student?.studentName || ""} disabled placeholder="Auto-filled" />
            </div>
            <div className="dod-field">
              <label className="dod-label">Department</label>
              <input className="dod-input" value={student?.branch || ""} disabled placeholder="Auto-filled" />
            </div>
            <div className="dod-field">
              <label className="dod-label">Register Number</label>
              <input className="dod-input" value={regNo} disabled />
            </div>
          </div>

          {/* ── EVENT INFO ── */}
          <div className="dod-section-label">Event Information</div>
          <div className="dod-grid-2">
            <div className="dod-field">
              <label className="dod-label">College Name</label>
              <input className="dod-input" value={form.collegeName} onChange={f("collegeName")} placeholder="Hosting institution" />
            </div>
            <div className="dod-field">
              <label className="dod-label">Event Name</label>
              <input className="dod-input" value={form.eventName} onChange={f("eventName")} placeholder="Name of the event" />
            </div>
          </div>
          <div className="dod-field" style={{ marginTop: 16 }}>
            <label className="dod-label">Place of Competition</label>
            <input className="dod-input" value={form.place} onChange={f("place")} placeholder="City / Venue" />
          </div>

          {/* ── PURPOSE ── */}
          <div className="dod-section-label">Purpose of OD</div>
          <div className="dod-purpose-row">
            {purposes.map((p) => (
              <button
                key={p}
                type="button"
                className={`dod-purpose-pill${form.purpose === p ? " selected" : ""}`}
                onClick={() => setForm({ ...form, purpose: p })}
              >
                {p}
              </button>
            ))}
          </div>

          {/* ── DURATION ── */}
          <div className="dod-section-label">Duration</div>
          <div className="dod-grid-3">
            <div className="dod-field">
              <label className="dod-label">Date of Competition</label>
              <input className="dod-input" type="date" value={form.date} onChange={f("date")} />
            </div>
            <div className="dod-field">
              <label className="dod-label">From Date</label>
              <input className="dod-input" type="date" value={form.fromDate} onChange={f("fromDate")} />
            </div>
            <div className="dod-field">
              <label className="dod-label">To Date</label>
              <input className="dod-input" type="date" value={form.toDate} onChange={f("toDate")} />
            </div>
          </div>

          <div className="dod-field" style={{ marginTop: 16, maxWidth: 200 }}>
            <label className="dod-label">Number of Days</label>
            <input className="dod-input" type="number" value={form.numberOfDays} onChange={f("numberOfDays")} placeholder="e.g. 2" />
          </div>

          {/* ── OD AVAILED & COUNSELLOR ── */}
          <div className="dod-section-label">Additional Info</div>
          <div className="dod-grid-2">
            <div className="dod-field">
              <label className="dod-label">OD Days Already Availed (This Semester)</label>
              <input className="dod-input" type="number" placeholder="e.g. 3" />
            </div>
            <div className="dod-field">
              <label className="dod-label">Comments by Counsellor</label>
              <div className="dod-note-card">Filled by counsellor after review</div>
            </div>
          </div>

          {/* ── PROOF UPLOAD ── */}
          <div className="dod-section-label">Supporting Proof</div>
          <input
            type="file"
            id="proofUpload"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="proofUpload">
            <div className={`dod-upload-area${proof ? " has-file" : ""}`}>
              <div className="dod-upload-icon">{proof ? "✅" : "📎"}</div>
              {proof ? (
                <div className="dod-upload-filename">{proof.name}</div>
              ) : (
                <>
                  <div className="dod-upload-text">Click to upload proof document</div>
                  <div className="dod-upload-sub">Supports JPG, PNG, PDF</div>
                </>
              )}
            </div>
          </label>

        </div>

        {/* ── FOOTER ── */}
        <div className="dod-footer">
          <div className="dod-footer-note">
            {student
              ? <>Submitting OD for <strong>{student.studentName}</strong> · {regNo}</>
              : "Complete all fields before submitting"}
          </div>
          <button className="dod-submit-btn" onClick={handleSubmit}>
            SUBMIT OD
          </button>
        </div>

      </div>
    </div>
  );
};

export default DayscholarOD;