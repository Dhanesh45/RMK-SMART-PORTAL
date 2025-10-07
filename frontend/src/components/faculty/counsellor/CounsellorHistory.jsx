import React, { useState } from "react";

export default function CounsellorHistory() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const data = [
    { id: 1, name: "AKASH", regno: "111723203001", type: "OUTPASS", approved: "2006-05-10" },
    { id: 2, name: "AKASH", regno: "111723203021", type: "OUTPASS", approved: "2006-05-10" },
    { id: 3, name: "AKASH", regno: "111723203029", type: "OUTPASS", approved: "2006-05-10" },
    { id: 4, name: "ADITHYA", regno: "111723203004", type: "OD", approved: "2006-05-18" },
    { id: 5, name: "ANANDHI", regno: "111723203007", type: "OUTPASS", approved: "2006-06-01" },
    { id: 6, name: "ANUSUYA", regno: "111723203008", type: "OD", approved: "2006-06-05" },
    { id: 7, name: "ARUL JOTHIE", regno: "111723203009", type: "OUTPASS", approved: "2006-06-10" },
    { id: 8, name: "BHAVADHARANI", regno: "111723203010", type: "OUTPASS", approved: "2006-06-15" },
    { id: 9, name: "BHUVANESWARI K", regno: "111723203011", type: "OD", approved: "2006-06-20" },
    { id: 10, name: "BHUVANESHWARI S", regno: "111723203012", type: "OUTPASS", approved: "2006-06-25" },
    { id: 11, name: "CHENDRAYA SARAVANAN", regno: "111723203014", type: "OUTPASS", approved: "2006-07-01" },
    { id: 12, name: "VINISHIYA", regno: "111723203015", type: "OUTPASS", approved: "2006-07-05" },
    { id: 13, name: "DEEPAKRAJ", regno: "111723203016", type: "OD", approved: "2006-07-10" },
    { id: 14, name: "DEEPIKA", regno: "111723203017", type: "OUTPASS", approved: "2006-07-15" },
    { id: 15, name: "DEGA DHANUSH", regno: "111723203018", type: "OD", approved: "2006-07-20" },
    { id: 16, name: "DEIVANAI", regno: "111723203019", type: "OUTPASS", approved: "2006-07-25" },
    { id: 17, name: "DEVASRI", regno: "111723203020", type: "OUTPASS", approved: "2006-08-01" },
    { id: 18, name: "DHANESH", regno: "111723203021", type: "OD", approved: "2006-08-05" },
    { id: 19, name: "DHANRAJ", regno: "111723203022", type: "OUTPASS", approved: "2006-08-10" },
    { id: 20, name: "DHARSHINI", regno: "111723203023", type: "OD", approved: "2006-08-15" },
    { id: 14, name: "DEEPIKA", regno: "111723203017", type: "OUTPASS", approved: "2006-07-15" },
    { id: 15, name: "DEGA DHANUSH", regno: "111723203018", type: "OD", approved: "2006-07-20" },
    { id: 16, name: "DEIVANAI", regno: "111723203019", type: "OUTPASS", approved: "2006-07-25" },
    { id: 17, name: "DEVASRI", regno: "111723203020", type: "OUTPASS", approved: "2006-08-01" },
    { id: 18, name: "DHANESH", regno: "111723203021", type: "OD", approved: "2006-08-05" },
    { id: 19, name: "DHANRAJ", regno: "111723203022", type: "OUTPASS", approved: "2006-08-10" },
    { id: 20, name: "DHARSHINI", regno: "111723203023", type: "OD", approved: "2006-08-15" },
  ];

  const filtered = data.filter((item) => {
    // Corrected Logic: Only allow an EXACT match on the Register Number (regno).
    // If search is empty, it returns true (matches all).
    const matchSearch = search ? item.regno === search : true;
    
    const matchFrom = fromDate ? new Date(item.approved) >= new Date(fromDate) : true;
    const matchTo = toDate ? new Date(item.approved) <= new Date(toDate) : true;
    return matchSearch && matchFrom && matchTo;
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#EEEEEE",
        boxSizing: "border-box",
      }}
    >
      {/* NAV BAR */}
      <div>
        <div
          style={{ height: "10vh", width: "100vw", border: "2px solid black" }}
        >
          nav bar
        </div>
      </div>

      {/* Search + Date Filters */}
      <div
        style={{
          display: "flex", gap: "2%", marginBottom: "1%", flexDirection: "row", justifyContent: "flex-end", width: "94%", marginTop: "1%"
        }}
      >
        {/* REG NO input */}
        <div>
          <label>ENTER REG NO</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "6px",
              flex: "1",
              padding: "0 1%",

            }}
          >

            <input
              type="number"

              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: "1", border: "none", outline: "none", padding: "10px"
              }}
            />
            
          </div>
        </div>

        {/* FROM DATE input */}
        <div>
          <label> FROM DATE</label>
          <div

          >

            <input
              type="date"

              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{

                padding: "10px", borderRadius: "6px", border: "1px solid #ccc", flex: "1"


              }}
            />
          </div>
        </div>
        {/* TO DATE input */}
        <div>
          <label> TO DATE</label>
          <div
            style={{

            }}
          >
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
                padding: "10px", borderRadius: "6px", border: "1px solid #ccc", flex: "1",
                cursor: !fromDate ? "not-allowed" : "pointer",
                color: "black",
              }}
            />
          </div>
        </div>
      </div>

      {/* Table Container (scrollable) */}
      <div
        style={{
          width: "90%",
          height: "66%",
          backgroundColor: "#D9D9D9",
          margin: "auto",

          overflowY: "auto",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          padding: "0px 10px 10px 10px",
          borderTop: "8px solid #D9D9D9",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            borderRadius: "20px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "10px solid #D9D9D9" }}>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  padding: "0.75%",
                }}
              >
                S.NO
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  padding: "0.75%",
                }}
              >
                NAME
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  padding: "0.75%",
                }}
              >
                REGISTER NUMBER
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  padding: "0.75%",
                }}
              >
                TYPE
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  padding: "0.75%",
                }}
              >
                DATE
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length>0?(
            filtered.map((item) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: "white",
                  borderBottom: "8px solid #D9D9D9",

                  textAlign: "center",
                }}
              >
                <td
                  style={{
                    padding: "1%",
                    fontSize: "90%",

                  }}
                >
                  {item.id}
                </td>

                <td style={{ padding: "1%", fontSize: "90%" }}>{item.name}</td>
                <td style={{ padding: "1%", fontSize: "90%" }}>{item.regno}</td>
                <td style={{ padding: "1%", fontSize: "90%" }}>{item.type}</td>
                <td
                  style={{
                    padding: "1%",
                    fontSize: "90%",

                  }}
                >
                  {new Date(item.approved).toLocaleDateString("en-GB")}
                </td>
              </tr>))):(
                
                <tr>
                <td colSpan="6" style={{ textAlign : "center",padding:"2%"}}>
                No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}