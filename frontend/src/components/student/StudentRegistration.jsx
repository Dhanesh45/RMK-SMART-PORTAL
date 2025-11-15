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
  FormHelperText,
} from "@mui/material";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});

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
    setErrors({ ...errors, [e.target.name]: "" }); // remove error on typing
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Required fields validation
  const validateFields = () => {
    const newErrors = {};

    const requiredFields = [
      "student_name",
      "regNo",
      "student_mail",
      "password",
      "gender",
      "accommodation",
      "parent_name",
      "parent_phone",
      "native",
      "branch",
      "year",
      "counsellor",
      "year_coordinator",
      "hod",
      "section",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message);

      navigate("/StuDash", {
        state: {
          accommodation: formData.accommodation,
          regNo: formData.regNo,
        },
      });

    } catch (err) {
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
        {/* LEFT IMAGE */}
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

        {/* RIGHT FORM */}
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

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  required
                  error={!!errors.student_name}
                  helperText={errors.student_name}
                  sx={{ mb: "5%" }}
                />

                <TextField
                  fullWidth
                  label="Registration Number"
                  name="regNo"
                  value={formData.regNo}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,12}$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ inputMode: "numeric", maxLength: 12 }}
                  required
                  error={!!errors.regNo}
                  helperText={errors.regNo}
                  sx={{ mb: "5%" }}
                />

                <TextField
                  fullWidth
                  type="email"
                  label="E-Mail"
                  name="student_mail"
                  value={formData.student_mail}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      /^[A-Za-z0-9._%+-]+@rmkec\.ac\.in$/.test(value) ||
                      value === ""
                    ) {
                      handleChange(e);
                    } else {
                      const [local, domain] = value.split("@");
                      if (!domain || "rmkec.ac.in".startsWith(domain)) {
                        handleChange(e);
                      }
                    }
                  }}
                  required
                  error={!!errors.student_mail}
                  helperText={errors.student_mail || "Email must end with @rmkec.ac.in"}
                  sx={{ mb: "5%" }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{ mb: "5%" }}
                />

                <FormControl fullWidth required error={!!errors.gender} sx={{ mb: "5%" }}>
                  <InputLabel>Gender</InputLabel>
                  <Select name="gender" value={formData.gender} onChange={handleChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <FormHelperText>{errors.gender}</FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  required
                  error={!!errors.accommodation}
                  sx={{ mb: "5%" }}
                >
                  <InputLabel>Accommodation</InputLabel>
                  <Select
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                  >
                    <MenuItem value="hosteller">Hosteller</MenuItem>
                    <MenuItem value="dayscholar">Dayscholar</MenuItem>
                  </Select>
                  <FormHelperText>{errors.accommodation}</FormHelperText>
                </FormControl>

                <TextField
                  fullWidth
                  label="Parent Name"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  required
                  error={!!errors.parent_name}
                  helperText={errors.parent_name}
                  sx={{ mb: "5%" }}
                />

                <TextField
                  fullWidth
                  type="text"
                  label="Parent Phone"
                  name="parent_phone"
                  value={formData.parent_phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits, max 10
                    if (/^\d{0,10}$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ inputMode: "numeric", maxLength: 10 }}
                  required
                  error={!!errors.parent_phone}
                  helperText={errors.parent_phone}
                  sx={{ mb: "5%" }}
                />


                <TextField
                  fullWidth
                  label="Native"
                  name="native"
                  value={formData.native}
                  onChange={handleChange}
                  required
                  error={!!errors.native}
                  helperText={errors.native}
                  sx={{ mb: "5%" }}
                />

                <FormControl fullWidth required error={!!errors.branch} sx={{ mb: "5%" }}>
                  <InputLabel>Branch</InputLabel>
                  <Select name="branch" value={formData.branch} onChange={handleChange}>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="AIDS">AIDS</MenuItem>
                    <MenuItem value="ECE">ECE</MenuItem>
                    <MenuItem value="MECH">MECH</MenuItem>
                    <MenuItem value="CIVIL">CIVIL</MenuItem>
                  </Select>
                  <FormHelperText>{errors.branch}</FormHelperText>
                </FormControl>

                <FormControl fullWidth required error={!!errors.year} sx={{ mb: "5%" }}>
                  <InputLabel>Year</InputLabel>
                  <Select name="year" value={formData.year} onChange={handleChange}>
                    <MenuItem value="I">I</MenuItem>
                    <MenuItem value="II">II</MenuItem>
                    <MenuItem value="III">III</MenuItem>
                    <MenuItem value="IV">IV</MenuItem>
                  </Select>
                  <FormHelperText>{errors.year}</FormHelperText>
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
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <FormControl
                  fullWidth
                  required
                  error={!!errors.counsellor}
                  sx={{ mb: "5%" }}
                >
                  <InputLabel>Counsellor</InputLabel>
                  <Select
                    name="counsellor"
                    value={formData.counsellor}
                    label="Counsellor"
                    onChange={handleChange}
                  >
                    <MenuItem value="Mr. Prakash">Mr. Prakash</MenuItem>
                    <MenuItem value="Ms. Divya">Ms. Divya</MenuItem>
                    <MenuItem value="Mr. Karthik">Mr. Karthik</MenuItem>
                    <MenuItem value="Ms. Anitha">Ms. Anitha</MenuItem>
                  </Select>
                  <FormHelperText>{errors.counsellor}</FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  required
                  error={!!errors.year_coordinator}
                  sx={{ mb: "5%" }}
                >
                  <InputLabel>Year Coordinator</InputLabel>
                  <Select
                    name="year_coordinator"
                    value={formData.year_coordinator}
                    label="Year Coordinator"
                    onChange={handleChange}
                  >
                    <MenuItem value="Mr. Suresh">Mr. Suresh</MenuItem>
                    <MenuItem value="Ms. Kavitha">Ms. Kavitha</MenuItem>
                    <MenuItem value="Mr. Arun">Mr. Arun</MenuItem>
                    <MenuItem value="Ms. Meena">Ms. Meena</MenuItem>
                  </Select>
                  <FormHelperText>{errors.year_coordinator}</FormHelperText>
                </FormControl>

                <FormControl fullWidth required error={!!errors.hod} sx={{ mb: "5%" }}>
                  <InputLabel>HOD</InputLabel>
                  <Select
                    name="hod"
                    value={formData.hod}
                    label="HOD"
                    onChange={handleChange}
                  >
                    <MenuItem value="Dr. Ramesh Kumar">
                      Dr. Ramesh Kumar
                    </MenuItem>
                  </Select>
                  <FormHelperText>{errors.hod}</FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  required
                  error={!!errors.section}
                  sx={{ mb: "5%" }}
                >
                  <InputLabel>Section</InputLabel>
                  <Select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                  </Select>
                  <FormHelperText>{errors.section}</FormHelperText>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: "3%",
                    mb: "3%",
                    borderRadius: "1.5vh",
                    fontSize: "100%",
                  }}
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>

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
              </>
            )}
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default StudentRegistration;
