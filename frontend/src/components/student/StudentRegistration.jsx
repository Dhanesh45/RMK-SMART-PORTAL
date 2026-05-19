// StudentRegistration.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    student_mail: "",
    password: "",
    regNo: "",
    year: "",
    branch: "",
    student_name: "",
    gender: "",
    accommodation: "",
    parent_name: "",
    parent_phone: "",
    native: "",
    counsellor: "",
    year_coordinator: "",
    hod: "",
    section: "",
  });

  const [counsellors, setCounsellors] = useState([]);
  const [yearCoordinators, setYearCoordinators] = useState([]);
  const [hods, setHods] = useState([]);

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!formData.branch) return;
    axios.get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/counsellor`)
      .then(res => setCounsellors(res.data));
    axios.get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/year_coordinator`)
      .then(res => setYearCoordinators(res.data));
    axios.get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/hod`)
      .then(res => setHods(res.data));
  }, [formData.branch]);

  const validateStep1 = () => {
    const newErrors = {};
    const fields = [
      "student_name","regNo","student_mail","password",
      "gender","accommodation","parent_name","parent_phone",
      "native","branch","year"
    ];
    fields.forEach(f => { if (!formData[f]) newErrors[f] = "Required"; });
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach(f => {
      if (!formData[f]) newErrors[f] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return alert("Fill all fields");
    try {
      const res = await axios.post("http://localhost:5000/api/student/register", formData);
      alert(res.data.message);
      navigate("/StuDash", {
        state: { accommodation: formData.accommodation, regNo: formData.regNo }
      });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#d0d8e0",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        .rmk-reg-card {
          width: 85vw;
          min-height: 600px;
          height: 85vh;
          display: flex;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.22);
          font-family: 'Nunito', 'Segoe UI', sans-serif;
        }

        /* ── LEFT PANEL ── */
        .rmk-reg-left {
          width: 52%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px;
          border-radius: 18px;
          overflow: hidden;
          background: #1a2e3a;
          flex-shrink: 0;
          align-self: stretch;
        }

        .rmk-reg-left-bg {
          position: absolute;
          inset: 0;
          background-image: url('/college.jpg');
          background-size: cover;
          background-position: center top;
          filter: brightness(1);
          border-radius: 18px;
        }

        .rmk-reg-left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(20, 40, 55, 0.15) 0%,
            rgba(20, 40, 55, 0.6) 55%,
            rgba(20, 40, 55, 0.88) 100%
          );
          border-radius: 18px;
        }

        .rmk-reg-logo-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          width: 64px;
          height: 64px;
          background: rgba(255,255,255,0.92);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          z-index: 2;
        }

        .rmk-reg-logo-inner {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #c8a84b, #e8c86a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 900;
          color: #1a2e3a;
          letter-spacing: -1px;
        }

        .rmk-reg-left-content {
          position: relative;
          z-index: 2;
        }

        .rmk-reg-welcome {
          font-size: 15px;
          font-weight: 700;
          color: #7be0cb;
          letter-spacing: 0.05em;
          margin: 0 0 6px 0;
          text-transform: uppercase;
        }

        .rmk-reg-portal-title {
          font-size: 38px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.05;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
        }

        .rmk-reg-tagline {
          font-size: 13.5px;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin: 0 0 24px 0;
          font-weight: 500;
        }

        .rmk-reg-divider {
          width: 36px;
          height: 3px;
          background: #7be0cb;
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .rmk-reg-badges {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255,255,255,0.80);
          font-weight: 600;
        }

        .rmk-reg-shield {
          width: 18px;
          height: 18px;
          color: #7be0cb;
          margin-right: 4px;
          flex-shrink: 0;
        }

        .rmk-reg-dot-sep {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }

        /* ── RIGHT PANEL ── */
        .rmk-reg-right {
          width: 48%;
          background: #f4f6f8;
          display: flex;
          flex-direction: column;
          padding: 36px 44px;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Dot grid top-right */
        .rmk-reg-dots {
          position: absolute;
          top: 20px;
          right: 20px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
          opacity: 0.25;
          pointer-events: none;
        }
        .rmk-reg-dot-sm {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #1a3a4f;
        }

        /* Arc decorations */
        .rmk-reg-arc {
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 28px solid rgba(123,224,203,0.12);
          pointer-events: none;
        }
        .rmk-reg-arc2 {
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 20px solid rgba(123,224,203,0.07);
          pointer-events: none;
        }

        /* Step indicator */
        .rmk-reg-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 22px;
        }
        .rmk-reg-step-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .rmk-reg-step-pill.active {
          background: #1a2e3a;
          color: #ffffff;
        }
        .rmk-reg-step-pill.done {
          background: #7be0cb;
          color: #1a2e3a;
        }
        .rmk-reg-step-pill.inactive {
          background: #e0eaf0;
          color: #7a9ab0;
        }
        .rmk-reg-step-connector {
          width: 28px;
          height: 2px;
          background: #d0dce6;
          border-radius: 1px;
        }

        .rmk-reg-form-title {
          font-size: 20px;
          font-weight: 800;
          color: #1a2e3a;
          letter-spacing: 0.06em;
          margin: 0 0 20px 0;
          text-align: center;
          text-transform: uppercase;
        }

        /* 1-column layout for fields */
        .rmk-reg-grid {
          display: flex;
          flex-direction: column;
        }
        .rmk-reg-grid .rmk-reg-field-full {
          width: 100%;
        }

        .rmk-reg-field {
          margin-bottom: 14px;
        }

        .rmk-reg-field-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #7a9ab0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 5px 0;
          display: block;
        }

        .rmk-reg-input,
        .rmk-reg-select {
          width: 100%;
          padding: 11px 14px;
          border: none;
          border-radius: 10px;
          font-size: 13.5px;
          color: #1a2e3a;
          background: #eaf0f5;
          outline: none;
          transition: background 0.2s, box-shadow 0.2s;
          font-family: 'Nunito', sans-serif;
          font-weight: 500;
          appearance: none;
          -webkit-appearance: none;
        }

        .rmk-reg-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a9ab0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .rmk-reg-input:focus,
        .rmk-reg-select:focus {
          background-color: #dff0ea;
          box-shadow: 0 0 0 3px rgba(123,224,203,0.30);
        }

        .rmk-reg-error-text {
          color: #e05555;
          font-size: 11px;
          font-weight: 600;
          margin-top: 3px;
          display: block;
        }

        /* Buttons row */
        .rmk-reg-btn-row {
          display: flex;
          gap: 12px;
          margin-top: 18px;
        }

        .rmk-reg-btn {
          flex: 1;
          padding: 13px;
          border-radius: 10px;
          border: none;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.22s, color 0.22s, transform 0.12s;
          font-family: 'Nunito', sans-serif;
        }

        .rmk-reg-btn.primary {
          background: #1a2e3a;
          color: #ffffff;
        }
        .rmk-reg-btn.primary:hover {
          background: #7be0cb;
          color: #1a2e3a;
          transform: translateY(-1px);
        }
        .rmk-reg-btn.secondary {
          background: #e0eaf0;
          color: #1a2e3a;
        }
        .rmk-reg-btn.secondary:hover {
          background: #c8d8e4;
          transform: translateY(-1px);
        }
        .rmk-reg-btn:active { transform: translateY(0); }

        .rmk-reg-login-link {
          text-align: center;
          margin-top: 16px;
          font-size: 13px;
          color: #3a5a70;
          font-weight: 600;
        }
        .rmk-reg-login-link span {
          color: #7be0cb;
          cursor: pointer;
          font-weight: 700;
          transition: color 0.2s;
        }
        .rmk-reg-login-link span:hover { color: #1a3a4f; }

        @media (max-width: 700px) {
          .rmk-reg-left { display: none; }
          .rmk-reg-right { width: 100%; padding: 28px 20px; }
          .rmk-reg-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rmk-reg-card">

        {/* ── LEFT PANEL ── */}
        <div className="rmk-reg-left">
          <div className="rmk-reg-left-bg" />
          <div className="rmk-reg-left-overlay" />

          <div className="rmk-reg-logo-badge">
            <div className="rmk-reg-logo-inner">RK</div>
          </div>

          <div className="rmk-reg-left-content">
            <p className="rmk-reg-welcome">Welcome to</p>
            <h1 className="rmk-reg-portal-title">RMK SMART<br />PORTAL</h1>
            <p className="rmk-reg-tagline">
              Less clicks. Multiple approvals.<br />Zero chaos.
            </p>
            <div className="rmk-reg-divider" />
            <div className="rmk-reg-badges">
              <svg className="rmk-reg-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure
              <div className="rmk-reg-dot-sep" />
              Reliable
              <div className="rmk-reg-dot-sep" />
              Seamless
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="rmk-reg-right">

          {/* Decorations */}
          <div className="rmk-reg-dots">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="rmk-reg-dot-sm" />
            ))}
          </div>
          <div className="rmk-reg-arc" />
          <div className="rmk-reg-arc2" />

          {/* Title */}
          <h2 className="rmk-reg-form-title">Student Registration</h2>

          {/* Step indicator */}
          <div className="rmk-reg-steps">
            <div className={`rmk-reg-step-pill ${step === 1 ? "active" : "done"}`}>
              {step > 1 ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : "01"}
              &nbsp;Personal Info
            </div>
            <div className="rmk-reg-step-connector" />
            <div className={`rmk-reg-step-pill ${step === 2 ? "active" : "inactive"}`}>
              02&nbsp;Faculty Details
            </div>
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="rmk-reg-grid">
              <RegInput name="student_name" label="Name" value={formData.student_name} onChange={handleChange} error={errors.student_name} />
              <RegInput name="regNo" label="Reg No" value={formData.regNo} onChange={handleChange} error={errors.regNo} />
              <RegInput name="student_mail" label="Email" type="email" value={formData.student_mail} onChange={handleChange} error={errors.student_mail} />
              <RegInput name="password" label="Password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
              <RegSelect name="gender" label="Gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} error={errors.gender} />
              <RegSelect name="accommodation" label="Accommodation" value={formData.accommodation} onChange={handleChange} options={["HOSTELLER", "DAYSCHOLAR"]} error={errors.accommodation} />
              <RegInput name="parent_name" label="Parent Name" value={formData.parent_name} onChange={handleChange} error={errors.parent_name} />
              <RegInput name="parent_phone" label="Parent Phone" value={formData.parent_phone} onChange={handleChange} error={errors.parent_phone} />
              <RegInput name="native" label="Native" value={formData.native} onChange={handleChange} error={errors.native} />
              <RegSelect name="branch" label="Branch" value={formData.branch} onChange={handleChange} options={["IT", "CSE", "AIDS", "ECE", "MECH", "CIVIL"]} error={errors.branch} />
              <RegSelect name="year" label="Year" value={formData.year} onChange={handleChange} options={["I", "II", "III", "IV"]} error={errors.year} />

              <div className="rmk-reg-btn-row rmk-reg-field-full">
                <button className="rmk-reg-btn primary" onClick={() => validateStep1() && setStep(2)}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="rmk-reg-grid">
              <RegDynamicSelect name="counsellor" label="Counsellor" list={counsellors} value={formData.counsellor} onChange={handleChange} error={errors.counsellor} />
              <RegDynamicSelect name="year_coordinator" label="Year Coordinator" list={yearCoordinators} value={formData.year_coordinator} onChange={handleChange} error={errors.year_coordinator} />
              <RegDynamicSelect name="hod" label="HOD" list={hods} value={formData.hod} onChange={handleChange} error={errors.hod} />
              <RegSelect name="section" label="Section" value={formData.section} onChange={handleChange} options={["A", "B", "C", "D", "E", "F"]} error={errors.section} />

              <div className="rmk-reg-btn-row" style={{ marginTop: "18px" }}>
                <button className="rmk-reg-btn secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="rmk-reg-btn primary" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          )}

          <p className="rmk-reg-login-link">
            Already registered?{" "}
            <span onClick={() => navigate("/StudentLogin")}>Login here</span>
          </p>

        </div>
      </div>
    </div>
  );
};

/* ── Sub-components ── */

const RegInput = ({ label, error, ...props }) => (
  <div className="rmk-reg-field">
    <label className="rmk-reg-field-label">{label}</label>
    <input className="rmk-reg-input" {...props} />
    {error && <span className="rmk-reg-error-text">{error}</span>}
  </div>
);

const RegSelect = ({ label, options, error, ...props }) => (
  <div className="rmk-reg-field">
    <label className="rmk-reg-field-label">{label}</label>
    <select className="rmk-reg-select" {...props}>
      <option value="">Select</option>
      {options.map((o, i) => <option key={i}>{o}</option>)}
    </select>
    {error && <span className="rmk-reg-error-text">{error}</span>}
  </div>
);

const RegDynamicSelect = ({ label, list, error, ...props }) => (
  <div className="rmk-reg-field">
    <label className="rmk-reg-field-label">{label}</label>
    <select className="rmk-reg-select" {...props}>
      <option value="">Select</option>
      {list.map((f, i) => (
        <option key={i} value={f.mail}>
          {f.faculty_name} - {f.mail}
        </option>
      ))}
    </select>
    {error && <span className="rmk-reg-error-text">{error}</span>}
  </div>
);

export default StudentRegistration;