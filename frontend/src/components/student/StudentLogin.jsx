// StudentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const StudentLogin = () => {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    
    const [formData, setFormData] = useState({
        student_mail: '',
        password: '',
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
            const response = await axios.post("http://localhost:5000/api/student/login", formData); 
            const { regNo, accommodation } = response.data.studentData;

            navigate("/StuDash", { state:{ 
                accommodation: accommodation, 
                regNo: regNo 
            } });

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            setError(errorMessage);
        }
    };

return (
  <div style={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1a3a4f, #1e4d5a, #1a5a5a)",
    padding: "3vh"
  }}>

    {/* 🔥 INPUT STYLES */}
    <style>{`
      .login-input {
        width: 100%;
        padding: 12px 14px;
        border: 1.5px solid #e2eaf0;
        border-radius: 10px;
        font-size: 14px;
        color: #1a3a4f;
        outline: none;
        transition: all 0.2s ease;
        background: #ffffff;
      }

      .login-input:focus {
        border-color: #7be0cb;
        box-shadow: 0 0 0 3px rgba(123,224,203,0.25);
      }

      .login-label {
        font-size: 12px;
        font-weight: 600;
        color: #6b8fa8;
        margin-bottom: 5px;
        letter-spacing: 0.05em;
      }
    `}</style>

    {/* 🔥 MAIN CARD (BIGGER) */}
    <div style={{
      width: "80vw",
     
      height: "85vh",
      background: "rgba(255,255,255,0.97)",
      borderRadius: "3vh",
      boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
      display: "flex",
      overflow: "hidden"
    }}>

      {/* LEFT PANEL */}
      <div style={{
        width: "50%",
        background: "linear-gradient(160deg, #1a3a4f, #1a5a5a)",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,224,203,0.3), transparent)",
        }} />

        <h2 style={{
          color: "#7be0cb",
          fontSize: "3vh",
          fontWeight: "700",
          letterSpacing: "0.1em"
        }}>
          RMK SMART PORTAL
        </h2>
      </div>

      {/* RIGHT FORM */}
      <div style={{
        width: "55%",
        padding: "5vh 3.5vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>

        <h1 style={{
          textAlign: "center",
          fontSize: "4vh",
          fontWeight: "800",
          color: "#1a3a4f",
          marginBottom: "3vh"
        }}>
          STUDENT LOGIN
        </h1>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div style={{ marginBottom: "2.5vh" }}>
            <p className="login-label">EMAIL</p>
            <input
              type="email"
              name="student_mail"
              value={formData.student_mail}
              onChange={handleChange}
              className="login-input"
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "2vh" }}>
            <p className="login-label">PASSWORD</p>
            <input
              type={isChecked ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="login-input"
            />
          </div>

          {/* OPTIONS */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2vh"
          }}>
            <label  style={{
              textAlign: "center",
              marginTop: "2vh",
              cursor: "pointer",
              color: "#1a3a4f",
              fontWeight: "600"
            }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                
              /> Show Password
            </label>

            <span  style={{
              textAlign: "center",
              marginTop: "2vh",
              cursor: "pointer",
              color: "#1a3a4f",
              fontWeight: "600"
            }}>
              Forgot?
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1.4vh",
              borderRadius: "3vh",
              border: "none",
              background: "#1a3a4f",
              color: "#fff",
              fontWeight: "700",
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#7be0cb"
              e.currentTarget.style.color = "#1a3a4f"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#1a3a4f"
              e.currentTarget.style.color = "#fff"
            }}
          >
            LOGIN
          </button>

          {/* REGISTER */}
          <p
            onClick={() => navigate("/StudentRegistration")}
            style={{
              textAlign: "center",
              marginTop: "2vh",
              cursor: "pointer",
              color: "#1a3a4f",
              fontWeight: "600"
            }}
          >
            New user? Register here
          </p>

        </form>
      </div>
    </div>
  </div>
)
};

export default StudentLogin;