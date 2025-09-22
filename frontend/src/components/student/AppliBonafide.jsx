const BonafideForm = () => {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "rgba(235, 235, 234, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Navbar Placeholder */}
      <div style={{ height: "10vh", width: "100vw", border: "1px solid black" }}> nav bar</div>

      {/* Form Container */}
      <div
        style={{
          marginTop: "1%",
          width: "90%",
          maxWidth: "1000px",
          backgroundColor: "#fff",
          borderRadius: "2vh",
          padding: "2vh 2vw",
          boxShadow: "0 0 1vh rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh", // You can adjust this value as needed
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2%",
            fontSize: "3.2vh",
            fontWeight: "bolder",
            color: "rgba(30, 46, 79, 1)",
          }}
        >
          APPLICATION FORM FOR BONAFIDE CERTIFICATE
        </h2>

        {/* Form Fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // ✅ 2-column layout
            gap: "2vh 2vw",
            fontSize: "2vh",
          }}
        >
          {/* Row 1 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Reason for Bonafide Request</label>
            <input type="text" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "85.3%", }}>
            <div style={fieldStyle}><label style={labelStyle}>Year</label>
              <select style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "310%",
              }} >
                <option>Year</option>
                <option>I Year</option>
                <option>II Year</option>
                <option>III Year</option>
                <option>IV Year</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Father’s/Guardian’s Name</label>
              <input type="text" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "142%",
              }} />
            </div>
          </div>

          {/* Row 3 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>House No</label>
            <input type="number" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", width: "82%" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "180%",
              }} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Age</label>
              <input type="number" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "155%",
              }} />
            </div>
          </div>


          <div style={fieldStyle}>
            <label style={labelStyle}>Street Name</label>
            <input type="text" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>

          {/* Row 4 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter Area</label>
            <input type="text" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter City</label>
            <input type="text" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>

          {/* Row 5 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter State</label>
            <input type="text" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter Pincode</label>
            <input type="Number" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>

          {/* Row 6 */}

          {/* Row 7 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Select Category</label>
            <select style={{
              padding: "1vh",
              borderRadius: "1vh",
              border: "1px solid #999",
              width: "100%",
            }} >
              <option>Select Category</option>
              <option>GOVERMENT QUOTA</option>
              <option>MANAGEMENT QUOTA</option>
            </select>
          </div>


          <div style={{ display: "flex", justifyContent: "space-between", }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>
              If Dayscholar, Boarding Place</label>
              <input type="text" style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "117%",
              }} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Select the Type of Bonafide</label>
              <select style={{
                padding: "1vh",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }} >
                <option>Select the Type of Bonafide</option>
                <option>WITH FEE STRUCTURE</option>
                <option>WITHOUT FEE STRUCTURE</option>
                <option>INPLANT TRAINING /PROJECT WORK</option>
                <option>PAPER PRESENTATION </option>
                <option>GENERAL</option>
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              padding: "4%",
              alignItems: "end",
            }}
          >
            <button
              style={{
                backgroundColor: "#1f2a44",
                color: "rgba(224, 231, 231, 1)",
                border: "none",
                borderRadius: "2vh",
                padding: "1.7% 8% 2%",
                fontSize: "2vh",
                fontWeight:"bolder",
                cursor: "pointer",
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>

        {/* Submit Button */}

      </div>
    </div>
  );
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  height: "10vh",
  fontSize: "2.1vh",
};

const labelStyle = {
  marginBottom: "0.9vh",
  fontWeight: "600",
  fontSize: "2.5vh",
  color: "rgba(0, 0, 0, 1)",
};

export default BonafideForm;
