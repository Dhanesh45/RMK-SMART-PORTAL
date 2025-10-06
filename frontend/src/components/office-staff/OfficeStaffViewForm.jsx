import React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",                // ✅ width in %
  height: "85vh",              // ✅ outer div height in vh
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "2vh",         // ✅ borderRadius in vh
  padding: "4%",               // ✅ padding in %
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function OfficeStaffViewForm({ open, handleClose, student }) {
  if (!student) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "2%", right: "2%" }}
        >
          <CloseIcon sx={{ fontSize: "2.5vh" }} /> {/* ✅ font size in vh */}
        </IconButton>

        {/* Form Title */}
        <h2
          style={{
            fontSize: "2.5vh",   // ✅ font size in vh
            fontWeight: "bold",
            marginBottom: "2%",
            textAlign: "center",
            color: "#1a2b47",
          }}
        >
          Student Form Details
        </h2>

        {/* Form Fields */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2%",
          }}
        >
          <TextField sx={{mb:3}}label="Name" value={student.name} fullWidth />
          <TextField sx={{mb:3}}label="Registration Number" value={student.regNo} fullWidth />
          <TextField sx={{mb:3}}label="Form Type" value={student.formType} fullWidth InputProps={{ readOnly: true }} />

          <TextField sx={{mb:3}}label="Father’s/Guardian’s Name" value={student.fathername} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Application For" value={student.applicationfor} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Date" value={student.date} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Branch" value={student.branch} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Semester" value={student.semester} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Date of Birth" value={student.dob} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Age" value={student.age} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Accommodation Type" value={student.accommodationtype} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Category" value={student.category} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Boarding Place" value={student.boardingplace} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Which Kind of Bonafide" value={student.kindofbonafide} fullWidth InputProps={{ readOnly: true }} />
          <TextField sx={{mb:3}}label="Fee Details Required For" value={student.feedetails} fullWidth InputProps={{ readOnly: true }} />

          <TextField
            label="Communication Address"
            value={student.address || ""}
            fullWidth
            multiline
            rows={3}
            InputProps={{ readOnly: true }}
          />

          {/* Approve Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1a2b47",
              borderRadius: "2vh",   // ✅ border radius vh
              alignSelf: "center",
              padding: "1% 5%",      // ✅ padding in %
              marginTop: "2%",       // ✅ margin in %
              fontSize: "2vh",       // ✅ font size in vh
              textTransform: "none",
            }}
          >
            Approve
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
