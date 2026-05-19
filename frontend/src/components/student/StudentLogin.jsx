// StudentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    student_mail: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.student_mail || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/student/login",
        formData
      );
      const { regNo, accommodation } = response.data.studentData;

      navigate("/StuDash", {
        state: {
          accommodation: accommodation,
          regNo: regNo,
        },
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#d0d8e0",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        .rmk-card {
          width: 85vw;
          min-height: 600px;
          display: flex;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.22);
          font-family: 'Nunito', 'Segoe UI', sans-serif;
        }

        /* ── LEFT PANEL ── */
        .rmk-left {
          width: 52%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px 36px 36px 36px;
          border-radius: 18px;
          overflow: hidden;
          background: #1a2e3a;
        }

        /* College photo as background */
        .rmk-left-bg {
          position: absolute;
          inset: 0;
          background-image: url('/college.jpg');
          background-size: cover;
          background-position: center top;
          filter: brightness(1);
          border-radius: 18px;
        }

        /* Dark gradient overlay at bottom */
        .rmk-left-overlay {
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

        /* Logo top-left */
        .rmk-logo-badge {
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

        .rmk-logo-inner {
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

        .rmk-left-content {
          position: relative;
          z-index: 2;
        }

        .rmk-welcome {
          font-size: 15px;
          font-weight: 700;
          color: #7be0cb;
          letter-spacing: 0.05em;
          margin: 0 0 6px 0;
          text-transform: uppercase;
        }

        .rmk-portal-title {
          font-size: 38px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.05;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
        }

        .rmk-tagline {
          font-size: 13.5px;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin: 0 0 24px 0;
          font-weight: 500;
        }

        .rmk-divider {
          width: 36px;
          height: 3px;
          background: #7be0cb;
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .rmk-badges {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255,255,255,0.80);
          font-weight: 600;
        }

        .rmk-shield {
          width: 18px;
          height: 18px;
          color: #7be0cb;
          margin-right: 4px;
          flex-shrink: 0;
        }

        .rmk-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }

        /* ── RIGHT PANEL ── */
        .rmk-right {
          width: 48%;
          background: #f4f6f8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 44px;
          position: relative;
        }

        /* Decorative dot grid top-right */
        .rmk-dots {
          position: absolute;
          top: 20px;
          right: 20px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
          opacity: 0.25;
        }
        .rmk-dot-sm {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #1a3a4f;
        }

        /* Decorative arc bottom-right */
        .rmk-arc {
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 28px solid rgba(123,224,203,0.12);
          pointer-events: none;
        }
        .rmk-arc2 {
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 20px solid rgba(123,224,203,0.07);
          pointer-events: none;
        }

        /* Icon circle */
        .rmk-icon-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #e0eaf0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px rgba(26,58,79,0.08);
        }

        .rmk-form-title {
          font-size: 22px;
          font-weight: 800;
          color: #1a2e3a;
          letter-spacing: 0.06em;
          margin: 0 0 28px 0;
          text-align: center;
          text-transform: uppercase;
        }

        .rmk-form {
          width: 100%;
        }

        .rmk-field {
          margin-bottom: 18px;
        }

        .rmk-field-label {
          font-size: 11px;
          font-weight: 700;
          color: #7a9ab0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 6px 0;
          display: block;
        }

        .rmk-input {
          width: 100%;
          padding: 13px 16px;
          border: none;
          border-radius: 10px;
          font-size: 14.5px;
          color: #1a2e3a;
          background: #eaf0f5;
          outline: none;
          transition: background 0.2s, box-shadow 0.2s;
          font-family: 'Nunito', sans-serif;
          font-weight: 500;
        }

        .rmk-input:focus {
          background: #dff0ea;
          box-shadow: 0 0 0 3px rgba(123,224,203,0.30);
        }

        .rmk-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          margin-top: 4px;
        }

        .rmk-show-pw {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          font-weight: 600;
          color: #3a5a70;
          cursor: pointer;
          user-select: none;
        }

        .rmk-show-pw input[type="checkbox"] {
          width: 15px;
          height: 15px;
          accent-color: #7be0cb;
          cursor: pointer;
        }

        .rmk-forgot {
          font-size: 13.5px;
          font-weight: 700;
          color: #7be0cb;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
        }

        .rmk-forgot:hover {
          color: #1a3a4f;
        }

        .rmk-error {
          color: #e05555;
          font-size: 13px;
          text-align: center;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .rmk-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: #1a2e3a;
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.22s, color 0.22s, transform 0.12s;
          font-family: 'Nunito', sans-serif;
        }

        .rmk-btn:hover {
          background: #7be0cb;
          color: #1a2e3a;
          transform: translateY(-1px);
        }

        .rmk-btn:active {
          transform: translateY(0);
        }

        .rmk-register {
          text-align: center;
          margin-top: 18px;
          font-size: 13.5px;
          color: #3a5a70;
          font-weight: 600;
        }

        .rmk-register-link {
          color: #7be0cb;
          cursor: pointer;
          font-weight: 700;
          transition: color 0.2s;
        }

        .rmk-register-link:hover {
          color: #1a3a4f;
        }

        @media (max-width: 640px) {
          .rmk-left { display: none; }
          .rmk-right { width: 100%; padding: 36px 24px; }
        }
      `}</style>

      <div className="rmk-card">
        {/* ── LEFT PANEL ── */}
        <div className="rmk-left">
          {/* College photo background */}
          <div className="rmk-left-bg" />
          <div className="rmk-left-overlay" />

          {/* Logo top-left */}
          <div className="rmk-logo-badge">
            <div className="rmk-logo-inner">RK</div>
          </div>

          {/* Text content */}
          <div className="rmk-left-content">
            <p className="rmk-welcome">Welcome to</p>
            <h1 className="rmk-portal-title">RMK SMART<br />PORTAL</h1>
            <p className="rmk-tagline">
              Less clicks. Multiple approvals.<br />Zero chaos.
            </p>
            <div className="rmk-divider" />
            <div className="rmk-badges">
              {/* Shield SVG */}
              <svg className="rmk-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure
              <div className="rmk-dot" />
              Reliable
              <div className="rmk-dot" />
              Seamless
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="rmk-right">
          {/* Dot grid decoration */}
          <div className="rmk-dots">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="rmk-dot-sm" />
            ))}
          </div>

          {/* Arc decorations */}
          <div className="rmk-arc" />
          <div className="rmk-arc2" />

          {/* Graduate icon */}
          <div className="rmk-icon-circle">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#7be0cb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>

          <h2 className="rmk-form-title">Student Login</h2>

          <form className="rmk-form" onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className="rmk-field">
              <label className="rmk-field-label">Email</label>
              <input
                type="email"
                name="student_mail"
                value={formData.student_mail}
                onChange={handleChange}
                className="rmk-input"
                placeholder=""
              />
            </div>

            {/* PASSWORD */}
            <div className="rmk-field">
              <label className="rmk-field-label">Password</label>
              <input
                type={isChecked ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rmk-input"
                placeholder=""
              />
            </div>

            {/* Show Password + Forgot */}
            <div className="rmk-options">
              <label className="rmk-show-pw">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                Show Password
              </label>
              <span className="rmk-forgot">Forgot?</span>
            </div>

            {/* Error */}
            {error && <p className="rmk-error">{error}</p>}

            {/* Login Button */}
            <button type="submit" className="rmk-btn">
              Login
            </button>

            {/* Register */}
            <p className="rmk-register">
              New user?{" "}
              <span
                className="rmk-register-link"
                onClick={() => navigate("/StudentRegistration")}
              >
                Register here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;