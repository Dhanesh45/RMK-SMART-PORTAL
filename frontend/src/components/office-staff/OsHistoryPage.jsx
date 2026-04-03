import React, { useState } from "react";
import OSNavbar from "./OSNavbar";
import axios from "axios";
import { useEffect } from "react";

const OsHistoryPage = () => {

  // filters state
  const [historyData, setHistoryData] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [regnoFilter, setRegnoFilter] = useState("");
  const [branchFilter, setbranchFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


const getHistory = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/bonafide/history"
    );
    console.log(res.data);
    setHistoryData(res.data || []);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  getHistory();
}, []);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
};

  //filtering logic
  const filteredData = (historyData || []).filter((row) => {
  const matchesYear = yearFilter
    ? row.student?.year === yearFilter
    : true;

 const matchesRegno = regnoFilter
  ? row.student?.reg_no
      ?.toLowerCase()
      .includes(regnoFilter.toLowerCase())
  : true;

  const matchesBranch = branchFilter
    ? row.student?.branch === branchFilter
    : true;

 const approvedDate = row.hod_approved_date
  ? new Date(row.hod_approved_date)
  : null;

const generatedDate = row.generated_date
  ? new Date(row.generated_date)
  : null;

  const from = fromDate ? new Date(fromDate) : null;
  const to = toDate ? new Date(toDate) : null;

  let matchesDate = true;

if (from && to) {
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

  return (
    matchesYear &&
    matchesRegno &&
    matchesBranch &&
    matchesDate
  );
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
                      {row.ap_id}
                    </td>
                    <td style={{ padding: "2%" }}>{row.student?.student_name}</td>
                    <td style={{ padding: "2%" }}>{row.student?.reg_no}</td>
                    <td style={{ padding: "2%" }}>{row.type_of_application}</td>
                    <td style={{ padding: "2%" }}>{row.student?.branch}</td>
                    <td style={{ padding: "2%" }}>{row.student?.year}</td>
                    <td style={{ padding: "2%" }}>{formatDate(row.hod_approved_date)}</td>
                    <td
                      style={{
                        padding: "2%",
                        borderTopRightRadius: "1vh",
                        borderBottomRightRadius: "1vh",
                      }}
                    >
                      {formatDate(row.generated_date)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
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
