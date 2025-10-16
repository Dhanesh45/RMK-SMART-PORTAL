import React, { useState } from "react";
import OSNavbar from "./OSNavbar";

const OsHistoryPage = () => {
  const historyData = [
    {
      sno: 1,
      name: "Aakash",
      regno: "111723203001",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/06/2015",
      generated: "19/06/2015",
    },
    {
      sno: 2,
      name: "Abishek",
      regno: "111723203002",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "26/05/2025",
      generated: "28/05/2025",
    },
    {
      sno: 3,
      name: "Abinaya",
      regno: "111723203003",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "18/04/2016",
      generated: "19/06/2015",
    },
    {
      sno: 4,
      name: "Adithya Baba",
      regno: "111723203004",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "01/02/2019",
      generated: "19/06/2025",
    },
    {
      sno: 5,
      name: "Agila",
      regno: "111723203005",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "10/04/2020",
      generated: "19/06/2015",
    },
    {
      sno: 6,
      name: "Ajith Kumar",
      regno: "111723203006",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "13/10/2016",
      generated: "19/06/2015",
    },
    {
      sno: 7,
      name: "Anandhi",
      regno: "111723203007",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "21/01/2021",
      generated: "19/06/2015",
    },
    {
      sno: 8,
      name: "Anusuya",
      regno: "111723203008",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "27/07/2023",
      generated: "19/06/2025",
    },
    {
      sno: 9,
      name: "Arul Jothee",
      regno: "111723203009",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "04/05/2022",
      generated: "19/06/2015",
    },
    {
      sno: 10,
      name: "Bhavadharani",
      regno: "111723203010",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "12/08/2024",
      generated: "19/06/2015",
    },
    {
      sno: 11,
      name: "Bhuvaneswari K",
      regno: "111723203011",
      branch: "IT",
      type: "BONAFIDE",
      year: "IV",
      approved: "10/10/2022",
      generated: "19/06/2015",
    },
    {
      sno: 12,
      name: "Bhuvaneshwari S",
      regno: "111723203012",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "17/05/2025",
      generated: "19/06/2025",
    },
    {
      sno: 13,
      name: "Shruthi",
      regno: "111723203013",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2025",
      generated: "19/06/2015",
    },
    {
      sno: 14,
      name: "Chendraya Saravanan",
      regno: "111723203014",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 15,
      name: "Vinishiya",
      regno: "111723203015",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 16,
      name: "Deepakraj",
      regno: "111723203016",
      branch: "ECE",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 17,
      name: "Deepika",
      regno: "111723203017",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2025",
    },
    {
      sno: 18,
      name: "Dega Dhanush",
      regno: "111723203018",
      branch: "IT",
      type: "BONAFIDE",
      year: "IV",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 19,
      name: "Deivanai",
      regno: "111723203019",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2025",
    },
    {
      sno: 20,
      name: "Devasri",
      regno: "111723203020",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 21,
      name: "Dhanesh",
      regno: "111723203021",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 22,
      name: "Dhanraj",
      regno: "111723203022",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 23,
      name: "Dharshini",
      regno: "111723203023",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2025",
    },
    {
      sno: 24,
      name: "Dhinesh",
      regno: "111723203024",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 25,
      name: "Divyadharshini",
      regno: "111723203025",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 26,
      name: "Ganesan",
      regno: "111723203026",
      branch: "IT",
      type: "BONAFIDE",
      year: "IV",
      approved: "19/05/2006",
      generated: "19/06/2025",
    },
    {
      sno: 27,
      name: "Ganga",
      regno: "111723203027",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 28,
      name: "Gnaanesh",
      regno: "111723203028",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 29,
      name: "Gokul",
      regno: "111723203029",
      branch: "IT",
      type: "BONAFIDE",
      year: "IV",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 30,
      name: "Gowtham",
      regno: "111723203030",
      branch: "EEE",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 31,
      name: "Gracelin",
      regno: "111723203031",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 32,
      name: "Harini",
      regno: "111723203032",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 33,
      name: "Harirajan",
      regno: "111723203033",
      branch: "IT",
      type: "BONAFIDE",
      year: "IV",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 34,
      name: "Harish",
      regno: "111723203034",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 35,
      name: "Harishta",
      regno: "111723203035",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 36,
      name: "Harry Joel",
      regno: "111723203036",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 37,
      name: "Hemanth Kumar",
      regno: "111723203037",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 38,
      name: "Jagadish",
      regno: "111723203038",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 39,
      name: "Jaishree",
      regno: "111723203039",
      branch: "IT",
      type: "BONAFIDE",
      year: "IV",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 40,
      name: "Jaisurya",
      regno: "111723203040",
      branch: "IT",
      type: "BONAFIDE",
      year: "II",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 41,
      name: "Ragul",
      regno: "111723203121",
      branch: "IT",
      type: "BONAFIDE",
      year: "III",
      approved: "19/05/2006",
      generated: "19/06/2015",
    },
    {
      sno: 42,
      name: "Manoj",
      regno: "111723203124",
      branch: "CSE",
      type: "BONAFIDE",
      year: "IV",
      approved: "17/06/2025",
      generated: "19/06/2025",
    },
  ];

  // filters state

  const [yearFilter, setYearFilter] = useState("");
  const [regnoFilter, setRegnoFilter] = useState("");
  const [branchFilter, setbranchFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // filtering logic
  const filteredData = historyData.filter((row) => {
    const matchesYear = yearFilter ? row.year === yearFilter : true;
    const matchesRegno = regnoFilter ? row.regno.includes(regnoFilter) : true;
    const matchesBranch = branchFilter ? row.branch === branchFilter : true;

    // Convert dd/mm/yyyy -> Date
    const parseDate = (str) => {
      if (!str) return null;
      const [day, month, year] = str.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const approvedDate = parseDate(row.approved);
    const generatedDate = parseDate(row.generated);

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    let matchesDate = true;

    if (from && to) {
      //  include rows where either approved OR generated falls in range
      matchesDate =
        (approvedDate && approvedDate >= from && approvedDate <= to) ||
        (generatedDate && generatedDate >= from && generatedDate <= to);
    } else if (from) {
      matchesDate =
        (approvedDate && approvedDate >= from) ||
        (generatedDate && generatedDate >= from);
    } else if (to) {
      matchesDate =
        (approvedDate && approvedDate <= to) ||
        (generatedDate && generatedDate <= to);
    }

    return matchesYear && matchesRegno && matchesBranch && matchesDate;
  });

  return (
    <div
      style={{
        width: "100%",
        Height: "80vh",
        boxSizing: "border-box",
        fontSize: "2vh",
        overflow: "hidden",
       
      }}
    >
      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "2%",
          marginBottom: "2%",
          padding: "1%",
        }}
      >
        {/* Reg No filter */}
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>
            REG NO
          </label>
          <input
            type="text"
            placeholder="Enter Reg No"
            value={regnoFilter}
            onChange={(e) => setRegnoFilter(e.target.value)}
            style={{
              padding: "1.5vh",
              borderRadius: "1vh",
              border: "0.3vh solid #ccc",
            }}
          />
        </div>

        {/* Dept Filter */}

        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>
            BRANCH
          </label>
          <select
            value={branchFilter}
            onChange={(e) => setbranchFilter(e.target.value)}
            style={{
              padding: "1.5vh",
              borderRadius: "1vh",
              border: "0.3vh solid #ccc",
            }}
          >
            <option value="">SELECT BRANCH</option>
            <option value="IT">IT</option>
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        {/* Year filter */}
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>
            YEAR
          </label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            style={{
              padding: "1.5vh",
              borderRadius: "1vh",
              border: "0.3vh solid #ccc",
            }}
          >
            <option value="">SELECT YEAR</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </div>

        {/* From Date */}
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>
            FROM DATE
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{
              padding: "2%",
              borderRadius: "1vh",
              border: "0.3vh solid #ccc",
              flex: "1",
            }}
          />
        </div>

        {/* To Date */}
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>
            TO DATE
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{
              padding: "2%",
              borderRadius: "1vh",
              border: "0.3vh solid #ccc",
              flex: "1",
            }}
          />
        </div>
      </div>
      {/* Table */}
      <div
        style={{
          backgroundColor: "#f2f2f2",
          borderRadius: "2vh",
          padding: "2%",
          height: "65vh", // ✅ fix height for table container
          overflow: "hidden",
        }}
      >
        <div style={{ height: "100%", overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 1vh",
              fontSize: "2vh",
            }}
          >
            {/* Header */}
            <thead>
              <tr style={{ backgroundColor: "#ffffff" }}>
                {[
                  "S.NO",
                  "NAME",
                  "REG.NO",
                  "TYPE",
                  "BRANCH",
                  "YEAR",
                  "APPROVED",
                  "GENERATED",
                ].map((head, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "2%",
                      textAlign: "left",
                      fontWeight: "bold",
                      position: "sticky",
                      top: 0,
                      background: "#fff",
                      zIndex: 2,
                      borderTopLeftRadius: i === 0 ? "1vh" : "0",
                      borderTopRightRadius: i === 5 ? "1vh" : "0",
                    }}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr
                    key={row.sno}
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      borderRadius: "1vh",
                    }}
                  >
                    <td
                      style={{
                        padding: "2%",
                        borderTopLeftRadius: "1vh",
                        borderBottomLeftRadius: "1vh",
                      }}
                    >
                      {row.sno}.
                    </td>
                    <td style={{ padding: "2%" }}>{row.name}</td>
                    <td style={{ padding: "2%" }}>{row.regno}</td>
                    <td style={{ padding: "2%" }}>{row.type}</td>
                    <td style={{ padding: "2%" }}>{row.branch}</td>
                    <td style={{ padding: "2%" }}>{row.year}</td>
                    <td style={{ padding: "2%" }}>{row.approved}</td>
                    <td
                      style={{
                        padding: "2%",
                        borderTopRightRadius: "1vh",
                        borderBottomRightRadius: "1vh",
                      }}
                    >
                      {row.generated}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "2%" }}
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OsHistoryPage;
