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
     FETCH YC OD (HOSTELLER + DAYSCHOLAR)
  ============================ */
  useEffect(() => {
    const fetchYCOD = async () => {
      try {
        const email = localStorage.getItem("facultyEmail");
        if (!email) return;

        // 🔹 get facultyId
        const facultyRes = await axios.get(
          `http://localhost:5000/api/faculty/email/${email}`
        );
        const facultyId = facultyRes.data.f_id;

        /* ============================
           1️⃣ HOSTELLER OD
        ============================ */
        const hostellerRes = await axios.get(
          `http://localhost:5000/api/od/year-coordinator/${facultyId}`
        );

        const hostellerMapped = (hostellerRes.data.ods || []).map(
          (od, index) => ({
            sno: index + 1,
            od_id: od.od_id,
            studentName: od.studentName,
            regNo: od.regNo,
            type: "HOSTELLER",
            odData: od,
            outpassData: od,
          })
        );

        /* ============================
           2️⃣ DAYSCHOLAR OD
        ============================ */
        const dayscholarRes = await axios.get(
          `http://localhost:5000/api/dayscholar-od/year-coordinator/${facultyId}`
        );

        const dayscholarMapped = (dayscholarRes.data.ods || []).map(
          (od, index) => ({
            sno: hostellerMapped.length + index + 1,
            od_id: od.od_id,
            studentName: od.studentName,
            regNo: od.regNo,
            type: "DAYSCHOLAR",
            odData: od,
            outpassData: od,
          })
        );

        // 🔥 MERGE BOTH
        setRecords([...hostellerMapped, ...dayscholarMapped]);

      } catch (err) {
        console.error("YC fetch error", err);
      }
    };

    fetchYCOD();
  }, []);

  /* ============================
     APPROVE ONE
  ============================ */
  const handleApprove = async (item) => {
    try {
      const url =
        item.type === "HOSTELLER"
          ? `http://localhost:5000/api/od/year-coordinator/approve/od/${item.od_id}`
          : `http://localhost:5000/api/dayscholar-od/ystatus/${item.od_id}`;

      await axios.put(url, { action: "approve" });

      setRecords((prev) =>
        prev.filter((r) => r.od_id !== item.od_id)
      );
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  /* ============================
     REJECT ONE
  ============================ */
  const handleReject = async (item) => {
    try {
      const url =
        item.type === "HOSTELLER"
          ? `http://localhost:5000/api/od/year-coordinator/approve/od/${item.od_id}`
          : `http://localhost:5000/api/dayscholar-od/ystatus/${item.od_id}`;

      await axios.put(url, { action: "reject" });

      setRecords((prev) =>
        prev.filter((r) => r.od_id !== item.od_id)
      );
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  /* ============================
     APPROVE ALL
  ============================ */
  const handleApproveAll = async () => {
    try {
      await Promise.all(
        records.map((item) => {
          const url =
            item.type === "HOSTELLER"
              ? `http://localhost:5000/api/od/year-coordinator/approve/od/${item.od_id}`
              : `http://localhost:5000/api/dayscholar-od/ystatus/${item.od_id}`;

          return axios.put(url, { action: "approve" });
        })
      );

      setRecords([]);
    } catch (err) {
      console.error("Approve all failed", err);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "2%" }}>
        <div style={{ width: "90%" }}>

          <button onClick={handleApproveAll}>APPROVE ALL</button>

          <div style={{ marginTop: "1%" }}>
            {records.length === 0 && <div>No records found</div>}

            {records.map((r) => (
              <div key={r.od_id} style={{ marginBottom: "10px" }}>
                <span>{r.studentName} ({r.type})</span>

                <button onClick={() => handleApprove(r)}>Approve</button>
                <button onClick={() => handleReject(r)}>Reject</button>

                <button
                  onClick={() => {
                    setSelectedData(r.odData);
                    setActiveForm("onduty");
                    setShowPopup(true);
                  }}
                >
                  View OD
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPopup && selectedData && (
        <div>
          {activeForm === "onduty" && (
            <YearodView data={selectedData} />
          )}
        </div>
      )}
    </div>
  );
};

export default YearOdAppList;