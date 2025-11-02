import React, { useState } from "react";
import loginimg from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const StudentRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_mail: "",
    password: "",
    regNo: "",
    year: "",
    branch: "",
    student_name: "",
    gender: "",
    accommodation: "",
    parent_name: "",
    parent_phone: "",
    native: "",
    counsellor: "",
    year_coordinator: "",
    hod: "",
    section: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    console.log("📦 Sending formData:", formData);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert(res.data.message);
      navigate("/StuDash");
    } catch (err) {
      console.error("❌ Registration Error:", err);
      console.log("🔍 Response data:", err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "linear-gradient(to bottom, rgba(49, 72, 122, 1), rgba(143, 179, 226, 1))",
      }}
    >
      <Card
        sx={{
          width: "90%",
          height: "90vh",
          display: "flex",
          borderRadius: "2vh",
          boxShadow: 5,
          overflow: "hidden",
        }}
      >
        {/* Left Image */}
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#e9f5ff",
          }}
        >
          <img
            src={loginimg}
            alt="Illustration"
            style={{
              width: "90%",
              height: "90%",
              borderRadius: "1.5vh",
            }}
          />
        </Box>

        {/* Right Form */}
        <Box
          sx={{
            width: "50%",
            height: "100%",
            p: "3%",
            overflowY: "auto",
            background: "#fff",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontSize: "150%", mb: "5%" }}
            >
              Registration Form
            </Typography>

            <TextField
              fullWidth
              label="Name"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              label="Registration Number"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              type="email"
              label="E-Mail"
              name="student_mail"
              value={formData.student_mail}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Accommodation</InputLabel>
              <Select
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
              >
                <MenuItem value="hosteller">Hosteller</MenuItem>
                <MenuItem value="dayscholar">Dayscholar</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Parent Name"
              name="parent_name"
              value={formData.parent_name}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              label="Parent Phone"
              name="parent_phone"
              value={formData.parent_phone}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              label="Native"
              name="native"
              value={formData.native}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              label="Counsellor"
              name="counsellor"
              value={formData.counsellor}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              label="Year Coordinator"
              name="year_coordinator"
              value={formData.year_coordinator}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <TextField
              fullWidth
              label="HOD"
              name="hod"
              value={formData.hod}
              onChange={handleChange}
              sx={{ mb: "5%" }}
            />

            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Branch</InputLabel>
              <Select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="AIDS">AIDS</MenuItem>
                <MenuItem value="ECE">ECE</MenuItem>
                <MenuItem value="MECH">MECH</MenuItem>
                <MenuItem value="CIVIL">CIVIL</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Section</InputLabel>
              <Select
                name="section"
                value={formData.section}
                onChange={handleChange}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Year</InputLabel>
              <Select
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <MenuItem value="I">I</MenuItem>
                <MenuItem value="II">II</MenuItem>
                <MenuItem value="III">III</MenuItem>
                <MenuItem value="IV">IV</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: "5%",
                borderRadius: "1.5vh",
                fontSize: "100%",
                "&:hover": { backgroundColor: "#218838" },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default StudentRegistration;
