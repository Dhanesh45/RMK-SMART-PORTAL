import React, { useState } from "react";
import "./CEdit.css";
import CView from "../../../../yearcoordinator/yearcodedit/counselloredit/view/CView";

const initialCounsellors = [
  {
    id: 1,
    name: "AKASH",
    email: "230329.it@rmkec.ac.in",
    branch: "IT",
    noOfStudents: 20,
  },
  {
    id: 2,
    name: "HARISH",
    email: "harish269005@gmail.com",
    branch: "CSE",
    noOfStudents: 18,
  },
  {
    id: 3,
    name: "MANOJ",
    email: "manoj@gmail.com",
    branch: "EEE",
    noOfStudents: 25,
  },
  {
    id: 4,
    name: "RAJ",
    email: "raj@gmail.com",
    branch: "MECH",
    noOfStudents: 30,
  },
  {
    id: 5,
    name: "PRIYA",
    email: "priya@gmail.com",
    branch: "CIVIL",
    noOfStudents: 22,
  },
];

const CEdit = ({ selectedView, setSelectedView }) => {
  const [counsellors, setCounsellors] = useState(initialCounsellors);
  const [search, setSearch] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);

  const filtered = counsellors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setCounsellors(counsellors.filter((c) => c.id !== id));
  };

  const handleSave = (updated) => {
    setCounsellors(counsellors.map((c) => (c.id === updated.id ? updated : c)));
  };

  return (
    <div className="cedit-page">
      <div className="nav-space"></div>

      <div className="search-container">
        <select
          onChange={(e) => setSelectedView(e.target.value)}
          className="input"
          Value={selectedView}// or "student" or "yearcode" depending on the file
        >
          <option value="student">Student</option>
          <option value="yearcode">Year Code</option>
          <option value="counsellor">Counsellor</option>
          
        </select>

        <input
          type="text"
          placeholder="Counsellor Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="title">COUNSELLOR DETAILS</h2>

      {filtered.length === 0 ? (
        <p className="no-data">No data found</p>
      ) : (
        <div className="table">
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>NAME</th>
                  <th>BRANCH</th>
                  <th>NO OF STUDENTS</th>
                  <th>E-MAIL-ID</th>
                  <th>CONTROL</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.branch}</td>
                    <td>{c.noOfStudents}</td>
                    <td>{c.email}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(c.id)}
                      >
                        DELETE
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => setSelectedCounsellor(c)}
                      >
                        EDIT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedCounsellor && (
        <CView
          student={selectedCounsellor}
          onClose={() => setSelectedCounsellor(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CEdit;
