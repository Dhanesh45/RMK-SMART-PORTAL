import React from "react";

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const CounsOutPass = ({
  data,
  student,
  handleApprove,
  handleReject,
  validateStudentData,
  closePopup,
  setSelectedStudent,
  handleSubmitOutpass,  // ✅ NEW
}) => {
  console.log("OUTPASS POPUP DATA 👉", data);
  console.log("STUDENT DATA 👉", data?.student);
  console.log("PERMISSION VALUE 👉", data?.parentsPermission);
  console.log("FULL DATA 👉", data);

  const permission = student?.outpassData?.parentsPermission || "NOT_PERMITTED";
  const remarks = student?.outpassData?.remarks || "";

  return (
    <div style={{ height: "100%", width: "100%", padding: "3% 3% 4% 3%", overflowY: "auto" }}>
      <div style={{ width: "100%", height: "7%", fontSize: "3vh", textAlign: "center", fontWeight: "bold", marginBottom: "1%" }}>
        <h3>STUDENT OUTPASS FORM</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* Row 1 */}
        <div style={{ width: "95%" }}>
          <label>NAME</label>
          <input type="text" style={inputStyle} value={data?.studentName || ""} readOnly />
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <div style={{ flex: 1 }}>
            <label>YEAR</label>
            <input type="text" style={inputStyle} value={data?.year || data?.student?.year || ""} readOnly />
          </div>
          <div style={{ flex: 1 }}>
            <label>SECTION</label>
            <input type="text" style={inputStyle} value={data?.student?.section || ""} readOnly />
          </div>
          <div style={{ flex: 1 }}>
            <label>GENDER</label>
            <input type="text" style={inputStyle} value={data?.student?.gender || ""} readOnly />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ width: "95%" }}>
          <label>REGISTRATION NUMBER</label>
          <input type="text" style={inputStyle} value={data?.regNo || ""} readOnly />
        </div>
        <div>
          <label>COUNSELLOR</label>
          <input type="text" style={inputStyle} value={data?.student?.counsellor || ""} readOnly />
        </div>

        {/* Row 3 */}
        <div style={{ width: "95%" }}>
          <label>EMAIL ADDRESS</label>
          <input type="text" style={inputStyle} value={data?.student?.studentMail || ""} readOnly />
        </div>
        <div>
          <label>YEAR COORDINATOR</label>
          <input type="text" style={inputStyle} value={data?.student?.yearCoordinator || ""} readOnly />
        </div>

        {/* Row 4 */}
        <div style={{ width: "95%" }}>
          <label>BRANCH</label>
          <input type="text" style={inputStyle} value={data?.branch || ""} readOnly />
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <div style={{ flex: 1 }}>
            <label>NO.OF.DAYS</label>
            <input type="text" style={inputStyle} value={data?.noOfDays || ""} readOnly />
          </div>
          <div style={{ flex: 1 }}>
            <label>FROM DATE</label>
            <input type="date" style={inputStyle} value={data?.fromDate?.split("T")[0] || ""} readOnly />
          </div>
          <div style={{ flex: 1 }}>
            <label>TO DATE</label>
            <input type="date" style={inputStyle} value={data?.toDate?.split("T")[0] || ""} readOnly />
          </div>
        </div>

        {/* Row 5 */}
        <div style={{ width: "95%" }}>
          <label>NAME OF THE PARENT</label>
          <input type="text" style={inputStyle} value={data?.parentName || ""} readOnly />
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <div style={{ flex: 1 }}>
            <label>ROOM NO</label>
            <input type="text" style={inputStyle} value={data?.roomNumber || ""} readOnly />
          </div>
          <div style={{ flex: 1 }}>
            <label>LEAVING DATE</label>
            <input type="date" style={inputStyle} value={data?.leavingDate?.split("T")[0] || ""} readOnly />
          </div>
          <div style={{ flex: 1 }}>
            <label>LEAVING TIME</label>
            <input type="time" style={inputStyle} value={data?.leavingTime || ""} readOnly />
          </div>
        </div>

        {/* Row 6 */}
        <div style={{ width: "95%" }}>
          <label>NATIVE</label>
          <input type="text" style={inputStyle} value={data?.student?.native || ""} readOnly />
        </div>
        <div>
          <label>REASON FOR LEAVE</label>
          <input type="text" style={inputStyle} value={data?.reasonForLeave || ""} readOnly />
        </div>

        {/* Row 7 */}
        <div style={{ width: "95%" }}>
          <label>PARENT'S MOBILE NO</label>
          <input type="text" style={inputStyle} value={data?.parentPhone || ""} readOnly />
        </div>

        {/* Row 8 - Remarks */}
        <div style={{ width: "95%" }}>
          <label>REMARKS</label>
          <input
            type="text"
            style={inputStyle}
            value={remarks}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                outpassData: { ...prev.outpassData, remarks: e.target.value },
              }))
            }
          />
        </div>

        {/* Row 9 - Parent Permission */}
        <div>
          <label>PARENT PERMISSION</label>
          <div>
            <label>
              <input
                type="radio"
                name="parentsPermission"
                value="OBTAINED_OVER_PHONE"
                checked={permission === "OBTAINED_OVER_PHONE"}
                onChange={(e) =>
                  setSelectedStudent((prev) => ({
                    ...prev,
                    outpassData: { ...prev.outpassData, parentsPermission: e.target.value },
                  }))
                }
              />
              Obtained Over Phone
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="parentsPermission"
                value="HAS_COME_IN_PERSON"
                checked={permission === "HAS_COME_IN_PERSON"}
                onChange={(e) =>
                  setSelectedStudent((prev) => ({
                    ...prev,
                    outpassData: { ...prev.outpassData, parentsPermission: e.target.value },
                  }))
                }
              />
              Has Come in Person
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="parentsPermission"
                value="NOT_PERMITTED"
                checked={permission === "NOT_PERMITTED"}
                onChange={(e) =>
                  setSelectedStudent((prev) => ({
                    ...prev,
                    outpassData: { ...prev.outpassData, parentsPermission: e.target.value },
                  }))
                }
              />
              Not Permitted
            </label>
          </div>
        </div>

      </div>

      {/* ✅ SUBMIT BUTTON */}
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
            if (!permission || permission === "NOT_PERMITTED") {
              alert("Please select parent permission");
              return;
            }

            // ✅ Step 2: Save into students array so it persists on reopen
            handleSubmitOutpass({
              ...student,
              outpassData: {
                ...student.outpassData,
                remarks: remarks,
                parentsPermission: permission,
              },
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

export default CounsOutPass;