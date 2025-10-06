import React, { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const approveBtn = {
  padding: "10px 40px",
  backgroundColor: "#1E2E4F",
  color: "white",
  fontWeight: "bold",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
};

const Outpass = () => {
  const [permission, setPermission] = useState("");

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ height: "10vh", width: "100vw" }}>nav bar</div>

      <div
        style={{
          width: "80%",
          height: "80%",
          margin: "1% auto",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "2%",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "7%",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1%",
          }}
        >
          <h3>OUTPASS</h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Row 1 */}
          <div style={{ width: "95%" }}>
            <label>NAME</label>
            <input type="text" style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <div style={{ flex: 1 }}>
              <label>YEAR</label>
              <input type="text" list="year-options" style={inputStyle} />
              <datalist id="year-options">
                <option value="1" />
                <option value="2" />
                <option value="3" />
                <option value="4" />
              </datalist>
            </div>
            <div style={{ flex: 1 }}>
              <label>SECTION</label>
              <input type="text" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label>GENDER</label>
              <input type="text" list="gender-options" style={inputStyle} />
              <datalist id="gender-options">
                <option value="Male" />
                <option value="Female" />
                <option value="Prefer not to say" />
              </datalist>
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ width: "95%" }}>
            <label>REGISTRATION NUMBER</label>
            <input type="text" style={inputStyle} />
          </div>
          <div>
            <label>COUNSELLOR</label>
            <input type="text" list="counsellor-options" style={inputStyle} />
            <datalist id="counsellor-options">
              {Array.from({ length: 18 }, (_, i) => (
                <option key={i} value={`Counsellor ${i + 1}`} />
              ))}
            </datalist>
          </div>

          {/* Row 3 */}
          <div style={{ width: "95%" }}>
            <label>EMAIL ADDRESS</label>
            <input type="email" style={inputStyle} />
          </div>
          <div>
            <label>YEAR COORDINATOR</label>
            <input type="text" list="coordinator-options" style={inputStyle} />
            <datalist id="coordinator-options">
              <option value="Dr. Smith" />
              <option value="Prof. Johnson" />
              <option value="Ms. Lee" />
            </datalist>
          </div>

          {/* Row 4 */}
          <div style={{ width: "95%" }}>
            <label>BRANCH</label>
            <input type="text" style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <div style={{ flex: 1 }}>
              <label>NO.OF.DAYS</label>
              <input type="text" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label>FROM DATE</label>
              <input type="date" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label>TO DATE</label>
              <input type="date" style={inputStyle} />
            </div>
          </div>

          {/* Row 5 */}
          <div style={{ width: "95%" }}>
            <label>NAME OF THE PARENT</label>
            <input type="text" style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <div style={{ flex: 1 }}>
              <label>ROOM NO</label>
              <input type="text" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label>LEAVING DATE</label>
              <input type="date" style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label>LEAVING TIME</label>
              <input type="time" style={inputStyle} />
            </div>
          </div>

          {/* Row 6 */}
          <div style={{ width: "95%" }}>
            <label>NATIVE</label>
            <input type="text" style={inputStyle} />
          </div>
          <div>
            <label>REASON FOR LEAVE</label>
            <input type="text" style={inputStyle} />
          </div>

          {/* Row 7 */}
          <div style={{ width: "95%" }}>
            <label>PARENT'S MOBILE NO</label>
            <input type="text" style={inputStyle} />
          </div>

          {/* Buttons */}
          <div
            style={{
              width: "100%",
              paddingTop: "3.2%",
              textAlign: "end",
            }}
          >
            <button style={approveBtn}>SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outpass;
