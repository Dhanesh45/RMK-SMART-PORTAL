import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OfficeStaffViewForm from "./OfficeStaffViewForm";

const OfficeStaffGenerate = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      sno: 1,
      regno: 111723203001,
      name: "Akash",
      formType: "Bonafide Certificate",
    },
    {
      sno: 2,
      regno: 111723203002,
      name: "Abishek",
      formType: "Bonafide Certificate",
    },
    {
      sno: 3,
      regno: 111723203003,
      name: "Abinaya",
      formType: "Bonafide Certificate",
    },
    {
      sno: 4,
      regno: 111723203004,
      name: "Adithya Baba",
      formType: "Fees Receipt",
    },
    { sno: 5, regno: 111723203005, name: "Ajith", formType: "Fees Receipt" },
    {
      sno: 6,
      regno: 111723203006,
      name: "Akshay",
      formType: "Bonafide Certificate",
    },
    {
      sno: 7,
      regno: 111723203007,
      name: "Ananya",
      formType: "Bonafide Certificate",
    },
    { sno: 8, regno: 111723203008, name: "Arya", formType: "Fees Receipt" },
    {
      sno: 9,
      regno: 111723203008,
      name: "Arya",
      formType: "Bonafide Certificate",
    },
    {
      sno: 10,
      regno: 111723203008,
      name: "Arya",
      formType: "Bonafide Certificate",
    },
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
    
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "2%",
        }}
      >
        <div
          style={{
            width: "85%",
            padding: "2%",
            borderRadius: "1vh",
            backgroundColor: "rgba(238, 238, 238, 0.5)",
          }}
        >
          {/* Approval List Title */}
          <h1
            style={{
              color: "rgba(49, 72, 122, 1)",
              fontSize: "2.5vh",
              fontWeight: "bolder",
              textAlign: "center",
              margin: "1vh 0 2vh 0",
            }}
          >
            APPROVAL LIST
          </h1>

          {/* Table Container */}
          <div style={{ width: "100%", textAlign: "center" }}>
            <div
              style={{
                backgroundColor: "rgba(217, 217, 217, 1)",
                width: "100%",
                height: "58vh", // medium height
                overflowY: "auto",
                margin: "1.5% auto",
                border: "0.4vh solid rgba(217, 217, 217,1)",
                borderRadius: "1.2vh",
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  fontSize: "1.9vh", // medium font size
                  borderRadius: "1vh",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "0.6vh solid rgba(217, 217, 217, 1)",
                    }}
                  >
                    <th style={{ padding: "1%", fontSize: "1.8vh" }}>S.NO</th>
                    <th style={{ padding: "1%", fontSize: "1.8vh" }}>NAME</th>
                    <th style={{ padding: "1%", fontSize: "1.8vh" }}>
                      REGISTER NUMBER
                    </th>
                    <th style={{ padding: "1%", fontSize: "1.8vh" }}>
                      FORM TYPE
                    </th>
                    <th style={{ padding: "1%", fontSize: "1.8vh" }}>
                      FORM DETAILS
                    </th>
                    <th style={{ padding: "1%", fontSize: "1.8vh" }}>
                      GENERATE
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.sno}
                      style={{
                        backgroundColor: "white",
                        borderBottom: "0.5vh solid rgba(217, 217, 217, 1)",
                      }}
                    >
                      <td style={{ padding: "1vh", textAlign: "center" }}>
                        {student.sno}
                      </td>
                      <td style={{ padding: "1vh", textAlign: "center" }}>
                        {student.name}
                      </td>
                      <td style={{ padding: "1vh", textAlign: "center" }}>
                        {student.regno}
                      </td>
                      <td style={{ padding: "1vh", textAlign: "center" }}>
                        {student.formType}
                      </td>
                      <td style={{ padding: "1vh", textAlign: "center" }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(49, 72, 122, 1)",
                            fontSize: "1.5vh",
                            borderRadius: "1vh",
                            padding: "0.7vh 1.5vh",
                          }}
                          onClick={() => handleOpen(student)}
                        >
                          VIEW FORM
                        </Button>
                      </td>
                      <td style={{ padding: "1vh", textAlign: "center" }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#1E2E4F",
                            color: "white",
                            textTransform: "none",
                            fontSize: "1.5vh",
                            borderRadius: "1vh",
                            padding: "0.7vh 1.5vh",
                          }}
                        >
                          Generate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popup Dialog */}
          <OfficeStaffViewForm
            open={open}
            handleClose={handleClose}
            student={selectedStudent}
          />
        </div>
      </div>
    
  );
};

export default OfficeStaffGenerate;
