import React, { useState } from "react";

// Main Approval List Component
const HodApprovalList = () => {
  const studentsData = [
    { sno: 1, reg: 111723203001, name: "Akash", couns: "Bonafide" },
    { sno: 2, reg: 111723203003, name: "Leo", couns: "Fee Receipt" },
    { sno: 3, reg: 111723203004, name: "Dhinesh", couns: "Bonafide" },
    { sno: 4, reg: 111723203005, name: "Mukesh", couns: "Fee Receipt" },
    { sno: 5, reg: 111723203006, name: "Arul", couns: "Fee Receipt" },
    { sno: 6, reg: 111723203007, name: "Nair", couns: "Bonafide" },
    
     { sno: 4, reg: 111723203005, name: "Mukesh", couns: "Fee Receipt" },
    { sno: 5, reg: 111723203006, name: "Arul", couns: "Fee Receipt" },
    { sno: 6, reg: 111723203007, name: "Nair", couns: "Bonafide" },
     { sno: 4, reg: 111723203005, name: "Mukesh", couns: "Fee Receipt" },
    { sno: 5, reg: 111723203006, name: "Arul", couns: "Fee Receipt" },
    { sno: 6, reg: 111723203007, name: "Nair", couns: "Bonafide" },
  ];

  const [filterType, setFilterType] = useState("");
  const [filterReg, setFilterReg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);

  const filteredStudents = studentsData.filter(
    (student) =>
      (filterType === "" || student.couns === filterType) &&
      (filterReg === "" ||
        student.reg.toString().includes(filterReg.toString()))
  );

  // Modal Open Handler
  const openModal = (reg) => {
    setSelectedReg(reg);
    setShowModal(true);
  };

  // Modal Close Handler
  const closeModal = () => {
    setShowModal(false);
    setSelectedReg(null);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          height: "10vh",
          width: "100%",
        }}
      >
        NAV BAR
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(238, 238, 238, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "1%",
        }}
      >
        {/* Filter Section */}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            marginBottom: "2%",
          }}
        >
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "1% 2%",
              borderRadius: "1vh",
              border: "1px solid #ccc",
              fontSize: "2vh",
            }}
          >
            <option value="">All Types</option>
            <option value="Bonafide">Bonafide</option>
            <option value="Fee Receipt">Fee Receipt</option>
          </select>

          {/* Reg No Filter */}
          <input
            type="text"
            placeholder="Search Reg No"
            value={filterReg}
            onChange={(e) => setFilterReg(e.target.value)}
            style={{
              padding: "1% 2%",
              borderRadius: "1vh",
              border: "1px solid #ccc",
              fontSize: "2vh",
            }}
          />
        </div>

        {/* Table Container */}
        <div
          style={{
            width:"90%",
          height:"65vh",            
          backgroundColor: "#D9D9D9",
          marginRight:"auto",
          marginLeft:"auto",
          
          borderRadius: "20px",
          overflowY: "auto",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          padding: "0px 10px 3px 10px",
          borderTop: "8px solid #D9D9D9",

          }}
        >
          <table
            style={{
             width: "100%",
              height:"100%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",

            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>S.NO</th>
                <th style={headerStyle}>NAME</th>
                <th style={headerStyle}>REG.NO</th>
                <th style={headerStyle}>TYPE</th>
                <th style={headerStyle}>FORM DETAILS</th>
                <th style={headerStyle}>VALIDATION</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.sno}
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <td style={cellStyle}>{student.sno}</td>
                  <td style={cellStyle}>{student.name}</td>
                  <td style={cellStyle}>{student.reg}</td>
                  <td style={cellStyle}>{student.couns}</td>
                  <td style={cellStyle}>
                    <button
                      style={formBtn}
                      onClick={() => openModal(student.reg)}
                    >
                      VIEW FORM
                    </button>
                  </td>
                  <td style={cellStyle}>
                    <button style={approveBtn}>APPROVE</button>
                    <button style={rejectBtn}>REJECT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Buttons */}
          
        </div>
        <div
            style={{
              display: "flex",
              flexDirection:"row",
              justifyContent: "flex-end",
              width:"90%",
                alignItems:"flex-end",
              height:"10%"
              
            }}
          >
            {/* Request Access */}
            

            {/* Approve All */}
            <button
              style={{
                backgroundColor: "#3b4b75",
                color: "white",
                border: "none",
               padding:"0.75% 2% ",
            
              
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Approve All
            </button>
          </div>

      </div>
      {/* FORM POPUP MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.25)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", width:"90%" }}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position:"absolute",
                top: "3vh",
                right: "1vw",
                fontSize: "4vh",
                color: "#000000ff",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 0,
              }}
            >
              &#10005;
            </button>
            <BonafideForm />
          </div>
        </div>
      )}
    </div>
  );
};

// Bonafide Form Component (unchanged style)
const BonafideForm = () => {
  return (
    <div
      
    >
     
      {/* Form Container */}
      <div
        style={{
          marginTop: "1%",
          width: "100%",
         
          backgroundColor: "#fff",
          borderRadius: "2vh",
          padding: "1% 2%",
          boxShadow: "0 0 1vh rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2%",
            fontSize: "3.2vh",
            fontWeight: "bolder",
            color: "rgba(30, 46, 79, 1)",
          }}
        >
          APPLICATION FORM FOR BONAFIDE CERTIFICATE
        </h2>
        {/* Form Fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3% 5%",
            fontSize: "2vh",
          }}
        >
          <div style={fieldStyle}>
            <label style={labelStyle}>Reason for Bonafide Request</label>
            <input type="text" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "85.3%", }}>
            <div style={fieldStyle}><label style={labelStyle}>Year</label>
              <select style={{
                padding: "15%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "310%",
              }} >
                <option>Year</option>
                <option>I Year</option>
                <option>II Year</option>
                <option>III Year</option>
                <option>IV Year</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Father’s/Guardian’s Name</label>
              <input type="text" style={{
                padding: "5%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "142%",
              }} />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Name</label>
            <input type="text" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Register Number</label>
            <input type="number" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between",width:"78%" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>
              Branch</label>
              <input type="text" style={{
                padding: "6%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "143%",
              }} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Section</label>
              <select style={{
                padding: "8%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "177%",
              }} >
                <option>Select your section</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D </option>
                <option>E</option>
              </select>
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>House No</label>
            <input type="number" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "82%" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" style={{
                padding: "10%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "190%",
              }} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Age</label>
              <input type="number" style={{
                padding: "7%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "155%",
              }} />
            </div>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Street Name</label>
            <input type="text" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter Area</label>
            <input type="text" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter City</label>
            <input type="text" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
        
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter State</label>
            <input type="text" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Enter Pincode</label>
            <input type="Number" style={{
                padding: "2%",
                borderRadius: "1vh",
                border: "1px solid #999",
              }} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Select Category</label>
            <select style={{
              padding: "2%",
              borderRadius: "1vh",
              border: "1px solid #999",
              width: "100%",
            }} >
              <option>Select Category</option>
              <option>GOVERMENT QUOTA</option>
              <option>MANAGEMENT QUOTA</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>
              If Dayscholar, Boarding Place</label>
              <input type="text" style={{
                padding: "4%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "110%",
              }} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Select the Type of Bonafide</label>
              <select style={{
                padding: "4%",
                borderRadius: "1vh",
                border: "1px solid #999",
                width: "100%",
              }} >
                <option>Select the Type of Bonafide</option>
                <option>WITH FEE STRUCTURE</option>
                <option>WITHOUT FEE STRUCTURE</option>
                <option>INPLANT TRAINING /PROJECT WORK</option>
                <option>PAPER PRESENTATION </option>
                <option>GENERAL</option>
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent:"end",
              padding:"2%",
              width:"200%",
              alignItems: "end",
            }}
          >
            
          </div>
        </div>
      </div>
    </div>
  );
};

// Style objects (unchanged)
const headerStyle = {
    backgroundColor: "white",
  
  position: "sticky",
                  top: 0,
                  
                  zIndex: 1,
                  padding: "0.75%",
  textAlign: "center",

};
const cellStyle = {
  padding: "0.7%",
  textAlign: "center",
};
const approveBtn = {
  fontWeight: "bold",
  padding: "1% 2%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "1vh",
  marginRight: "5%",
};
const rejectBtn = {
  fontWeight: "bold",
  padding: "1% 2%",
  color: "white",
  backgroundColor: "#d9534f",
  border: "none",
  borderRadius: "1vh",
};
const formBtn = {
  fontWeight: "bold",
  padding: "2% 4%",
  color: "white",
  backgroundColor: "#3b4b75",
  border: "none",
  borderRadius: "3vh",
  cursor: "pointer",
};
const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  height: "10vh",
  fontSize: "2.1vh",
};
const labelStyle = {
  marginBottom: "0.9vh",
  fontWeight: "600",
  fontSize: "2.5vh",
  color: "rgba(0, 0, 0, 1)",
};

export default HodApprovalList;