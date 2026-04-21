import React, { useEffect, useState } from "react";
import axios from "axios";
import HododView from "./HodOdView";
import HodOutpassView from "./HodOutpassView";

const HodOdAppList = () => {
  const [showPopup, setShowPopup] = useState(false); // Control popup
  const [activeForm, setActiveForm] = useState(""); // "outpass" or "onduty"
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
 useEffect(() => {
    const fetchhOD = async () => {
      try {
        const email = localStorage.getItem("facultyEmail");
        if (!email) return;

        const facultyRes = await axios.get(
          `http://localhost:5000/api/faculty/email/${email}`
        );
        const facultyId = facultyRes.data.f_id;

        const [hostellerRes, dayscholarRes] = await Promise.all([
          axios.get(
            `http://localhost:5000/api/od/hod/${facultyId}`
          ),
          axios.get(
            `http://localhost:5000/api/dayscholar-od/hod/${facultyId}`
          ),
        ]);

        const hostellerMapped = (hostellerRes.data?.ods || []).map(
          (od, index) => ({
            sno: index + 1,
            od_id: od.od_id,
            studentName: od.studentName,
            regNo: od.regNo,
            type: "HOSTELLER",
            odData: od,
          })
        );

        const dayscholarMapped = (dayscholarRes.data?.ods || []).map(
          (od, index) => ({
            sno: hostellerMapped.length + index + 1,
            od_id: od.od_id,
            studentName: od.studentName,
            regNo: od.regNo,
            type: "DAYSCHOLAR",
            odData: od,
          })
        );

        setRecords([...hostellerMapped, ...dayscholarMapped]);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };

    fetchhOD();
  }, []);

const handleApprove = async (item) => {
  try {
    const url =
      item.type === "HOSTELLER"
        ? `http://localhost:5000/api/od/hod/approve/od/${item.od_id}`
        : `http://localhost:5000/api/dayscholar-od/hstatus/${item.od_id}`;

    await axios.put(url, { action: "approve" });

    setRecords((prev) => prev.filter((r) => r.od_id !== item.od_id));
  } catch (err) {
    console.error(err);
  }
};
const handleReject = async (item) => {
  try {
    const url =
      item.type === "HOSTELLER"
        ? `http://localhost:5000/api/od/hod/approve/od/${item.od_id}`
        : `http://localhost:5000/api/dayscholar-od/hstatus/${item.od_id}`;

    await axios.put(url, { action: "reject" });

    setRecords((prev) => prev.filter((r) => r.od_id !== item.od_id));
  } catch (err) {
    console.error(err);
  }
};
  const handleApproveAll = async () => {
  try {
    await Promise.all(
      records.map((item) => {
        const url =
          item.type === "HOSTELLER"
            ? `http://localhost:5000/api/od/hod/approve/od/${item.od_id}`
            : `http://localhost:5000/api/dayscholar-od/hstatus/${item.od_id}`;

        return axios.put(url, { action: "approve" });
      })
    );

    setRecords([]);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      

      {/* Content Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(238, 238, 238, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "2%",
        }}
      >
        {/* Dropdown */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            height:"10vh"
          }}
        >
        
        </div>

        {/* Table Container */}
        <div
          style={{
            width: "90%",
            height: "65vh",
            backgroundColor: "rgba(217, 217, 217, 1)",
            border: "0.4% solid rgba(217, 217, 217,1)",
            borderRadius: "1%",
            padding: "0.8%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "8% 18% 20% 20% 17% 17%",
              backgroundColor: "white",
              fontWeight: "bold",
              textAlign: "center",
              padding: "0.8%",
              borderRadius: "0.5vh",
              marginBottom: "0.8%",
            }}
          >
            <div>S.NO</div>
            <div>NAME</div>
            <div>REG.NO</div>
            <div>OUTPASS DETAILS</div>
            <div>ONDUTY DETAILS</div>
            <div>VALIDATION</div>
          </div>

          {/* Table Body */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {records.map((student) => (
              <div
                key={student.od_id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "8% 18% 20% 20% 17% 17%",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "1vh",
                  padding: "0.8%",
                  marginBottom: "0.8%",
                  boxShadow: "0% 0.3% 0.6% rgba(0,0,0,0.15)",
                }}
              >
                <div style={cardCell}>{student.sno}</div>
                <div style={cardCell}>{student.studentName}</div>
                <div style={cardCell}>{student.regNo}</div>
                <div style={cardCell}>
                  <button
                    style={formBtn}
                    onClick={() => {
                      setShowPopup(true);
                      setActiveForm("outpass");
                    }}
                  >
                    OUTPASS
                  </button>
                </div>
                <div style={cardCell}>
                  <button
                    style={formBtn}
                    onClick={() => {
                      setShowPopup(true);
                      setActiveForm("onduty");
                    }}
                  >
                    ONDUTY
                  </button>
                </div>
                <div style={cardCell}>
                  <button style={approveBtn} onClick={() => handleApprove(student)}>APPROVE</button>
                  <button style={rejectBtn} onClick={() => handleReject(student)}>REJECT</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            margin: "auto",
            width: "90%",
          }}
        >
          <button style={bottomBtn} onClick={handleApproveAll}>
            Approve All
          </button>
        </div>
      </div>

      {/* Conditional Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              width: "80%",
              height: "90%",
              overflowY: "auto",
              padding: "1%",
              position: "relative",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>

            {/* Conditional Rendering with clean popup */}
            {activeForm === "outpass" && <HodOutpassView isPopup={true} />}
            {activeForm === "onduty" && <HododView isPopup={true} />}
          </div>
        </div>
      )}
    </div>
  );
};

// Common Styles
const cardCell = { textAlign: "center", fontSize: "90%" };

const formBtn = {
  fontWeight: "bold",
  padding: "0.7% 5%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "8%",
  cursor: "pointer",
  alignItems: "center",
};

const approveBtn = {
  fontWeight: "bold",
  padding: "1% 3%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "12%",
  marginRight: "1%",
  cursor: "pointer",
};

const rejectBtn = {
  fontWeight: "bold",
  padding: "1% 2%",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "8%",
  cursor: "pointer",
};

const bottomBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "1% 3%",
  borderRadius: "8%",
  cursor: "pointer",
  fontSize: "100%",
  fontWeight: "bold",
};

export default HodOdAppList;
