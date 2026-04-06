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
    --red: #ef4444;
    --red-bg: #fee2e2;
    --border: rgba(10, 191, 184, 0.15);
    --border-input: #e2eaf0;
    --shadow-md: 0 4px 24px rgba(13, 31, 45, 0.10);
    --radius: 16px;
  }

  .bf-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .bf-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    padding: 28px 24px 48px;
  }

  /* ── WRAPPER ── */
  .bf-wrapper {
    max-width: 920px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  /* ── HEADER BANNER ── */
  .bf-header {
    height: 90px;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 45%, #0d5c8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 14px;
  }
  .bf-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }
  .bf-header-rings {
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 50px solid rgba(255,255,255,0.05);
    box-shadow: 0 0 0 30px rgba(255,255,255,0.03);
  }
  .bf-header-icon {
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
  .bf-header-text { z-index: 1; }
  .bf-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: white;
    letter-spacing: 2px;
  }
  .bf-header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 2px; }

  /* ── BODY ── */
  .bf-body { padding: 28px 32px 8px; }

  /* ── SECTION LABEL ── */
  .bf-section-label {
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
  .bf-section-label:first-child { margin-top: 0; }
  .bf-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── STUDENT PILL ── */
  .bf-student-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--teal-light);
    border: 1px solid rgba(10,191,184,0.2);
    border-radius: 12px;
    padding: 10px 16px;
    margin-bottom: 20px;
  }
  .bf-student-dot {
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
  .bf-student-name { font-weight: 600; font-size: 14px; color: var(--navy); }
  .bf-student-meta { font-size: 12px; color: var(--slate); margin-top: 1px; }

  /* ── GRIDS ── */
  .bf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .bf-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .bf-grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }

  /* ── FIELD ── */
  .bf-field { display: flex; flex-direction: column; gap: 6px; }
  .bf-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ── INPUT / SELECT ── */
  .bf-input, .bf-select {
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
  .bf-input:focus, .bf-select:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  .bf-input:disabled, .bf-select:disabled {
    background: var(--surface);
    color: var(--slate);
    cursor: default;
  }
  .bf-input::placeholder { color: #c5d4de; }
  .bf-input.error, .bf-select.error {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
  }

  /* SELECT arrow */
  .bf-select-wrap { position: relative; }
  .bf-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    font-size: 12px;
  }
  .bf-select { padding-right: 32px; cursor: pointer; }

  /* ── ERROR MSG ── */
  .bf-error {
    font-size: 11px;
    color: var(--red);
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: -2px;
  }

  /* ── ACCOMMODATION BADGE ── */
  .bf-accom-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 2px;
  }
  .bf-accom-badge.hosteller {
    background: rgba(10,191,184,0.1);
    color: var(--teal-dark);
    border: 1px solid rgba(10,191,184,0.25);
  }
  .bf-accom-badge.dayscholar {
    background: rgba(245,158,11,0.1);
    color: #92400e;
    border: 1px solid rgba(245,158,11,0.25);
  }

  /* ── FOOTER ── */
  .bf-footer {
    padding: 20px 32px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid var(--border);
    margin-top: 12px;
  }
  .bf-footer-note { font-size: 12px; color: var(--muted); }
  .bf-footer-note strong { color: var(--slate); }

  .bf-submit-btn {
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
  .bf-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(10,191,184,0.45); }
  .bf-submit-btn:active { transform: scale(0.97); }

  @media (max-width: 700px) {
    .bf-body { padding: 20px 16px 8px; }
    .bf-grid-2, .bf-grid-3, .bf-grid-4 { grid-template-columns: 1fr; }
    .bf-footer { flex-direction: column; align-items: flex-end; }
  }
`;

// ── Field must be defined OUTSIDE BonafideForm so it isn't recreated on every render ──
const Field = ({ id, label, errors, children }) => (
  <div className="bf-field">
    <label className="bf-label">{label}</label>
    {children}
    {errors?.[id] && <span className="bf-error">⚠ {errors[id]}</span>}
  </div>
);

const BonafideForm = ({ regNo: passedRegNo }) => {
  const location = useLocation();
  const [regNo, setRegNo] = useState(passedRegNo || location.state?.regNo || "");
  const [student, setStudent] = useState(null);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const e = {};
    if (!form.reason?.trim()) e.reason = "Reason is required";
    if (!form.fatherName?.trim()) e.fatherName = "Father/Guardian name required";
    if (!form.semester) e.semester = "Select a semester";
    if (!form.houseno) e.houseno = "House number required";
    if (!form.date_of_birth) {
      e.date_of_birth = "Date of Birth is required";
    } else {
      const dob = new Date(form.date_of_birth);
      if (dob.toString() === "Invalid Date") e.date_of_birth = "Invalid date";
      else if (dob > new Date()) e.date_of_birth = "DOB cannot be in the future";
    }
    if (!form.age) e.age = "Age is required";
    else if (form.age <= 0) e.age = "Enter a valid age";
    if (!form.street?.trim()) e.street = "Street is required";
    if (!form.area) e.area = "Area required";
    if (!form.city) e.city = "City required";
    if (!form.state) e.state = "State required";
    if (!form.pincode) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Pincode must be 6 digits";
    if (!form.category || form.category === "Select Category") e.category = "Select category";
    if (!form.fees_detail_year || form.fees_detail_year === "Year") e.fees_detail_year = "Select year";
    if (student?.accommodation === "Dayscholar" && !form.boarding?.trim()) e.boarding = "Boarding place required";
    if (!form.type_of_application || form.type_of_application === "Select the Type of Bonafide") e.type_of_application = "Select type of application";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fetchStudent = async (reg = regNo) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bonafide/${reg}`);
      setStudent(res.data);
    } catch (err) {
      alert("❌ Student not found");
    }
  };

  useEffect(() => {
    if (regNo) fetchStudent(regNo);
  }, [regNo]);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      await axios.post("http://localhost:5000/api/bonafide", { regNo, ...form });
      alert("✅ Bonafide application submitted successfully!");
    } catch {
      alert("❌ Failed to submit bonafide form");
    }
  };

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: "" });
  };

  const initials = student?.studentName
    ? student.studentName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const isDayscholar = student?.accommodation === "Dayscholar";

  return (
    <div className="bf-root">
      <style>{styles}</style>

      <div className="bf-wrapper">
        {/* ── BANNER ── */}
        <div className="bf-header">
          <div className="bf-header-rings" />
          <div className="bf-header-icon">📜</div>
          <div className="bf-header-text">
            <div className="bf-header-title">BONAFIDE CERTIFICATE</div>
            <div className="bf-header-sub">Application Form · Student Request</div>
          </div>
        </div>

        <div className="bf-body">

          {/* ── STUDENT DETAILS ── */}
          <div className="bf-section-label">Student Identity</div>

          {student && (
            <div className="bf-student-pill">
              <div className="bf-student-dot">{initials}</div>
              <div>
                <div className="bf-student-name">{student.studentName}</div>
                <div className="bf-student-meta">
                  Reg. {regNo} · {student.branch} · {student.year} Year
                </div>
              </div>
            </div>
          )}

          <div className="bf-grid-2">
            <Field errors={errors} id="regNo" label="Register Number">
              <input
                className="bf-input"
                type="number"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="12-digit register number"
              />
            </Field>
            <Field errors={errors} id="name" label="Student Name">
              <input className="bf-input" value={student?.studentName || ""} disabled placeholder="Auto-filled" />
            </Field>
          </div>

          <div className="bf-grid-3" style={{ marginTop: 16 }}>
            <Field errors={errors} id="branch" label="Branch">
              <input className="bf-input" value={student?.branch || ""} disabled placeholder="Auto-filled" />
            </Field>
            <Field errors={errors} id="semester" label="Semester">
              <div className="bf-select-wrap">
                <select className={`bf-select${errors.semester ? " error" : ""}`} onChange={set("semester")}>
                  <option value="">Select semester</option>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </Field>
            <Field errors={errors} id="fatherName" label="Father / Guardian Name">
              <input
                className={`bf-input${errors.fatherName ? " error" : ""}`}
                placeholder="Full name"
                onChange={set("fatherName")}
              />
            </Field>
          </div>

          {/* ── PURPOSE & TYPE ── */}
          <div className="bf-section-label">Application Details</div>
          <div className="bf-grid-2">
            <Field errors={errors} id="reason" label="Reason for Bonafide">
              <input
                className={`bf-input${errors.reason ? " error" : ""}`}
                placeholder="Why do you need this certificate?"
                onChange={set("reason")}
              />
            </Field>
            <Field errors={errors} id="type_of_application" label="Type of Bonafide">
              <div className="bf-select-wrap">
                <select
                  className={`bf-select${errors.type_of_application ? " error" : ""}`}
                  onChange={set("type_of_application")}
                >
                  <option value="">Select type</option>
                  <option>WITH FEE STRUCTURE</option>
                  <option>WITHOUT FEE STRUCTURE</option>
                  <option>INPLANT TRAINING / PROJECT WORK</option>
                  <option>PAPER PRESENTATION</option>
                  <option>GENERAL</option>
                </select>
              </div>
            </Field>
          </div>

          <div className="bf-grid-2" style={{ marginTop: 16 }}>
            <Field errors={errors} id="category" label="Admission Category">
              <div className="bf-select-wrap">
                <select className={`bf-select${errors.category ? " error" : ""}`} onChange={set("category")}>
                  <option value="">Select category</option>
                  <option>GOVERNMENT QUOTA</option>
                  <option>MANAGEMENT QUOTA</option>
                </select>
              </div>
            </Field>
            <Field errors={errors} id="fees_detail_year" label="Fees Detail Required Year">
              <div className="bf-select-wrap">
                <select className={`bf-select${errors.fees_detail_year ? " error" : ""}`} onChange={set("fees_detail_year")}>
                  <option value="">Select year</option>
                  <option>I Year</option>
                  <option>II Year</option>
                  <option>III Year</option>
                  <option>IV Year</option>
                </select>
              </div>
            </Field>
          </div>

          {/* ── PERSONAL INFO ── */}
          <div className="bf-section-label">Personal Information</div>
          <div className="bf-grid-3">
            <Field errors={errors} id="date_of_birth" label="Date of Birth">
              <input
                className={`bf-input${errors.date_of_birth ? " error" : ""}`}
                type="date"
                onChange={set("date_of_birth")}
              />
            </Field>
            <Field errors={errors} id="age" label="Age">
              <input
                className={`bf-input${errors.age ? " error" : ""}`}
                type="number"
                placeholder="e.g. 20"
                onChange={set("age")}
              />
            </Field>
            <Field errors={errors} id="accommodation" label="Accommodation">
              <input className="bf-input" value={student?.accommodation || ""} disabled placeholder="Auto-filled" />
              {student && (
                <span className={`bf-accom-badge ${isDayscholar ? "dayscholar" : "hosteller"}`}>
                  {isDayscholar ? "🏠 Day Scholar" : "🏨 Hosteller"}
                </span>
              )}
            </Field>
          </div>

          {/* ── ADDRESS ── */}
          <div className="bf-section-label">Address</div>
          <div className="bf-grid-2">
            <Field errors={errors} id="houseno" label="House No.">
              <input
                className={`bf-input${errors.houseno ? " error" : ""}`}
                placeholder="e.g. 12/A"
                onChange={set("houseno")}
              />
            </Field>
            <Field errors={errors} id="street" label="Street Name">
              <input
                className={`bf-input${errors.street ? " error" : ""}`}
                placeholder="Street / Road"
                onChange={set("street")}
              />
            </Field>
          </div>

          <div className="bf-grid-4" style={{ marginTop: 16 }}>
            <Field errors={errors} id="area" label="Area">
              <input className={`bf-input${errors.area ? " error" : ""}`} placeholder="Area" onChange={set("area")} />
            </Field>
            <Field errors={errors} id="city" label="City">
              <input className={`bf-input${errors.city ? " error" : ""}`} placeholder="City" onChange={set("city")} />
            </Field>
            <Field errors={errors} id="state" label="State">
              <input className={`bf-input${errors.state ? " error" : ""}`} placeholder="State" onChange={set("state")} />
            </Field>
            <Field errors={errors} id="pincode" label="Pincode">
              <input
                className={`bf-input${errors.pincode ? " error" : ""}`}
                type="number"
                placeholder="6 digits"
                onChange={set("pincode")}
              />
            </Field>
          </div>

          {/* ── BOARDING (conditional) ── */}
          {isDayscholar && (
            <>
              <div className="bf-section-label">Day Scholar Details</div>
              <div style={{ maxWidth: 360 }}>
                <Field errors={errors} id="boarding" label="Boarding Place">
                  <input
                    className={`bf-input${errors.boarding ? " error" : ""}`}
                    placeholder="Your boarding location"
                    onChange={set("boarding")}
                  />
                </Field>
              </div>
            </>
          )}

        </div>

        {/* ── FOOTER ── */}
        <div className="bf-footer">
          <div className="bf-footer-note">
            {student
              ? <>Submitting for <strong>{student.studentName}</strong> · {regNo}</>
              : "Complete all required fields before submitting"}
          </div>
          <button className="bf-submit-btn" onClick={handleSubmit}>
            SUBMIT APPLICATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default BonafideForm;