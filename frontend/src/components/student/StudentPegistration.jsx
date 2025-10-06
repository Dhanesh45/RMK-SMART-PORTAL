import React from "react";
import loginimg from "../../assets/login.png"
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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const StudentRegistration = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'linear-gradient(to bottom, rgba(49, 72, 122, 1), rgba(143, 179, 226, 1))'
      }}
      
    
    >
      {/* Outer Container */}
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
        {/* Left Side Image */}
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

        {/* Right Side Form (Scrollable) */}
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

            {/* Name */}
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              sx={{ mb: "5%" }}
            />

            {/* Registration Number */}
            <TextField
              fullWidth
              label="Registration Number"
              variant="outlined"
              sx={{ mb: "5%" }}
            />

            {/* Email */}
            <TextField
              fullWidth
              type="email"
              label="E-Mail"
              variant="outlined"
              sx={{ mb: "5%" }}
            />

            {/* Password */}
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              sx={{ mb: "5%" }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              sx={{ mb: "5%" }}
            />

            {/* Gender */}
            <FormControl fullWidth sx={{ mb: "5%" }}>
              <Typography
                sx={{
                  fontSize: "100%",
                  color: "text.secondary", // lighter color
                  mb: "2%",
                }}
              >
                Gender
              </Typography>
              <FormGroup
                row
                sx={{
                  ml: "1%", // small left padding to align with fields
                }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Male"
                  sx={{ mr: "10%", color: "text.secondary" }}
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Female"
                  sx={{ mr: "10%",color: "text.secondary" }}
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Prefer not to say"
                  sx={{ color: "text.secondary" }}
                />
              </FormGroup>
            </FormControl>

            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Type</InputLabel>
              <Select defaultValue="Hosteler">
                <MenuItem value="c1">Hosteler</MenuItem>
                <MenuItem value="c2">Dayscholar</MenuItem>
              </Select>
            </FormControl>

            {/* Year Co-ordinator */}
            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Year Co-ordinator</InputLabel>
              <Select defaultValue="">
                <MenuItem value="c1">Coordinator 1</MenuItem>
                <MenuItem value="c2">Coordinator 2</MenuItem>
              </Select>
            </FormControl>

            {/* Counsellor */}
            <FormControl fullWidth sx={{ mb: "5%" }}>
              <InputLabel>Counsellor</InputLabel>
              <Select defaultValue="">
                <MenuItem value="con1">Counsellor 1</MenuItem>
                <MenuItem value="con2">Counsellor 2</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: "5%",
                backgroundColor: "",
                borderRadius: "1.5vh",
                fontSize: "100%",
                "&:hover": { backgroundColor: "#218838" },
              }}
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