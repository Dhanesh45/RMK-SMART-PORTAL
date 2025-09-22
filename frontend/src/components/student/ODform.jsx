import React from "react";

const ODform = () => {
  return (
    <div
      style={{
        height: "100vh", // outer div in vh
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f4f4",
        overflow: "hidden",
      }}
    >
      {/* Navbar Placeholder */}
      <div
        style={{
          height: "10%",
          width: "100%",
        }}
      >Navbar</div>

      {/* Main Content */}
      <div
        style={{
          height: "85%",
          width: "80%",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "2vh",
          padding: "3%",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "4%",
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "3vh",
            fontWeight:"bold",
            margin: 0,
          }}
        >
          Students OD Form
        </h2>

        {/* Fields Section */}
        <div
          style={{
            display: "flex",
            gap: "5%",
            flexWrap: "wrap",
            height: "75%",
          }}
        >
          {/* Left Column */}
          <div style={{ flex: 1, minWidth: "45%" }}>
            <label style={{ fontSize: "2vh" }}>Place of Competition</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "3%",
                marginBottom: "4%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ fontSize: "2vh" }}>
              Number of days OD already availed
            </label>
            <input
              type="number"
              style={{
                width: "100%",
                padding: "3%",
                marginBottom: "4%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            />

            {/* Purpose of OD (aligned with Comments by Counsellor) */}
            <label style={{ fontSize: "2vh" }}>Purpose of OD</label>
            <select
              style={{
                width: "100%",
                padding: "3%",
                marginBottom: "4%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select</option>
              <option value="Competition">Competition</option>
              <option value="Workshop">Workshop</option>
              <option value="Others">Others</option>
            </select>

            {/* Number of Days (aligned with Comments by Year-Coordinator) */}
            <label style={{ fontSize: "2vh" }}>Number of Days</label>
            <input
              type="number"
              style={{
                width: "100%",
                padding: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Right Column */}
          <div style={{ flex: 1, minWidth: "45%" }}>
            <label style={{ fontSize: "2vh" }}>Date of Competition</label>
            <input
              type="date"
              style={{
                width: "100%",
                padding: "3%",
                marginBottom: "4%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            />

            {/* From & To Date */}
            <div
              style={{
                display: "flex",
                gap: "4%",
                marginBottom: "4%",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "45%" }}>
                <label style={{ fontSize: "2vh" }}>From Date</label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "6%",
                    borderRadius: "1vh",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: "45%" }}>
                <label style={{ fontSize: "2vh" }}>To Date</label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "6%",
                    borderRadius: "1vh",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>

            {/* Comments by Counsellor (aligned with Purpose of OD) */}
            <label style={{ fontSize: "2vh" }}>Comments by Counsellor</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "3%",
                marginBottom: "4%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            />

            {/* Comments by Year-Coordinator (aligned with Number of Days) */}
            <label style={{ fontSize: "2vh" }}>
              Comments by Year-Coordinator
            </label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "3%",
                borderRadius: "1vh",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "1% 4%",
              fontSize: "2vh",
              fontWeight: "bold",
              backgroundColor: "#0d3b66",
              color: "white",
              border: "none",
              borderRadius: "5vh",
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ODform;
