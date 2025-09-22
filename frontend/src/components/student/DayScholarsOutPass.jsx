import React from "react";

const DayScholarsOutPass = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f4f4",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <div style={{ height: "10vh", width: "100vw" }}>Navbar</div>

      {/* Main Content */}
      <div
        style={{
          height: "85%",
          width: "80%",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "2vh",
          padding: "3%",
          boxShadow: "0% 0% 2% rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "3%",
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "3vh",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          APPLICATION FOR GATE PASS (DAYSCHOLARS)
        </h2>

        {/* Two Column Layout */}
        <div style={{ display: "flex", gap: "5%", height: "100%" }}>
          {/* Left Column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "2vh" }}>NAME OF THE STUDENT</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />

            <label style={{ fontSize: "2vh" }}>REGISTER NUMBER</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />

            <label style={{ fontSize: "2vh" }}>BRANCH</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />

            {/* Year & Section */}
            <div style={{ display: "flex", gap: "5%" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "2vh" }}>YEAR</label>
                <select
                  style={{
                    width: "100%",
                    padding: "3%",
                    marginBottom: "2%",
                    borderRadius: "1vh",
                    border: "0.2vh solid #ccc",
                  }}
                >
                  <option value="">SELECT</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "2vh" }}>SECTION</label>
                <select
                  style={{
                    width: "100%",
                    padding: "3%",
                    marginBottom: "2%",
                    borderRadius: "1vh",
                    border: "0.2vh solid #ccc",
                  }}
                >
                  <option value="">SELECT</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div style={{ display: "flex", gap: "5%" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "2vh" }}>DATE</label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "3%",
                    marginBottom: "2%",
                    borderRadius: "1vh",
                    border: "0.2vh solid #ccc",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "2vh" }}>TIME</label>
                <input
                  type="time"
                  style={{
                    width: "100%",
                    padding: "3%",
                    marginBottom: "2%",
                    borderRadius: "1vh",
                    border: "0.2vh solid #ccc",
                  }}
                />
              </div>
            </div>

            <label style={{ fontSize: "2vh" }}>PURPOSE OF LEAVING</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />
          </div>

          {/* Right Column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "2vh" }}>NAME OF THE COUNSELLOR</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />

            <label style={{ fontSize: "2vh" }}>NAME OF THE PARENT</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />

            <label style={{ fontSize: "2vh" }}>CONTACT NUMBER OF THE PARENT</label>
            <input
              type="number"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />

            <label style={{ fontSize: "2vh" }}>PARENT PERMISSION</label>
            <select
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            >
              <option value="">SELECT</option>
              <option value="Phone">OBTAINED OVER PHONE</option>
              <option value="InPerson">HAS COME IN PERSON</option>
            </select>

            <label style={{ fontSize: "2vh" }}>REMARKS</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "2%",
                marginBottom: "2%",
                borderRadius: "1vh",
                border: "0.2vh solid #ccc",
              }}
            />

            {/* Submit Button */}
            <button
              style={{
                padding: "1.5% 4%",
                fontSize: "2vh",
                fontWeight: "bold",
                backgroundColor: "#0d3b66",
                color: "white",
                border: "none",
                borderRadius: "5vh",
                cursor: "pointer",
                alignSelf: "flex-end",
                marginTop: "auto",
                boxShadow: "0% 0% 2% rgba(0,0,0,0.2)",
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayScholarsOutPass;
