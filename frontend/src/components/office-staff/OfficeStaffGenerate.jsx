import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import OfficeStaffViewForm from "./OfficeStaffViewForm";

const OfficeStaffGenerate = () => {
  const [students, setStudents] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  /* FETCH READY APPLICATIONS */

  const getApplications = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/bonafide/generate/all",
    );

   const filteredData = res.data.filter(
    (item) => item.osstatus === 1
  );

  setStudents(filteredData);
};

  useEffect(() => {
    getApplications();
  }, []);

  /* VIEW */

  const handleOpen = (student) => {
    setSelectedStudent(student);

    setOpen(true);
  };

  /* CLOSE */

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2%",
      }}
    >
      <div
        style={{
          width: "85%",
          padding: "2%",
          background: "#eee",
          borderRadius: "1vh",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#31487A",
          }}
        >
          READY TO GENERATE
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "12px" }}>S.No</th>

              <th style={{ padding: "12px" }}>Name</th>

              <th style={{ padding: "12px" }}>Reg No</th>

              <th style={{ padding: "12px" }}>Form Type</th>

              <th style={{ padding: "12px" }}>View</th>

              <th style={{ padding: "12px" }}>Generate</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.ap_id}
                style={{
                  borderBottom: "1px solid #ccc",
                  height: "55px",
                }}
              >
                <td style={{ padding: "10px" }}>{index + 1}</td>

                <td style={{ padding: "10px" }}>
                  {student.student?.studentName}
                </td>

                <td style={{ padding: "10px" }}>{student.student?.regNo}</td>

                <td style={{ padding: "10px" }}>
                  {student.type_of_application}
                </td>

                <td style={{ padding: "10px" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: "#2F80ED",
                      borderRadius: "6px",
                      width: "90px",
                    }}
                    onClick={() => handleOpen(student)}
                  >
                    VIEW
                  </Button>
                </td>

                <td style={{ padding: "10px" }}>
                 <Button
  variant="contained"
  size="small"
  sx={{
    bgcolor: "#1E2E4F",
    borderRadius: "6px",
    width: "110px",
  }}
  onClick={async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/bonafide/generate/send-mail",
      {
        ap_id: student.ap_id,
      }
    );

    alert("Mail Sent Successfully");

    // ✅ REMOVE ROW INSTANTLY
    setStudents((prev) =>
      prev.filter((item) => item.ap_id !== student.ap_id)
    );

  } catch (err) {
    console.log(err);
    alert("Error sending mail");
  }
}}
>
  GENERATE
</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <OfficeStaffViewForm
          open={open}
          handleClose={handleClose}
          student={selectedStudent}
          refreshData={getApplications}
        />
      </div>
    </div>
  );
};

export default OfficeStaffGenerate;
