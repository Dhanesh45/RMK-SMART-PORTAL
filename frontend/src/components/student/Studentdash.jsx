import React, { useMemo } from "react";
import StuNavbar from "./StuNavbar"
export default function Studentdash() {
  const currentStage = 4;

  const stages = [
    "Applied",
    "Counsellor",
    "Year Coordinator",
    "HOD",
    "Approved",
  ];

  const student = {
    name: "Student Name",
    email: "alexarawles@gmail.com",
    regno: "111723203000",
    degree: "B.Tech - Information Technology",
    batch: "2027",
    college: "R.M.K. Group of Institutions",
    profile:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
  };

  const history = [
    { id: 1, reason: "DEEPAVALI", from: "01/08/2025", to: "01/08/2025", days: 1 },
    { id: 2, reason: "DEEPAVALI", from: "05/08/2025", to: "09/08/2025", days: 5 },
    { id: 3, reason: "DEEPAVALI", from: "12/08/2025", to: "14/08/2025", days: 3 },
    { id: 4, reason: "FESTIVAL", from: "20/08/2025", to: "21/08/2025", days: 2 },
    { id: 5, reason: "TRIP", from: "25/08/2025", to: "27/08/2025", days: 3 },
  ];

  const fillPercent = useMemo(() => {
    if (currentStage <= 0) return 8;
    const pct = (currentStage / (stages.length - 1)) * 100;
    return Math.max(8, Math.min(100, pct));
  }, [currentStage, stages.length]);

  const markerStatus = (idx) => {
    if (idx < currentStage) return "approved";
    if (currentStage === 4) return "approved";
    if (idx === currentStage) return "pending";
    return "future";
  };

  return (
      <div
        style={{
          width: "96%",
          height: "86%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          gap: "2%",
          boxSizing: "border-box",
          alignItems: "flex-start",
          flexWrap: "wrap",
          top: 3,
        }}
      >
        {/* LEFT CARD */}
        <div
          style={{
            width: "78%",
            minWidth: "60%",
            height: "100%",
            borderRadius: "2%",
            backgroundColor: "white",
            boxSizing: "border-box",
            padding: "1.6%",
            display: "flex",
            flexDirection: "column",
            gap: "1.6%",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          {/* Banner */}
          <div
            style={{
              width: "100%",
              height: "26%",
              borderRadius: "10px",
              background:
                "linear-gradient(90deg,#0fb5b5 0%, #0db0ad 30%, #2fa8bf 100%)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "0.5% 1%",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "2%",
                bottom: "-10%",
                width: "22%",
                height: "120%",
                borderRadius: "10%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(0,0,0,0))",
                opacity: 0.25,
              }}
            />
          </div>

          {/* Profile image */}
          <div
            style={{
              position: "absolute",
              left: "4%",
              margin: "2%",
              width: "100px",
              minWidth: "52px",
              height: "calc(20% + 0px)",
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
              zIndex: 1,
            }}
          >
            <img
              src={student.profile}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Student Details */}
          <div
            style={{
              width: "100%",
              borderRadius: "1%",
              backgroundColor: "white",
              padding: "2% 3%",
              boxSizing: "border-box",
              gap: "0.8%",
            }}
          >
            <div style={{ fontSize: "140%", fontWeight: 700 }}>
              {student.name}
            </div>
            <div style={{ fontSize: "90%", color: "#6d6d6d" }}>
              {student.email}
            </div>
            <div
              style={{
                fontSize: "92%",
                color: "#222",
                marginTop: "1%",
                lineHeight: "160%",
              }}
            >
              <strong>Reg.No :</strong> {student.regno} {" | "}
              <strong>Degree :</strong> {student.degree} {" | "}
              <strong>Batch :</strong> {student.batch} {" | "}
              <strong>College :</strong> {student.college}
            </div>
          </div>

          {/* HISTORY */}
          <div
            style={{
              width: "100%",
              maxHeight: "40%",
              marginTop: "3%",
              backgroundColor: "#EEEEEE",
              borderRadius: "10px",
              padding: "1.2%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "3%",
              flexGrow: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "105%",
                marginBottom: "0.6%",
              }}
            >
              Historical Overview
            </div>

            <div
              style={{
                maxHeight: "80%",
                backgroundColor: "#D9D9D9",
                padding: "1%",
                boxSizing: "border-box",
                overflowY: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                  fontSize: "85%",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "10px solid #D9D9D9" }}>
                    {["S.NO", "REASON", "FROM DATE", "TO DATE", "NO. OF DAYS TAKEN"].map(
                      (title, i) => (
                        <th
                          key={i}
                          style={{
                            textAlign: "left",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 1,
                            padding: "0.75%",
                            color: "#333",
                            borderRadius:
                              i === 0
                                ? "10px 0 0 10px"
                                : i === 4
                                ? "0 10px 10px 0"
                                : "0",
                          }}
                        >
                          {title}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {history.map((h, idx) => (
                    <tr key={h.id}>
                      <td style={tdStyle}>{idx + 1}.</td>
                      <td style={tdStyle}>{h.reason}</td>
                      <td style={tdStyle}>{h.from}</td>
                      <td style={tdStyle}>{h.to}</td>
                      <td style={tdStyle}>{h.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT APPROVAL STATUS */}
        <div
          style={{
            width: "20%",
            minWidth: "20%",
            height: "100%",
            borderRadius: "10px",
            backgroundColor: "white",
            boxSizing: "border-box",
            padding: "2%",
            display: "flex",
            flexDirection: "column",
            gap: "2%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "92%",
              fontWeight: 700,
              fontSize: "95%",
              textAlign: "center",
            }}
          >
            Approval Status: OD
          </div>

          {/* vertical bar */}
          <div
            style={{
              width: "56%",
              height: "72%",
              background:
                "linear-gradient(180deg, rgba(243,243,243,1) 0%, rgba(251,251,251,1) 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              boxSizing: "border-box",
              padding: "2%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "4% 5.5%",
                zIndex: 1,
                boxSizing: "border-box",
              }}
            >
              {stages.map((s, i) => {
                const st = markerStatus(i);
                return (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: st === "pending" ? "22%" : "16%",
                        height: st === "pending" ? "22%" : "16%",
                        minWidth: st === "pending" ? "18px" : "14px",
                        minHeight: st === "pending" ? "18px" : "14px",
                        borderRadius: "50%",
                        backgroundColor:
                          st === "approved"
                            ? "#18b66b"
                            : st === "pending"
                            ? "#ffffff"
                            : "#ffffff",
                        border:
                          st === "approved"
                            ? "none"
                            : "2px solid rgba(0,0,0,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 4,
                      }}
                      title={s}
                    >
                      <span
                        style={{
                          fontSize: "80%",
                          color:
                            st === "approved"
                              ? "white"
                              : st === "pending"
                              ? "#13304f"
                              : "#9aa0a6",
                          fontWeight: 100,
                        }}
                      >
                        {st === "approved"
                          ? "✓"
                          : st === "pending"
                          ? "⚠"
                          : "o"}
                      </span>
                    </div>
                    <div
                      style={{
                        marginLeft: "5%",
                        fontSize: "85%",
                        color: "#222",
                        width: "160%",
                      }}
                    >
                      {s}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* bar track */}
            <div
              style={{
                width: "15%",
                height: "100%",
                border: "2px solid white",
                backgroundColor: "#e9f7f5",
                borderRadius: "10px",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${fillPercent + 2}%`,
                  background:
                    "linear-gradient(180deg,#004a7c 0%, #0b6a9e 60%, #113656 100%)",
                  transition: "height 400ms ease",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              />
            </div>
          </div>

          {/* LEGEND */}
          <div
            style={{
              width: "92%",
              backgroundColor: "#fbfcfd",
              borderRadius: "1%",
              padding: "1%",
              boxSizing: "border-box",
              fontSize: "85%",
            }}
          >
            <LegendItem color="#18b66b" icon="✓" label="APPROVED" />
            <LegendItem icon="⏳" label="PENDING" border />
            <LegendItem color="#f8d7da" icon="✖" label="REJECTED" red />
          </div>
        </div>
      </div>
    
  );
}

// 🔹 Reusable styles
const tdStyle = {
  textAlign: "left",
  padding: "1.2% 1%",
  backgroundColor: "white",
  borderBottom: "8px solid #D9D9D9",
};

// 🔹 Legend component
const LegendItem = ({ color, icon, label, border, red }) => (
  <div
    style={{
      display: "flex",
      gap: "3%",
      alignItems: "center",
      marginTop: "2%",
    }}
  >
    <div
      style={{
        width: "8%",
        minWidth: "18px",
        height: "18px",
        borderRadius: "50%",
        backgroundColor: color || "transparent",
        border: border ? "1px solid rgba(0,0,0,0.12)" : "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: red ? "#b02a37" : color ? "white" : "#333",
        fontWeight: 700,
      }}
    >
      {icon}
    </div>
    <div style={{ flexGrow: 1 }}>- {label}</div>
  </div>
);
