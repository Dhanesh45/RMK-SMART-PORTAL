import React, { useEffect, useState } from "react";
import axios from "axios";
import OutpassView from "./YearOutpassView";
import YearodView from "./YearOdView";

const YearOdAppList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeForm, setActiveForm] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  /* ============================
     FETCH OD + OUTPASS (YC)
  ============================ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("facultyEmail");
        if (!email) return;

        // 1️⃣ get facultyId
        const facultyRes = await axios.get(
          `http://localhost:5000/api/faculty/email/${email}`
        );
        const facultyId = facultyRes.data.f_id;

        // 2️⃣ Fetch OD requests
        const odRes = await axios.get(
          `http://localhost:5000/api/od/year-coordinator/od/${facultyId}`
        );

        // 3️⃣ Fetch Outpass (already counsellor approved)
        const outpassRes = await axios.get(
          `http://localhost:5000/api/od/year-coordinator/${facultyId}`
        );

        // 4️⃣ Merge OD with Outpass using outpassId
        const merged = outpassRes.data.map((op, index) => {
          const od = odRes.data.ods.find(
            (o) => o.outpass_id === op.outpassId
          );

          return {
            sno: index + 1,
            outpassId: op.outpassId,
            studentName: op.studentName,
            regNo: op.regNo,
            outpassData: op,       // ✅ for popup
            odData: od || null,    // ⚠️ may be null
          };
        });

        setRecords(merged);
      } catch (err) {
        console.error("YC fetch error", err);
      }
    };

    fetchData();
  }, []);

  /* ============================
     APPROVE / REJECT OD
  ============================ */
  const handleAction = async (odId, action) => {
    try {
      if (!odId) return;

      await axios.put(
        `http://localhost:5000/api/od/year-coordinator/approve/od/${odId}`,
        { action }
      );

      // remove approved / rejected record
      setRecords((prev) =>
        prev.filter((r) => r.odData && r.odData.od_id !== odId)
      );
    } catch (err) {
      console.error("YC approval failed", err);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          height: "100%",
          backgroundColor: "rgba(238,238,238,0.5)",
          display: "flex",
          justifyContent: "center",
          paddingTop: "2%",
        }}
      >
        <div style={{ width: "90%" }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "8% 18% 20% 20% 17% 17%",
              backgroundColor: "white",
              fontWeight: "bold",
              textAlign: "center",
              padding: "1%",
              borderRadius: "8px",
            }}
          >
            <div>S.NO</div>
            <div>NAME</div>
            <div>REG.NO</div>
            <div>OUTPASS</div>
            <div>ONDUTY</div>
            <div>VALIDATION</div>
          </div>

          {/* Body */}
          <div style={{ marginTop: "1%", maxHeight: "70vh", overflowY: "auto" }}>
            {records.map((r) => (
              <div
                key={r.outpassId}
                style={{
                  display: "grid",
                  gridTemplateColumns: "8% 18% 20% 20% 17% 17%",
                  backgroundColor: "white",
                  padding: "1%",
                  marginBottom: "1%",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div>{r.sno}</div>
                <div>{r.studentName}</div>
                <div>{r.regNo}</div>

                {/* OUTPASS VIEW */}
                <div>
                  <button
                    style={formBtn}
                    onClick={() => {
                      setSelectedData(r.outpassData);
                      setActiveForm("outpass");
                      setShowPopup(true);
                    }}
                  >
                    OUTPASS
                  </button>
                </div>

                {/* OD VIEW */}
                <div>
                  <button
                    style={formBtn}
                    disabled={!r.odData}
                    onClick={() => {
                      if (!r.odData) return;
                      setSelectedData(r.odData);
                      setActiveForm("onduty");
                      setShowPopup(true);
                    }}
                  >
                    ONDUTY
                  </button>
                </div>

                {/* APPROVAL */}
                <div>
                  <button
                    style={{
                      ...approveBtn,
                      opacity: r.odData ? 1 : 0.5,
                      cursor: r.odData ? "pointer" : "not-allowed",
                    }}
                    disabled={!r.odData}
                    onClick={() =>
                      handleAction(r.odData?.od_id, "approve")
                    }
                  >
                    APPROVE
                  </button>

                  <button
                    style={{
                      ...rejectBtn,
                      opacity: r.odData ? 1 : 0.5,
                      cursor: r.odData ? "pointer" : "not-allowed",
                    }}
                    disabled={!r.odData}
                    onClick={() =>
                      handleAction(r.odData?.od_id, "reject")
                    }
                  >
                    REJECT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && selectedData && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <button style={closeBtn} onClick={() => setShowPopup(false)}>
              ✕
            </button>

            {activeForm === "outpass" && (
              <OutpassView data={selectedData} isPopup />
            )}
            {activeForm === "onduty" && (
              <YearodView data={selectedData} isPopup />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================
   STYLES
============================ */
const formBtn = {
  fontWeight: "bold",
  padding: "6px 20px",
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

const approveBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: "6px",
  borderRadius: "6px",
};

const rejectBtn = {
  backgroundColor: "#d9534f",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
};

const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupBox = {
  backgroundColor: "white",
  width: "85%",
  height: "90%",
  borderRadius: "10px",
  padding: "1%",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "20px",
  border: "none",
  background: "#d9534f",
  color: "white",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
};

export default YearOdAppList;
