import React from "react";

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const CounsOutPass = () => {
  // const [permission, setPermission] = useState("");

  return (
    <div style={{ height: "100vh", width: "100%",padding:"3% 3% 4% 3%" }}>


      <div
        style={{
          width: "100%",
          height: "7%",
          fontSize:"3vh",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1%",
        }}
      >
        <h3>STUDENT OUTPASS FORM</h3>
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
      </div>
    </div>
  );
};

export default CounsOutPass;