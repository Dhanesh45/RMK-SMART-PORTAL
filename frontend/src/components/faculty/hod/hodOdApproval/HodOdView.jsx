import React, { useState } from "react";

const HododView = ({ isPopup = false }) => {
  const [proof, setProof] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setProof({ type: "image", url: URL.createObjectURL(file), name: file.name });
    } else if (file.type === "application/pdf") {
      setProof({ type: "pdf", name: file.name });
    } else {
      setProof(null);
    }
  };

  return (
    <div
      style={{
        height: isPopup ? "100%" : "85%",
        width: isPopup ? "100%" : "80%",
        backgroundColor: isPopup ? "transparent" : "white",
        borderRadius: isPopup ? "0" : "2vh",
        padding: "3%",
        boxShadow: isPopup ? "none" : "0px 4px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "3%",
        overflowY: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "3vh",
          fontWeight: "bold",
          margin: 0,
        }}
      >
        STUDENTS OD FORM
      </h2>

      <div
        style={{
          display: "flex",
          gap: "5%",
          flexWrap: "wrap",
        }}
      >
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: "45%" }}>
          <label style={{ fontSize: "2vh" }}>NAME OF THE STUDENT</label>
          <input type="text" style={inputStyle} />

          <label style={{ fontSize: "2vh" }}>DEPARTMENT</label>
          <input type="text" style={inputStyle} />

          <label style={{ fontSize: "2vh" }}>REGISTER NUMBER</label>
          <input type="text" style={inputStyle} />

          <label style={{ fontSize: "2vh" }}>PURPOSE OF OD</label>
          <select style={inputStyle}>
            <option value="">SELECT</option>
            <option value="Competition">COMPETITION</option>
            <option value="Workshop">WORKSHOP</option>
            <option value="Others">OTHERS</option>
          </select>

          <label style={{ fontSize: "2vh" }}>NUMBER OF DAYS</label>
          <input type="number" style={inputStyle} />

          <label style={{ fontSize: "2vh" }}>NAME OF THE COLLEGE</label>
          <input type="text" style={inputStyle} />

          <label style={{ fontSize: "2vh" }}>NAME OF THE EVENT</label>
          <input type="text" style={inputStyle} />
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: "45%" }}>
          <label style={{ fontSize: "2vh" }}>DATE OF COMPETITION</label>
          <input type="date" style={inputStyle} />

          <div style={{ display: "flex", gap: "4%", marginBottom: "3%", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "45%" }}>
              <label style={{ fontSize: "2vh" }}>FROM DATE</label>
              <input type="date" style={{ ...inputStyle, padding: "4%" }} />
            </div>
            <div style={{ flex: 1, minWidth: "45%" }}>
              <label style={{ fontSize: "2vh" }}>TO DATE</label>
              <input type="date" style={{ ...inputStyle, padding: "4%" }} />
            </div>
          </div>

          <label style={{ fontSize: "2vh" }}>PLACE OF COMPETITION</label>
          <input type="text" style={inputStyle} />

          <label style={{ fontSize: "2vh" }}>
            NUMBER OF DAYS OD ALREADY AVAILED (TILL DATE IN CURRENT SEMESTER)
          </label>
          <input type="number" style={inputStyle} />

          <label style={{ fontSize: "2vh" }}>COMMENTS BY COUNSELLOR</label>
          <input type="text" style={inputStyle} />

          {/* Upload Proof */}
          <label style={{ fontSize: "2vh", display: "block", marginBottom: "1%" }}>
            VIEW PROOF (IMAGE/PDF FORMATE)
          </label>
          <input
            type="file"
            id="proofUpload"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="proofUpload"
            style={{
              display: "inline-block",
              padding: "2% 4%",
              backgroundColor: "#0d3b66",
              color: "white",
              borderRadius: "5vh",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            View Proof
          </label>

          {/* Inline Preview */}
          {proof && (
            <span>
              {proof.type === "image" ? (
                <img
                  src={proof.url}
                  alt="Preview"
                  style={{
                    height: "10%",
                    width: "auto",
                    borderRadius: "2vh",
                    border: "1px solid #ccc",
                    verticalAlign: "middle",
                  }}
                />
              ) : (
                <span style={{ color: "green", fontWeight: "bold" }}>✅ {proof.name}</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Common Input Style
const inputStyle = {
  width: "100%",
  padding: "2%",
  marginBottom: "3%",
  borderRadius: "1vh",
  border: "1px solid #ccc",
};

export default HododView;
