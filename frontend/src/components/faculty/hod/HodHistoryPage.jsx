import React, { useState } from "react";

const HodHistoryPage = () => {
  const historyData = [
    { sno: 1, name: "Aakash", regno: "111723203001", type: "BONAFIDE", approved: "19/06/2015", year: "IV" },
    { sno: 2, name: "Abishek", regno: "111723203002", type: "BONAFIDE", approved: "26/05/2025", year: "IV" },
    { sno: 3, name: "Abinaya", regno: "111723203003", type: "LEAVE", approved: "18/04/2016", year: "IV" },
    { sno: 4, name: "Adithya Baba", regno: "111723203004", type: "BONAFIDE", approved: "01/02/2019", year: "III" },
    { sno: 5, name: "Agila", regno: "111723203005", type: "BONAFIDE", approved: "10/04/2020", year: "II" },
    { sno: 6, name: "Ajith Kumar", regno: "111723203006", type: "BONAFIDE", approved: "13/10/2016", year: "II" },
    { sno: 7, name: "Anandhi", regno: "111723203007", type: "LEAVE", approved: "21/01/2021", year: "II" },
    { sno: 8, name: "Anusuya", regno: "111723203008", type: "BONAFIDE", approved: "27/07/2023", year: "II" },
    { sno: 9, name: "Arul Jothee", regno: "111723203009", type: "BONAFIDE", approved: "04/05/2022", year: "II" },
    { sno: 10, name: "Bhavadharani", regno: "111723203010", type: "BONAFIDE", approved: "12/08/2024", year: "II" },
    { sno: 11, name: "Bhuvaneswari K", regno: "111723203011", type: "LEAVE", approved: "10/10/2022", year: "II" },
    { sno: 12, name: "Bhuvaneshwari S", regno: "111723203012", type: "BONAFIDE", approved: "17/05/2025", year: "II" },
    { sno: 13, name: "Shruthi", regno: "111723203013", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 14, name: "Chendraya Saravanan", regno: "111723203014", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 15, name: "Vinishiya", regno: "111723203015", type: "LEAVE", approved: "19/05/2006", year: "II" },
    { sno: 16, name: "Deepakraj", regno: "111723203016", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 17, name: "Deepika", regno: "111723203017", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 18, name: "Dega Dhanush", regno: "111723203018", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 19, name: "Deivanai", regno: "111723203019", type: "LEAVE", approved: "19/05/2006", year: "II" },
    { sno: 20, name: "Devasri", regno: "111723203020", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 21, name: "Dhanesh", regno: "111723203021", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 22, name: "Dhanraj", regno: "111723203022", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 23, name: "Dharshini", regno: "111723203023", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 24, name: "Dhinesh", regno: "111723203024", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 25, name: "Divyadharshini", regno: "111723203025", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 26, name: "Ganesan", regno: "111723203026", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 27, name: "Ganga", regno: "111723203027", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 28, name: "Gnaanesh", regno: "111723203028", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 29, name: "Gokul", regno: "111723203029", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 30, name: "Gowtham", regno: "111723203030", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 31, name: "Gracelin", regno: "111723203031", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 32, name: "Harini", regno: "111723203032", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 33, name: "Harirajan", regno: "111723203033", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 34, name: "Harish", regno: "111723203034", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 35, name: "Harishta", regno: "111723203035", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 36, name: "Harry Joel", regno: "111723203036", type: "LEAVE", approved: "19/05/2006", year: "II" },
    { sno: 37, name: "Hemanth Kumar", regno: "111723203037", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 38, name: "Jagadish", regno: "111723203038", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 39, name: "Jaishree", regno: "111723203039", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 40, name: "Jaisurya", regno: "111723203040", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 41, name: "Ragul", regno: "111723203121", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    { sno: 42, name: "Manoj", regno: "111723203124", type: "BONAFIDE", approved: "19/05/2006", year: "II" },
    
  ];

  // filters state
  const [typeFilter, setTypeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [regnoFilter, setRegnoFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // filtering logic
  const filteredData = historyData.filter((row) => {
    const matchesType = typeFilter ? row.type === typeFilter : true;
    const matchesYear = yearFilter ? row.year === yearFilter : true;
    const matchesRegno = regnoFilter ? row.regno.includes(regnoFilter) : true;

    const rowDate = new Date(row.approved);
    const matchesFrom = fromDate ? rowDate >= new Date(fromDate) : true;
    const matchesTo = toDate ? rowDate <= new Date(toDate) : true;

    return matchesType && matchesYear && matchesRegno && matchesFrom && matchesTo;
  });

  return (
    <div style={{ width: "100%", Height: "100vh",padding:"1%" , boxSizing: "border-box", fontSize: "2vh", overflow: "hidden" }}>
      {/* Top Navbar */}
      <div
        style={{
          backgroundColor: "#1e2a47",
          borderRadius: "2vh",
          padding: "1% 2%",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5%" }}>
          <div
            style={{
              backgroundColor: "#3a4b72",
              color: "white",
              fontWeight: "bold",
              borderRadius: "50%",
              width: "5vh",
              height: "5vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2vh"
            }}
          >
            L
          </div>
          <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>RMK SMART PORTAL</span>
        </div>
        <div style={{ display: "flex", gap: "1vw", alignItems: "center" }}>
          <span>HOME</span>
          <span style={{ fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap"}}>LOGIN HERE</span>
          <span>FEATURES</span>
          <button
            style={{
              border: "0.3vh solid white",
              borderRadius: "2vh",
              padding: "2% 3%",
              backgroundColor: "white",
              color: "#1e2a47",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "2vh"

            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "2%", marginBottom: "2%" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
        <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>TYPE</label>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: "1%", borderRadius: "1vh", border: "0.3vh solid #ccc", flex: "1" }}
        >
          <option value="">SELECT TYPE</option>
          <option value="BONAFIDE">BONAFIDE</option>
          <option value="LEAVE">LEAVE</option>
        </select>
        </div>
       
        {/* Reg No filter */}
    <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
    <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>REG NO</label>
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
        
   {/* Year filter */}
  <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
    <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>YEAR</label>
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
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }} >
        <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>FROM DATE</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ padding: "2%", borderRadius: "1vh", border: "0.3vh solid #ccc", flex: "1" }}
        />
        </div>
        
         {/* To Date */}
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
        <label style={{ fontSize: "1.5vh", marginBottom: "0.5vh" }}>TO DATE</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ padding: "2%", borderRadius: "1vh", border: "0.3vh solid #ccc", flex: "1" }}
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
          {["S.NO", "NAME", "REG.NO", "TYPE", "APPROVED", "YEAR"].map(
            (head, i) => (
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
            )
          )}
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
              <td style={{ padding: "2%", borderTopLeftRadius: "1vh", borderBottomLeftRadius: "1vh" }}>{row.sno}.</td>
              <td style={{ padding: "2%" }}>{row.name}</td>
              <td style={{ padding: "2%" }}>{row.regno}</td>
              <td style={{ padding: "2%" }}>{row.type}</td>
              <td style={{ padding: "2%" }}>{row.approved}</td>
              <td style={{ padding: "2%", borderTopRightRadius: "1vh", borderBottomRightRadius: "1vh"  }}>{row.year}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "2%" }}>
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

export default HodHistoryPage;