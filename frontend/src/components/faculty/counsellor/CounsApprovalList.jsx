import { useEffect, useState } from "react";
import axios from "axios";

const CounsApprovalList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchOutpasses = async () => {
      try {
        const email = localStorage.getItem("facultyEmail");
        if (!email) return;

        // get facultyId
        const facultyRes = await axios.get(
          `http://localhost:5000/api/faculty/email/${email}`
        );
        const facultyId = facultyRes.data.f_id;

        // fetch hosteller outpasses
        const hostellerRes =
          await axios.get(
            `http://localhost:5000/api/outpass/counsellor/${facultyId}`
          );
        console.log("HOSTELLER DATA:", hostellerRes.data.outpasses);

        const hostellerMapped = hostellerRes.data.outpasses.map((op, index) => {
          console.log("OUTPASS DATA:", op);   // ✅ HERE

          return {
            sno: index + 1,
            nof: op.regNo,
            name: op.studentName,
            outpassId: op.outpassId,
            type: "HOSTELLER",
            data: {
              ...op,

              // student table fields
              studentName: op.studentName,
              regNo: op.regNo,
              section: op.student?.section,
              gender: op.student?.gender,
              year: op.student?.year,
              branch: op.student?.branch,
              yearCoordinator: op.student?.YearCoordinator?.faculty_name || "Not Assigned", email: op.student?.studentMail,
              native: op.student?.native,

              // counsellor
              counsellor: op.Faculty?.faculty_name || "Not Assigned",

              // extra fields
              remarks: op.remarks,
              parentsPermission: op.parentsPermission,
            }
          };
        });
        // fetch day scholar outpasses
        const dayScholarRes =
          await axios.get(
            `http://localhost:5000/api/dayscholarOutpass/counsellor/${facultyId}`
          );
        console.log("🔥 RAW DayScholar API Response:", dayScholarRes.data);
        console.log("🔥 RAW DayScholar Outpasses:", dayScholarRes.data.outpasses);
        const dayScholarMapped = dayScholarRes.data.outpasses.map((op, index) => ({
          sno: hostellerMapped.length + index + 1,
          nof: op.regNo,
          name: op.studentName,
          outpassId: op.dayscholaroutpassId, // use correct PK
          type: "DAYSCHOLAR",
          data: {
            ...op,
            section: op.student?.section,
            year: op.student?.year,
            branch: op.student?.branch,
            studentName: op.student?.studentName,
            regNo: op.student?.regNo,
            counsellor: op.Faculty?.faculty_name || "Not Assigned",
            parentName: op.parentName,
            parentNumber: op.parentNumber,
            parentPermission: op.parentPermission,
            remarks: op.remarks || "",

            toDate: op.toDate,
            leavingTime: op.leavingTime
          },
        }));
        // merge both
        setStudents([...hostellerMapped, ...dayScholarMapped]);
      } catch (err) {
        console.error("Failed to load outpasses", err);
      }
    };

    fetchOutpasses();
  }, []);
  const handleApprove = async (student) => {
    const url =
      student.type === "HOSTELLER"
        ? `http://localhost:5000/api/outpass/counsellor/update/${student.outpassId}`
        : `http://localhost:5000/api/dayscholarOutpass/counsellor/update/${student.outpassId}`;

    await axios.put(url, { action: "approve", updatedData: student.data, });

    setStudents((prev) =>
      prev.filter((s) => s.outpassId !== student.outpassId)
    );
  };
  const handleApproveAll = async () => {
    try {
      await Promise.all(
        students.map((student) => {
          const url =
            student.type === "HOSTELLER"
              ? `http://localhost:5000/api/outpass/counsellor/update/${student.outpassId}`
              : `http://localhost:5000/api/dayscholarOutpass/counsellor/update/${student.outpassId}`;

          return axios.put(url, { action: "approve" });
        })
      );

      // clear all approved requests from UI
      setStudents([]);
    } catch (error) {
      console.error("Approve all failed", error);
    }
  };


  const handleReject = async (student) => {
    const url =
      student.type === "HOSTELLER"
        ? `http://localhost:5000/api/outpass/counsellor/update/${student.outpassId}`
        : `http://localhost:5000/api/dayscholarOutpass/counsellor/update/${student.outpassId}`;

    await axios.put(url, { action: "reject" });

    setStudents((prev) =>
      prev.filter((s) => s.outpassId !== student.outpassId)
    );
  };


  const handleViewForm = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
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
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(238,238,238,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "rgba(14,73,71,1)",
            fontSize: "2.2vh",
            fontWeight: "bolder",
            margin: "2vh 0",
          }}
        >
          COUNSELLOR APPROVAL LIST
        </h1>

        <div
          style={{
            width: "90%",
            height: "75vh",
            border: "8px solid rgba(217,217,217,1)",
            borderRadius: "2vh",
            backgroundColor: "rgba(217,217,217,1)",
            padding: "0% 0.5% 0% 0.5%",
          }}
        >
          <table
            style={{
              width: "100%",
              height: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>S.NO</th>
                <th style={headerStyle}>NAME</th>
                <th style={headerStyle}>REG NO</th>
                <th style={headerStyle}>ACCOMODATION</th>
                <th style={headerStyle}>FORM DETAILS</th>
                <th style={headerStyle}>VALIDATION</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {

                return (
                  <tr
                    key={student.sno}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",

                    }}
                  >
                    <td style={{ ...cellStyle, borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>{student.sno}</td>
                    <td style={{ ...cellStyle }}>{student.name}</td>
                    <td style={cellStyle}>{student.nof}</td>
                    <td style={cellStyle}>{student.type}</td>
                    <td style={cellStyle}>
                      <button
                        style={viewBtn}
                        onClick={() => handleViewForm(student)}
                      >
                        VIEW FORM
                      </button>
                    </td>
                    <td style={cellStyle}>
                      <button style={approveBtn} onClick={() => handleApprove(student)}>
                        APPROVE
                      </button>
                      <button style={rejectBtn} onClick={() => handleReject(student)}>
                        REJECT
                      </button>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Approve All Button */}
          <div style={{ textAlign: "end", marginTop: "2%" }}>
            <button style={approveAllBtn} onClick={() => handleApproveAll()}>Approve All</button>
          </div>
        </div>
      </div>

      {/* POPUP CONTENT */}
      {showPopup && selectedStudent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            minHeight: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "82%",
              backgroundColor: "white",
              borderRadius: "2vh",
              padding: "3%",
              position: "relative",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "1%",
                right: "2%",
                border: "none",
                background: "none",
                fontSize: "3.5vh",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={closePopup}
            >
              ×
            </button>

            {selectedStudent.type === "DAYSCHOLAR" ? (
              <DayScholarForm
                data={selectedStudent.data}
                setSelectedStudent={setSelectedStudent}
                student={selectedStudent}
                handleApprove={handleApprove}
                handleReject={handleReject}
                closePopup={closePopup}
              />
            ) : (
              <HostellerForm data={selectedStudent.data} />
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
  
  <button
    style={approveBtn}
    onClick={() => {
      handleApprove(selectedStudent);
      closePopup();
    }}
  >
    APPROVE
  </button>

  <button
    style={rejectBtn}
    onClick={() => {
      handleReject(selectedStudent);
      closePopup();
    }}
  >
    REJECT
  </button>

</div>

          </div>
        </div>
      )}
    </div>
  );
};

/* 🏠 Fixed Hosteller Form (layout like 1st image) */
const HostellerForm = ({ data }) => {
  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };
  console.log(data);

  const formatTime = (value) => {
    if (!value) return "";
    return value.slice(0, 5);
  };

  const getValue = (label) => {
    switch (label) {
      case "Name": return data?.studentName || "";
      case "Year": return data?.year || "";
      case "Section": return data?.section || "";
      case "Gender": return data?.gender || "";
      case "Registration Number": return data?.regNo || "";
      case "Counsellor": return data?.counsellor || "";
      case "Email Address": return data?.email || "";
      case "Year Coordinator": return data?.yearCoordinator || "";
      case "Branch": return data?.branch || "";
      case "No. of Days": return data?.noOfDays || "";
      case "From Date": return formatDate(data?.fromDate);
      case "To Date": return formatDate(data?.toDate);
      case "Name of the Parent": return data?.parentName || "";
      case "Room No": return data?.roomNumber || "";
      case "Leaving Date": return formatDate(data?.leavingDate);
      case "Leaving Time": return formatTime(data?.leavingTime);
      case "Native": return data?.native || "";
      case "Reason for Leave": return data?.reasonForLeave || "";
      case "Parent's Mobile No": return data?.parentPhone || "";
      case "Parent's Permission": return data?.parentsPermission || "";
      case "Remarks": return data?.remarks || "";
      default: return "";
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
      <h2 style={{ textAlign: "center", color: "#0d3b66" }}>
        Hosteller Outpass Form
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5vh 2vh",
          alignItems: "center",
        }}
      >
        {[
          "Name",
          "Year",
          "Section",
          "Gender",
          "Registration Number",
          "Counsellor",
          "Email Address",
          "Year Coordinator",
          "Branch",
          "No. of Days",
          "From Date",
          "To Date",
          "Name of the Parent",
          "Room No",
          "Leaving Date",
          "Leaving Time",
          "Native",
          "Reason for Leave",
          "Parent's Mobile No",
          "Parent's Permission",
          "Remarks",
        ].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              gridColumn:
                ["Reason for Leave", "Parent's Permission", "Remarks"].includes(label)
                  ? "span 2"
                  : "auto",
            }}
          >
            <label style={labelStyle}>{label}</label>
            <input
              type={
                label.includes("Date")
                  ? "date"
                  : label.includes("Time")
                    ? "time"
                    : "text"
              }
              value={getValue(label)}
              style={inputStyle}
              readOnly
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1vh",
          fontSize: "1.6vh",
          gap: "0.8vh",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={data?.obtainedOverPhone || false}
            readOnly
          />{" "}
          Obtained Over Phone
        </label>
        <label>
          <input
            type="checkbox"
            checked={data?.hasComeInPerson || false}
            readOnly
          />{" "}
          Has Come in Person
        </label>
      </div>
    </div>
  );
};

/* 🚌 Day Scholar Form (unchanged) */
const DayScholarForm = ({ data, setSelectedStudent, student, handleApprove, handleReject, closePopup }) => {
  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };

  const formatTime = (value) => {
    if (!value) return "";
    return value.slice(0, 5);
  };

  return (
  <div style={{ display: "flex", gap: "5%", height: "100%" }}>

    {/* LEFT SIDE */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

      <label style={{ fontSize: "2vh" }}>NAME OF THE STUDENT</label>
      <input
        type="text"
        style={inputField}
        value={data.studentName || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, studentName: e.target.value },
          }))
        }
      />

      <label style={{ fontSize: "2vh" }}>REGISTER NUMBER</label>
      <input
        type="text"
        style={inputField}
        value={data.regNo || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, regNo: e.target.value },
          }))
        }
      />

      <label style={{ fontSize: "2vh" }}>BRANCH</label>
      <input
        type="text"
        style={inputField}
        value={data.branch || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, branch: e.target.value },
          }))
        }
      />

      <div style={{ display: "flex", gap: "5%" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>YEAR</label>
          <input
            type="text"
            style={inputField}
            value={data.year || ""}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: { ...prev.data, year: e.target.value },
              }))
            }
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>SECTION</label>
          <input
            type="text"
            style={inputField}
            value={data.section || ""}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: { ...prev.data, section: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "5%" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>DATE</label>
          <input
            type="date"
            style={inputField}
            value={formatDate(data.toDate)}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: { ...prev.data, toDate: e.target.value },
              }))
            }
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "2vh" }}>TIME</label>
          <input
            type="time"
            style={inputField}
            value={formatTime(data.leavingTime)}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: { ...prev.data, leavingTime: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <label style={{ fontSize: "2vh" }}>PURPOSE OF LEAVING</label>
      <input
        type="text"
        style={inputField}
        value={data.reason || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, reason: e.target.value },
          }))
        }
      />
    </div>

    {/* RIGHT SIDE */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

      <label style={{ fontSize: "2vh" }}>NAME OF THE COUNSELLOR</label>
      <input
        type="text"
        style={inputField}
        value={data.counsellor || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, counsellor: e.target.value },
          }))
        }
      />

      <label style={{ fontSize: "2vh" }}>NAME OF THE PARENT</label>
      <input
        type="text"
        style={inputField}
        value={data.parentName || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, parentName: e.target.value },
          }))
        }
      />

      <label style={{ fontSize: "2vh" }}>CONTACT NUMBER OF THE PARENT</label>
      <input
        type="text"
        style={inputField}
        value={data.parentNumber || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, parentNumber: e.target.value },
          }))
        }
      />

      <label style={{ fontSize: "2vh" }}>PARENT PERMISSION</label>
      <input
        type="text"
        style={inputField}
        value={data.parentPermission || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, parentPermission: e.target.value },
          }))
        }
      />

      <label style={{ fontSize: "2vh" }}>REMARKS</label>
      <input
        type="text"
        style={inputField}
        value={data.remarks || ""}
        onChange={(e) =>
          setSelectedStudent((prev) => ({
            ...prev,
            data: { ...prev.data, remarks: e.target.value },
          }))
        }
      />
    </div>
  </div>
);
};
/* 🎨 Styles */
const headerStyle = {
  backgroundColor: "white",
  padding: "10px",
  textAlign: "center",
  fontSize: "2vh",
  fontWeight: "bold",
};

const cellStyle = {
  padding: "14px 8px",   // 👈 this gives ~58px row height
  textAlign: "center",
};
const approveBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "5px",
  marginRight: "5%",
  cursor: "pointer",
};
const rejectBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
const viewBtn = {
  fontWeight: "bold",
  padding: "5px 10px",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
};
const approveAllBtn = {
  backgroundColor: "#3b4b75",
  color: "white",
  border: "none",
  padding: "1% 4%",
  borderRadius: "50px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
};
const labelStyle = {
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1.4vh",
  marginBottom: "1%",
};
const inputStyle = {
  padding: "1vh",
  border: "1px solid #aaa",
  borderRadius: "0.8vh",
  fontSize: "1.7vh",
};
const inputField = {
  width: "100%",
  padding: "2%",
  marginBottom: "2%",
  borderRadius: "1vh",
  border: "0.2vh solid #ccc",
};
const selectStyle = { ...inputField, padding: "3%" };
const submitBtn = {
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
};

export default CounsApprovalList;
