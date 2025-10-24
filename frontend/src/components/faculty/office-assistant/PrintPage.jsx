import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OaNavbar from "./OaNavbar";

const PrintPage = () => {
  const [searchReg, setSearchReg] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      name: "AKASH",
      regNo: "111723203001",
      branch: "IT",
      room: "120",
      year: "IV",
      gender: "Male",
      date: "2025-10-06",
    },
    {
      id: 2,
      name: "AKASH",
      regNo: "111723203002",
      branch: "IT",
      room: "121",
      year: "IV",
      gender: "Male",
      date: "2025-10-06",
    },
    {
      id: 3,
      name: "AKASH",
      regNo: "111723203001",
      branch: "IT",
      room: "122",
      year: "IV",
      gender: "Male",
      date: "2025-10-06",
    },
    {
      id: 4,
      name: "AKASH",
      regNo: "111723203001",
      branch: "IT",
      room: "123",
      year: "III",
      gender: "Female",
      date: "2025-10-06",
    },
    {
      id: 5,
      name: "AKASH",
      regNo: "111723203001",
      branch: "IT",
      room: "124",
      year: "II",
      gender: "Female",
      date: "2025-10-06",
    },
  ]);

  const filteredData = data.filter(
    (item) =>
      item.regNo.toLowerCase().includes(searchReg.toLowerCase()) &&
      (searchGender === "" || item.gender === searchGender) &&
      item.date.includes(searchDate)
  );

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        [
          "S.NO",
          "NAME",
          "REG.NO",
          "BRANCH",
          "ROOM NO",
          "YEAR",
          "GENDER",
          "DATE",
        ],
        ...filteredData.map((item, index) => [
          index + 1,
          item.name,
          item.regNo,
          item.branch,
          item.room,
          item.year,
          item.gender,
          item.date,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "StudentData.csv";
    link.click();
  };

  return (
    <div>
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        backgroundColor: "#f1f1f1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2%",
        boxSizing: "border-box",
      }}
    >
   
      {/* Search section */}
      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          gap: "2%",
          marginBottom: "2%",
          flexWrap: "wrap",
        }}
      >
        {/* Reg No */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "28%",
            backgroundColor: "white",
            borderRadius: "1.5vh",
            padding: "0.5%",
          }}
        >
          <TextField
            variant="standard"
            placeholder="REG NO"
            value={searchReg}
            onChange={(e) => setSearchReg(e.target.value)}
            InputProps={{ disableUnderline: true }}
            sx={{ flex: 1, fontSize: "2vh" }}
          />
          <IconButton>
            <SearchIcon sx={{ fontSize: "3vh" }} />
          </IconButton>
        </Box>

        {/* Date */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "25%",
            backgroundColor: "white",
            borderRadius: "1.5vh",
            padding: "0.5%",
          }}
        >
          <TextField
            type="date"
            variant="standard"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            InputProps={{ disableUnderline: true }}
            sx={{ flex: 1, fontSize: "2vh" }}
          />
          <IconButton>
            <CalendarMonthIcon sx={{ fontSize: "3vh" }} />
          </IconButton>
        </Box>

        {/* Gender */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "25%",
            backgroundColor: "white",
            borderRadius: "1.5vh",
            justifyContent: "center",
            padding: "0.5%",
          }}
        >
          <TextField
            
            select value={searchGender}
            onChange={(e) => setSearchGender(e.target.value)}
            variant="outlined"
            size="small"
            displayEmpty
            sx={{
              flex: 1,
              fontSize: "2vh",
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                paddingTop: 0,
                paddingBottom: 0,
                color: searchGender ? "black" : "gray", // Placeholder color
              },
              "& fieldset": {
                border: "none",
              },
              backgroundColor: "transparent",
            }}
          >
            {/* Placeholder shown when no selection is made */}
            <MenuItem value="">
              <em>Gender</em>
            </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* Table section */}
      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          flexDirection: "column",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            borderRadius: "2vh",
            overflowY: "auto",
            maxHeight: "60vh",
            backgroundColor: "#e0e0e0",
            padding: "1%",
          }}
        >
          <Table
            stickyHeader
            sx={{ borderCollapse: "separate", borderSpacing: "0 1vh" }}
          >
            <TableHead>
              <TableRow>
                {[
                  "S.NO",
                  "NAME",
                  "REG.NO",
                  "BRANCH",
                  "ROOM NO",
                  "YEAR",
                  "GENDER",
                  "EDIT",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "2vh",
                      backgroundColor: "#ffffff",
                      textAlign: "center",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "2vh",
                    boxShadow: "0px 1vh 2vh rgba(0,0,0,0.1)",
                    height: "7vh",
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: "2vh",
                      textAlign: "center",
                      borderRadius: "2vh 0 0 2vh",
                    }}
                  >
                    {index + 1}.
                  </TableCell>
                  <TableCell sx={{ fontSize: "2vh", textAlign: "center" }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "2vh", textAlign: "center" }}>
                    {row.regNo}
                  </TableCell>
                  <TableCell sx={{ fontSize: "2vh", textAlign: "center" }}>
                    {row.branch}
                  </TableCell>
                  <TableCell sx={{ fontSize: "2vh", textAlign: "center" }}>
                    {row.room}
                  </TableCell>
                  <TableCell sx={{ fontSize: "2vh", textAlign: "center" }}>
                    {row.year}
                  </TableCell>
                  <TableCell sx={{ fontSize: "2vh", textAlign: "center" }}>
                    {row.gender}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      borderRadius: "0 2vh 2vh 0",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row.id)}
                      sx={{
                        fontSize: "2vh",
                        borderRadius: "1.5vh",
                        padding: "0.5vh 2vh",
                        textTransform: "none",
                      }}
                    >
                      DELETE
                      <DeleteIcon sx={{ ml: 1, fontSize: "2.5vh" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Export button outside table container but aligned to table width */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1%",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={handleExport}
            sx={{
              backgroundColor: "#162D3A",
              color: "white",
              fontSize: "2.2vh",
              borderRadius: "2vh",
              padding: "1vh 4vh",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1F3D4C" },
              display: "flex",
              alignItems: "center",
            }}
          >
            Export
            <FileDownloadIcon sx={{ fontSize: "2.5vh", marginLeft: "1.5vh" }} />
          </Button>
        </Box>
      </Box>
    </Box>
    </div>
  );
};

export default PrintPage;