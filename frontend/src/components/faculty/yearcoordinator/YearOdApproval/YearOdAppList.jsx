import React, { useEffect, useState } from "react";
import axios from "axios";
import YearodView from "./YearOdView";

const YearOdAppList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  /* ============================
     FETCH YC OD
  ============================ */
  useEffect(() => {
    const fetchYCOD = async () => {
      try {
        const email = localStorage.getItem("facultyEmail");
        if (!email) return;

        const facultyRes = await axios.get(
          `http://localhost:5000/api/faculty/email/${email}`
        );
        const facultyId = facultyRes.data.f_id;

        const [hostellerRes, dayscholarRes] = await Promise.all([
          axios.get(
            `http://localhost:5000/api/od/year-coordinator/${facultyId}`
          ),
          axios.get(
            `http://localhost:5000/api/dayscholar-od/year-coordinator/${facultyId}`
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

    fetchYCOD();
  }, []);

  /* ============================ */
 const handleApprove = async (item) => {
  try {
    const url =
      item.type === "HOSTELLER"
        ? `http://localhost:5000/api/od/year-coordinator/approve/od/${item.od_id}`
        : `http://localhost:5000/api/dayscholar-od/ystatus/${item.od_id}`;

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
        ? `http://localhost:5000/api/od/year-coordinator/approve/od/${item.od_id}`
        : `http://localhost:5000/api/dayscholar-od/ystatus/${item.od_id}`;

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
            ? `http://localhost:5000/api/od/year-coordinator/approve/od/${item.od_id}`
            : `http://localhost:5000/api/dayscholar-od/ystatus/${item.od_id}`;

        return axios.put(url, { action: "approve" });
      })
    );

    setRecords([]);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={{ width: "100%", padding: "2%" }}>
      <div
        style={{
          width: "100%",
          background: "#e0e0e0",
          padding: "2%",
          borderRadius: "10px",
        }}
      >
        {/* TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5", textAlign: "center" }}>
              <th style={{ width: "10%" }}>S.NO</th>
              <th style={{ width: "15%" }}>NAME</th>
              <th style={{ width: "20%" }}>REG.NO</th>
              <th style={{ width: "20%" }}>Coordinator Name</th>
              <th style={{ width: "15%" }}>FORM DETAILS</th>
              <th style={{ width: "20%" }}>VALIDATION</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "20px", textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr
                  key={r.od_id}
                  style={{
                    textAlign: "center",
                    background: "#ffffff",
                    height: "60px",
                  }}
                >
                  <td>{r.sno}</td>
                  <td>{r.studentName}</td>
                  <td>{r.regNo}</td>
                  <td>{r.coordinator || "-"}</td>

                  {/* VIEW */}
                  <td>
                    <button
                      style={{
                        padding: "6px 12px",
                        background: "#3f4a6b",
                        fontWeight: "bold",
                        color: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      }}
                      onClick={() => {
                        setSelectedData(r.odData);
                        setShowPopup(true);
                      }}
                    >
                      VIEW FORM
                    </button>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          padding: "5px 10px",
                          background: "#3f4a6b",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => handleApprove(r)}
                      >
                        APPROVE
                      </button>

                      <button
                        style={{
                          padding: "5px 10px",
                          background: "#d9534f",
                          color: "#fff",
                          border: "none",
                          fontWeight: "bold",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => handleReject(r)}
                      >
                        REJECT
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* FOOTER BUTTONS */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              background: "#3f4a6b",
              color: "#fff",
              borderRadius: "30px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Request Access
          </button>

          <button
            style={{
              padding: "10px 20px",
              background: "#3f4a6b",
              color: "#fff",
              borderRadius: "30px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleApproveAll}
          >
            Approve All
          </button>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && selectedData && (
        <div style={{ marginTop: "2%" }}>
          <YearodView data={selectedData} />
        </div>
      )}
    </div>
  );
};

export default YearOdAppList;