import React, { useState, useEffect } from "react";

const CounsOnDuty = ({
  isPopup = false,
  data,
  handleSubmitOD, 
  closePopup        // ✅ to close popup
}) => {
  const [proof, setProof] = useState(null);
 const [remarks, setRemarks] = useState("");

useEffect(() => {
  setRemarks(data?.counsellorComments || "");
}, [data]);

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
          <input
            type="text"
            style={inputStyle}
            value={data?.studentName || ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>DEPARTMENT</label>
          <input
            type="text"
            style={inputStyle}
            value={data?.branch || ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>REGISTER NUMBER</label>
          <input
            type="text"
            style={inputStyle}
            value={data?.regNo || ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>PURPOSE OF OD</label>
          <input type="text" style={inputStyle} value={data?.purpose || ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>NUMBER OF DAYS</label>
          <input
            type="number"
            style={inputStyle}
            value={data?.numberOfDays ?? ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>NAME OF THE COLLEGE</label>
          <input
            type="text"
            style={inputStyle}
            value={data?.collegeName || ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>NAME OF THE EVENT</label>
          <input
            type="text"
            style={inputStyle}
            value={data?.eventName || ""}
            disabled
          />
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: "45%" }}>
          <label style={{ fontSize: "2vh" }}>DATE OF COMPETITION</label>
          <input
            type="date"
            style={inputStyle}
            value={data?.date ? data.date.split("T")[0] : ""}
            disabled
          />

          <div style={{ display: "flex", gap: "4%", marginBottom: "3%", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "45%" }}>
              <label style={{ fontSize: "2vh" }}>FROM DATE</label>
              <input type="date" style={{ ...inputStyle, padding: "4%" }}
                value={data?.fromDate ? data.fromDate.split("T")[0] : ""} disabled />
            </div>
            <div style={{ flex: 1, minWidth: "45%" }}>
              <label style={{ fontSize: "2vh" }}>TO DATE</label>
              <input type="date" style={{ ...inputStyle, padding: "4%" }}
                value={data?.toDate ? data.toDate.split("T")[0] : ""} disabled />
            </div>
          </div>

          <label style={{ fontSize: "2vh" }}>PLACE OF COMPETITION</label>
          <input
            type="text"
            style={inputStyle}
            value={data?.place || ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>ALREADY OD AVAILED</label>
          <input
            type="number"
            style={inputStyle}
            value={data?.odAvailed || ""}
            disabled
          />

          <label style={{ fontSize: "2vh" }}>COUNSELLOR COMMENTS</label>
          <textarea
            style={{ ...inputStyle, height: "6%" }}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />


          {/* Upload Proof */}
          <label style={{ fontSize: "2vh", display: "block", marginBottom: "1%" }}>
            UPLOAD PROOF (IMAGE/PDF)
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
            Upload Proof
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
      <div style={{ marginTop: "20px", textAlign: "right" }}>
  <button
    style={{
      padding: "8px 20px",
      backgroundColor: "#3b4b75",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
    onClick={() => {
      // ✅ Step 1: Validate
      if (!remarks || remarks.trim() === "") {
        alert("Please enter remarks");
        return;
      }

      // ✅ Step 2: Save (same pattern)
      handleSubmitOD({
        ...data,
        counsellorComments: remarks,   // ✅ IMPORTANT FIELD
      });

      // ✅ Step 3: Close popup
      closePopup();
    }}
  >
    SUBMIT
  </button>
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

export default CounsOnDuty;