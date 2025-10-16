import { Button } from "@mui/material";
import { useState } from "react";
import OfficeStaffViewForm from "./OfficeStaffViewForm";

const OfficeStaffApproval = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { sno: 1, regno: 111723203001, name: "Akash", formType: "Bonafide Certificate" },
    { sno: 2, regno: 111723203002, name: "Abishek", formType: "Bonafide Certificate" },
    { sno: 3, regno: 111723203003, name: "Abinaya", formType: "Bonafide Certificate" },
    { sno: 4, regno: 111723203004, name: "Adithya Baba", formType: "Bonafide Certificate" },
    { sno: 5, regno: 111723203005, name: "Ajith", formType: "Bonafide Certificate" },
    { sno: 6, regno: 111723203005, name: "Ajith", formType: "Bonafide Certificate" },
    { sno: 7, regno: 111723203005, name: "Ajith", formType: "Bonafide Certificate" },
    { sno: 8, regno: 111723203005, name: "Ajith", formType: "Bonafide Certificate" },
  ];

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  return (
    
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", marginTop: "1%" }}>
        <div
          style={{
            width: "85%",
            backgroundColor: "rgba(238, 238, 238, 0.5)",
            borderRadius: "1.5vh",
            padding: "1%",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              color: "rgba(49, 72, 122, 1)",
              fontSize: "2.5vh",
              fontWeight: "bolder",
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            APPROVAL LIST
          </h1>

          {/* Table Container */}
          <div style={{ width: "100%", maxHeight: "70vh", overflowY: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5", position: "sticky", top: 0, zIndex: 2 }}>
                  <th style={{ padding: "1%", fontSize: "1.9vh" }}>S.NO</th>
                  <th style={{ padding: "1%", fontSize: "1.9vh" }}>NAME</th>
                  <th style={{ padding: "1%", fontSize: "1.9vh" }}>REGISTER NUMBER</th>
                  <th style={{ padding: "1%", fontSize: "1.9vh" }}>FORM TYPE</th>
                  <th style={{ padding: "1%", fontSize: "1.9vh" }}>FORM DETAILS</th>
                  <th style={{ padding: "1%", fontSize: "1.9vh" }}>VALIDATION</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.sno} style={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "0.8%", textAlign: "center", fontSize: "1.8vh" }}>{student.sno}</td>
                    <td style={{ padding: "0.8%", textAlign: "center", fontSize: "1.8vh" }}>{student.name}</td>
                    <td style={{ padding: "0.8%", textAlign: "center", fontSize: "1.8vh" }}>{student.regno}</td>
                    <td style={{ padding: "0.8%", textAlign: "center", fontSize: "1.8vh" }}>{student.formType}</td>
                    <td style={{ padding: "0.8%", textAlign: "center" }}>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => handleOpen(student)}
                        sx={{
                          backgroundColor: "rgba(49, 72, 122, 1)",
                          fontSize: "1.6vh",
                          borderRadius: "1vh",
                          textTransform: "none",
                          padding: "0.4vh 1.5vh",
                        }}
                      >
                        VIEW FORM
                      </Button>
                    </td>
                    <td style={{ padding: "0.8%", textAlign: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center", gap: "10%" }}>
                        <Button
                          variant="contained"
                          size="medium"
                          style={{
                            backgroundColor: "#1E2E4F",
                            color: "white",
                            textTransform: "none",
                            fontSize: "1.6vh",
                            borderRadius: "1vh",
                            padding: "0.4vh 1.5vh",
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          size="medium"
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            textTransform: "none",
                            fontSize: "1.6vh",
                            borderRadius: "1vh",
                            padding: "0.4vh 1.5vh",
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Popup Dialog */}
          <OfficeStaffViewForm open={open} handleClose={handleClose} student={selectedStudent} />
        </div>
      </div>
    
  );
};

export default OfficeStaffApproval;
