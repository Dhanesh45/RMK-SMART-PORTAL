import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import OfficeStaffViewForm from "./OfficeStaffViewForm";

const OfficeStaffApproval = () => {
  const [open, setOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students, setStudents] = useState([]);

  /* FETCH DATA */
  useEffect(() => {
    fetchOfficeApplications();
  }, []);

  const fetchOfficeApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bonafide/office/all",
      );

      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* POPUP */
  const handleOpen = (student) => {
    setSelectedStudent(student);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setSelectedStudent(null);
  };

  /* APPROVE */
  const approve = async (id) => {

    try {
      await axios.put(
        `http://localhost:5000/api/bonafide/office/approve/${id}`,
      );

      fetchOfficeApplications();
    } catch (err) {
      console.error(err);
    }
  };

  /* REJECT */
  const reject = async (id) => {
    if (!window.confirm("Reject application?")) return;

    try {
      await axios.put(`http://localhost:5000/api/bonafide/office/reject/${id}`);

      fetchOfficeApplications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "1%",
      }}
    >
      <div
        style={{
          width: "85%",

          backgroundColor: "rgba(238,238,238,0.5)",

          borderRadius: "1.5vh",

          padding: "1%",

          overflow: "hidden",
        }}
      >
        <h1
          style={{
            color: "rgba(49,72,122,1)",

            fontSize: "2.5vh",

            fontWeight: "bolder",

            textAlign: "center",

            marginBottom: "1%",
          }}
        >
          APPROVAL LIST
        </h1>

        <div
          style={{
            width: "100%",

            maxHeight: "70vh",

            overflowY: "auto",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",

              width: "100%",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f5f5f5",

                  position: "sticky",

                  top: 0,

                  zIndex: 2,
                }}
              >
                <th style={{ padding: "1%" }}>S.NO</th>

                <th style={{ padding: "1%" }}>NAME</th>

                <th style={{ padding: "1%" }}>REGISTER NUMBER</th>

                <th style={{ padding: "1%" }}>FORM TYPE</th>

                <th style={{ padding: "1%" }}>FORM DETAILS</th>

                <th style={{ padding: "1%" }}>VALIDATION</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.ap_id}
                  style={{
                    backgroundColor: "white",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td style={{ textAlign: "center" }}>{index + 1}</td>

                  <td style={{ textAlign: "center" }}>
                    {student.student?.studentName}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {student.student?.regNo}
                  </td>

                  <td style={{ textAlign: "center" }}>Bonafide Certificate</td>

                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() => handleOpen(student)}
                      sx={{
                        backgroundColor: "rgba(49,72,122,1)",

                        textTransform: "none",
                      }}
                    >
                      VIEW FORM
                    </Button>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",

                        justifyContent: "center",

                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => approve(student.ap_id)}
                        style={{
                          backgroundColor: "#1E2E4F",

                          color: "white",

                          textTransform: "none",
                        }}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => reject(student.ap_id)}
                        style={{
                          backgroundColor: "red",

                          color: "white",

                          textTransform: "none",
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

        <OfficeStaffViewForm
          open={open}
          handleClose={handleClose}
          student={selectedStudent}
        />
      </div>
    </div>
  );
};

export default OfficeStaffApproval;
