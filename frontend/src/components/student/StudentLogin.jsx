import { useState } from "react";
import loginimg from "../../assets/login.png";
import { useNavigate } from "react-router-dom";


const StudentLogin = () => {
  const navigate=useNavigate();
  const [isChecked, setIsChecked] = useState(false);
    return (
      <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'linear-gradient(to bottom, rgba(49, 72, 122, 1), rgba(143, 179, 226, 1))' }}>
        <div style={{ width: "85%", height: "85%", backgroundColor: "white", borderRadius: "4vh", boxShadow: "2px 2px 5px  rgba(0, 0, 0, 0.5 )", display: "flex", overflow: "hidden" }}>
          
          {/* image part */}
          <div style={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid rgba(14,73,71,1)" }}>
            <img src={loginimg} alt="LoginImage" style={{ width: "100%", height: "100%" }} />
          </div>
  
          {/* Form part */}
          <div className="form-scroll" style={{ width: "50%", height: "100%", padding: "2% 0%", overflowY: "auto" }}>
            <h1 style={{ textAlign: "center", fontWeight: "800", fontSize: "6vh", color: "rgba(30, 46, 76, 1 )", paddingBottom: "3%" }}>STUDENT LOGIN</h1>
            <p style={{ textAlign: "center", fontSize: "3vh", paddingBottom: "1%", fontWeight: "600", color: "#1E2E4F" }}>
              Welcome to student details Login to access your account
            </p>
  
            {/* input fields */}
            <div style={{ padding: "3% 5% 5% 5%" }}>
  
              {/* Email */}
              <div style={{ paddingBottom: "4%" }}>
                <p style={{ fontSize: "3vh", fontWeight: "600", paddingBottom: "0.8%", color: "rgba(30, 46, 76, 1 )" }}>EMAIL</p>
                <input type="email" style={{ width: "97%", padding: "1.25%", borderRadius: "0.7vh", border: "1px solid rgba(30, 46, 76, 1 )", fontSize: "3vh", fontWeight: "500" }} />
              </div>
  
             
              {/* Password */}
              <div style={{ paddingBottom: "1%" }}>
                <p style={{ fontSize: "3vh", fontWeight: "600", paddingBottom: "0.8%", color: "rgba(30, 46, 76, 1 )" }}>PASSWORD</p>
                <input
                  type={isChecked ? "text" : "password"}
                  style={{ width: "97%", padding: "1.25%", borderRadius: "0.7vh", border: "1px solid rgba(30, 46, 76, 1 )", fontSize: "3vh", fontWeight: "500" }}
                />
              </div>
  
              {/* Show password & forgot */}
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "5%" }}>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
                  <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} style={{ display: "none" }} />
                  <span style={{ width: "24px", height: "24px", display: "inline-block", borderRadius: "0.6vh", backgroundColor: isChecked ? "#1E2E4F" : "#fff", border: "2px solid rgba(17,73,71,1)", position: "relative", transition: "all 0.2s ease-in-out" }}>
                    {isChecked && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px", position: "absolute", top: "2px", left: "4px" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <p style={{ fontWeight: "650", paddingLeft: "10px", color: "#1E2E4F", marginBottom: "0" }}>
                    SHOW PASSWORD
                  </p>
                </label>
  
                <a href="#" style={{ color: "rgba(30, 46, 76, 0.7)", fontWeight: "600" }}>Forget Password?</a>
              </div>
  
              {/* Login button */}
              <div style={{ textAlign: "center" }}>
                <button onClick={()=> navigate("/StuDash")}
                  style={{ padding: "2% 30%", borderRadius: "4vh", fontSize: "3vh", fontWeight: "600", color: "white", backgroundColor: "rgba(30, 46, 76, 1 )" }}
                   >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <style>
          {`
            .form-scroll::-webkit-scrollbar {
              width: 8px;
            }
  
            .form-scroll::-webkit-scrollbar-track {
              background: #f0f0f0;
            }
  
            .form-scroll::-webkit-scrollbar-thumb {
              background-color: rgba(30, 46, 76, 0.5 );
              border-radius: 1vh;
            }
  
            .form-scroll::-webkit-scrollbar-thumb:hover {
              background-color: rgba(17, 73, 71, 1);
            }
          `}
        </style>
      </div>
    );
  };
  
export default StudentLogin;
