import React, { useState } from "react";
// import { BiSearchAlt } from "react-icons/bi";
export default function SmartPortal() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGender, setFilterGender] = useState("");

  const data = [
    { id: 1, name: "AKASH", regno: "111723203001", type: "OUTPASS", gender: "MALE", approved: "2006-05-10" },
    { id: 2, name: "AKASH", regno: "111723203021", type: "OUTPASS", gender: "MALE", approved: "2006-05-10" },
    { id: 3, name: "AKASH", regno: "111723203029", type: "OUTPASS", gender: "MALE", approved: "2006-05-10" },
    { id: 4, name: "ADITHYA", regno: "111723203004", type: "OD", gender: "MALE", approved: "2006-05-18" },
    { id: 5, name: "ANANDHI", regno: "111723203007", type: "OUTPASS", gender: "MALE", approved: "2006-06-01" },
    { id: 6, name: "ANUSUYA", regno: "111723203008", type: "OD", gender: "MALE", approved: "2006-06-05" },
    { id: 7, name: "ARUL JOTHIE", regno: "111723203009", type: "OUTPASS", gender: "FEMALE", approved: "2006-06-10" },
    { id: 8, name: "BHAVADHARANI", regno: "111723203010", type: "OUTPASS", gender: "MALE", approved: "2006-06-15" },
    { id: 9, name: "BHUVANESWARI K", regno: "111723203011", type: "OD", gender: "FEMALE", approved: "2006-06-20" },
    { id: 10, name: "BHUVANESHWARI S", regno: "111723203012", type: "OUTPASS", gender: "FEMALE", approved: "2006-06-25" },
    { id: 11, name: "CHENDRAYA SARAVANAN", regno: "111723203014", type: "OUTPASS", gender: "FEMALE", approved: "2006-07-01" },
    { id: 12, name: "VINISHIYA", regno: "111723203015", type: "OUTPASS", gender: "FEMALE", approved: "2006-07-05" },
    { id: 13, name: "DEEPAKRAJ", regno: "111723203016", type: "OD", gender: "FEMALE", approved: "2006-07-10" },
    { id: 14, name: "DEEPIKA", regno: "111723203017", type: "OUTPASS", gender: "FEMALE", approved: "2006-07-15" },
    { id: 15, name: "DEGA DHANUSH", regno: "111723203018", type: "OD", gender: "MALE", approved: "2006-07-20" },
    { id: 16, name: "DEIVANAI", regno: "111723203019", type: "OUTPASS", gender: "FEMALE", approved: "2006-07-25" },
    { id: 17, name: "DEVASRI", regno: "111723203020", type: "OUTPASS", gender: "FEMALE", approved: "2006-08-01" },
    { id: 18, name: "DHANESH", regno: "111723203021", type: "OD", gender: "MALE", approved: "2006-08-05" },
    { id: 19, name: "DHANRAJ", regno: "111723203022", type: "OUTPASS", gender: "MALE", approved: "2006-08-10" },
    { id: 20, name: "DHARSHINI", regno: "111723203023", type: "OD", gender: "FEMALE", approved: "2006-08-15" },
  ];

  const filtered = data.filter((item) => {
    const matchSearch = search ? item.regno.includes(search) : true;
    const matchFrom = fromDate ? new Date(item.approved) >= new Date(fromDate) : true;
    const matchTo = toDate ? new Date(item.approved) <= new Date(toDate) : true;
    const matchType = filterType ? item.type === filterType : true;
    const matchGender = filterGender ? item.gender === filterGender : true;
    return matchSearch && matchFrom && matchTo && matchType && matchGender;
  });

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "#EEEEEE", boxSizing: "border-box" }}>
      {/* NAV BAR */}
      <div style={{ height: "10vh", width: "100vw", border: "0.3vh solid black" }}>nav bar</div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "2%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          padding: "2% 0"
        }}
      >
        {/* TYPE SELECT */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "1vh", fontWeight: "bold", color: "rgba(146, 138, 138, 1)", fontSize: "2.5vh" }}>TYPE</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "2.5%",
              borderRadius: "1.5vh",
              border: "0.2vh solid #ccc",
              minWidth: "14vw",
              backgroundColor: "white",
              fontSize: "2.5vh",
            }}
          >
            <option value="">All</option>
            <option value="OD">ON-DUTY</option>
            <option value="OUTPASS">OUTPASS</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "1vh", fontWeight: "bold", fontSize: "2.5vh", color: "rgba(146, 138, 138, 1)" }}>GENDER</label>
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            style={{
              padding: "2.5%",
              borderRadius: "1.5vh",
              border: "0.2vh solid #ccc",
              minWidth: "14vw",
              backgroundColor: "white",
              fontSize: "2.5vh",
            }}
          >
            <option value=""></option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>



        {/* REG NO input */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "1vh", fontWeight: "bold", fontSize: "2.5vh", color: "rgba(146, 138, 138, 1)" }}>ENTER REG NO</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "2.5%",
              borderRadius: "1.5vh",
              width: "100%",
              border: "0.2vh solid #ccc",
              backgroundColor: "white",
              fontSize: "2.5vh",
              
            }}
            
          />
          {/* <BiSearchAlt /> */}

        </div>

        {/* FROM DATE */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "1vh", fontWeight: "bold", fontSize: "2.5vh", color: "rgba(146, 138, 138, 1)" }}>FROM DATE</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{
              padding: "2.5%",
              borderRadius: "1.5vh",
              minWidth: "14vw",
              border: "0.2vh solid #ccc",
              backgroundColor: "white",
              fontSize: "2.5vh",
            }}
          />
        </div>

        {/* TO DATE */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "1vh", fontWeight: "bold", fontSize: "2.5vh", color: "rgba(146, 138, 138, 1)" }}>TO DATE</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => {
              if (fromDate && new Date(e.target.value) < new Date(fromDate)) {
                alert("To date must be greater than or equal to from date.");
              } else {
                setToDate(e.target.value);
              }
            }}
            disabled={!fromDate}
            style={{
              padding: "2.5%",
              borderRadius: "1.5vh",
              minWidth: "14vw",
              border: "0.2vh solid #ccc",
              cursor: !fromDate ? "not-allowed" : "pointer",
              backgroundColor: "white",
              fontSize: "2.5vh",
            }}
          />
        </div>
      </div>

      {/* Table */}

      <div
        style={{
          width: "90%",
          height: "60vh",
          backgroundColor: "rgba(238, 238, 238, 1)",
          margin: "auto",
          borderRadius: "2vh",
          border: "1vh solid rgba(217, 217, 217, 1)",
          overflowY: "auto",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%", borderRadius: "2vh", }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "white", borderBottom: "1vh solid #D9D9D9", }}>
            <tr>
              <th style={{ padding: "1%", fontSize: "2.5vh", textAlign: "center" }}>NAME</th>
              <th style={{ padding: "1%", fontSize: "2.5vh", textAlign: "center" }}>REGISTER NUMBER</th>
              <th style={{ padding: "1%", fontSize: "2.5vh", textAlign: "center" }}>TYPE</th>
              <th style={{ padding: "1%", fontSize: "2.5vh", textAlign: "center" }}>GENDER</th>
              <th style={{ padding: "1%", fontSize: "2.5vh", textAlign: "center" }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: "white",
                  borderBottom: "1vh solid #D9D9D9",
                  textAlign: "center",
                }}
              >
                <td style={{ padding: "0.8%", fontSize: "2.2vh" }}>{item.name}</td>
                <td style={{ padding: "0.8%", fontSize: "2.2vh" }}>{item.regno}</td>
                <td style={{ padding: "0.8%", fontSize: "2.2vh" }}>{item.type}</td>
                <td style={{ padding: "0.8%", fontSize: "2.2vh" }}>{item.gender}</td>
                <td style={{ padding: "0.8%", fontSize: "2.2vh" }}>
                  {new Date(item.approved).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      

    </div>
  );
}