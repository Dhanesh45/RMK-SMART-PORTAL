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
          console.log("OUTPASS DATA:", op);

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
              section: op.student?.section || "",
              gender: op.student?.gender || "",
              year: op.student?.year || "",
              branch: op.student?.branch || "",
              yearCoordinator:
                op.student?.YearCoordinator?.faculty_name || "Not Assigned",
              email: op.student?.studentMail || "",
              native: op.student?.native || "",

              // counsellor
              counsellor: op.Faculty?.faculty_name || "Not Assigned",

              // ✅ IMPORTANT FIXES
              remarks: op.remarks || "",


              parentsPermission: op.parentsPermission || "NOT_PERMITTED",

            },
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
            parentPermission: op.parentPermission || "NOT_PERMITTED",
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


  const validateStudentData = (student) => {
    if (!student || !student.data) {
      alert("No student selected for validation.");
      return false;
    }

    const data = student.data;
    const type = student.type;

    // required fields mapping
    const requiredFields = {
      HOSTELLER: [
        "studentName",
        "regNo",
        "section",
        "year",
        "branch",
        "counsellor",
        "parentsPermission", // radio
        "remarks",
      ],
      DAYSCHOLAR: [
        "studentName",
        "regNo",
        "section",
        "year",
        "branch",
        "counsellor",
        "parentPermission", // radio
        "parentName",
        "parentNumber",
        "remarks",
      ],
    };

    const missingFields = requiredFields[type].filter(
      (field) =>
        !data[field] || (typeof data[field] === "string" && data[field].trim() === "")
    );

    if (missingFields.length > 0) {
      alert(
        "Please fill all required fields before approving.\nMissing: " +
        missingFields.join(", ")
      );
      return false;
    }

    return true;
  };


  const handleApprove = async (student) => {
    // ✅ Validate before sending
    if (!validateStudentData(student)) return;

    const url =
      student.type === "HOSTELLER"
        ? `http://localhost:5000/api/outpass/counsellor/update/${student.outpassId}`
        : `http://localhost:5000/api/dayscholarOutpass/counsellor/update/${student.outpassId}`;

    console.log("SENDING DATA:", student.data);

    await axios.put(url, {
      action: "approve",
      updatedData:
        student.type === "HOSTELLER"
          ? {
            parentsPermission: student.data.parentsPermission, // ✅ correct
            remarks: student.data.remarks,
          }
          : {
            parentPermission: student.data.parentPermission,   // ✅ correct
            remarks: student.data.remarks,
          },
    });

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
          COUNSELLOR OUTPASS APPROVAL LIST
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
                      <button
                        style={approveBtn}
                        onClick={() => {
                          if (validateStudentData(selectedStudent)) { // check all fields
                            handleApprove(selectedStudent);
                            closePopup();
                          }
                        }}
                      >
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
              <HostellerForm
                data={selectedStudent.data}
                setSelectedStudent={setSelectedStudent}
              />
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>

              <button
                style={approveBtn}
                onClick={() => {
                  if (validateStudentData(selectedStudent)) {  // ✅ validate popup student
                    handleApprove(selectedStudent);
                    closePopup();
                  }
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
const HostellerForm = ({ data, setSelectedStudent }) => {

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().split("T")[0];
  };

  const formatTime = (value) => {
    if (!value) return "";
    return value.slice(0, 5);
  };

  // ✅ Field mapping (clean + editable)
  const fields = [
    { label: "Name", key: "studentName" },
    { label: "Year", key: "year" },
    { label: "Section", key: "section" },
    { label: "Gender", key: "gender" },
    { label: "Registration Number", key: "regNo" },
    { label: "Counsellor", key: "counsellor" },
    { label: "Email Address", key: "email" },
    { label: "Year Coordinator", key: "yearCoordinator" },
    { label: "Branch", key: "branch" },
    { label: "No. of Days", key: "noOfDays" },
    { label: "From Date", key: "fromDate", type: "date" },
    { label: "To Date", key: "toDate", type: "date" },
    { label: "Name of the Parent", key: "parentName" },
    { label: "Room No", key: "roomNumber" },
    { label: "Leaving Date", key: "leavingDate", type: "date" },
    { label: "Leaving Time", key: "leavingTime", type: "time" },
    { label: "Native", key: "native" },
    { label: "Reason for Leave", key: "reasonForLeave" },
    { label: "Parent's Mobile No", key: "parentPhone" },
    { label: "Remarks", key: "remarks" }
  ];

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
        }}
      >
        {fields.map((field) => (
          <div
            key={field.key}
            style={{
              display: "flex",
              flexDirection: "column",
              gridColumn:
                ["reasonForLeave", "remarks"].includes(field.key)
                  ? "span 2"
                  : "auto",
            }}
          >
            <label style={labelStyle}>{field.label}</label>

            <input
              type={field.type || "text"}
              value={
                field.type === "date"
                  ? formatDate(data[field.key])
                  : field.type === "time"
                    ? formatTime(data[field.key])
                    : data[field.key] || ""
              }
              style={inputStyle}
              onChange={(e) =>
                setSelectedStudent((prev) => ({
                  ...prev,
                  data: {
                    ...prev.data,
                    [field.key]: e.target.value,
                  },
                }))
              }
            />
          </div>
        ))}
      </div>

      {/* ✅ Checkbox also editable */}
      <div style={{ marginTop: "1vh" }}>
        <label style={labelStyle}>Parent Permission</label>

        <label>
          <input
            type="radio"
            name="parentPermission"
            value="OBTAINED_OVER_PHONE"
            checked={data.parentsPermission === "OBTAINED_OVER_PHONE"}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: { ...prev.data, parentsPermission: e.target.value },
              }))
            }
          />
          Obtained Over Phone
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="parentPermission"
            value="HAS_COME_IN_PERSON"
            checked={data.parentsPermission === "HAS_COME_IN_PERSON"}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: {
                  ...prev.data,
                  parentsPermission: e.target.value,
                },
              }))
            }
          />
          {" "}Has Come in Person
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="parentPermission"
            value="NOT_PERMITTED"
            checked={data.parentsPermission === "NOT_PERMITTED"}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: {
                  ...prev.data,
                  parentsPermission: e.target.value,
                },
              }))
            }
          />
          {" "}Not Permitted
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

        <label style={{ fontSize: "2vh" }}>PARENT PERMISSION</label>

        <label>
          <input
            type="radio"
            name="parentPermission"
            value="OBTAINED_OVER_PHONE"
            checked={data.parentPermission === "OBTAINED_OVER_PHONE"}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: { ...prev.data, parentPermission: e.target.value },
              }))
            }
          />
          {" "}Obtained Over Phone
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="parentPermission"
            value="HAS_COME_IN_PERSON"
            checked={data.parentPermission === "HAS_COME_IN_PERSON"}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: {
                  ...prev.data,
                  parentPermission: e.target.value,
                },
              }))
            }
          />
          {" "}Has Come in Person
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="parentPermission"
            value="NOT_PERMITTED"
            checked={data.parentPermission === "NOT_PERMITTED"}
            onChange={(e) =>
              setSelectedStudent((prev) => ({
                ...prev,
                data: {
                  ...prev.data,
                  parentPermission: e.target.value,
                },
              }))
            }
          />
          {" "}Not Permitted
        </label>

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
