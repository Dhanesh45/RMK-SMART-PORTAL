import React from "react";
import { Modal, Box, TextField, Button, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "85vh",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "2vh",
  padding: "4%",
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function OfficeStaffViewForm({
  open,
  handleClose,
  student,
  refreshData,
}) {
  if (!student) return null;

  /* APPROVE */

  const approve = async () => {
    await axios.put(
      `http://localhost:5000/bonafide/office/approve/${student.ap_id}`,
    );

    refreshData();

    handleClose();
  };

  /* REJECT */

  const reject = async () => {
    await axios.put(
      `http://localhost:5000/bonafide/office/reject/${student.ap_id}`,
    );

    refreshData();

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* CLOSE */}

        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "2%",
            right: "2%",
          }}
        >
          <CloseIcon sx={{ fontSize: "2.5vh" }} />
        </IconButton>

        {/* TITLE */}

        <h2
          style={{
            fontSize: "2.5vh",
            fontWeight: "bold",
            marginBottom: "2%",
            textAlign: "center",
            color: "#1a2b47",
          }}
        >
          Student Bonafide Details
        </h2>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ mb: 3 }}
            label="Name"
            value={student.student?.studentName || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Registration Number"
            value={student.student?.regNo || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Branch"
            value={student.student?.branch || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Father Name"
            value={student.fatherName || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Semester"
            value={student.semester || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Age"
            value={student.age || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Category"
            value={student.category || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Bonafide Type"
            value={student.type_of_application || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Fee Details Year"
            value={student.fees_detail_year || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Date Of Birth"
            value={student.date_of_birth || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Boarding"
            value={student.boarding || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            sx={{ mb: 3 }}
            label="Reason"
            value={student.reason || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Communication Address"
            value={`
${student.houseno || ""}
${student.street || ""}
${student.area || ""}
${student.city || ""}
${student.state || ""}
${student.pincode || ""}
`}
            fullWidth
            multiline
            rows={3}
            InputProps={{ readOnly: true }}
          />

          {/* BUTTONS */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2%",
              marginTop: "3%",
            }}
          ></Box>
        </form>
      </Box>
    </Modal>
  );
}
