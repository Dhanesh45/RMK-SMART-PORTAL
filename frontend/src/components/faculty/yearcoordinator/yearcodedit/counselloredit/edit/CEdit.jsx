import React, { useState } from "react";
import "./CEdit.css";
import CView from "../view/CView"; // ✅ Import the popup modal

// Sample data
const initialStudents = [
  { id: 1, name: "AKASH", email: "230329.it@rmkec.ac.in", branch: "IT", noOfStudents: 20 },
  { id: 2, name: "HARISH", email: "harish269005@gmail.com", branch: "CSE", noOfStudents: 18 },
  { id: 3, name: "MANOJ", email: "manoj@gmail.com", branch: "EEE", noOfStudents: 25 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
  { id: 4, name: "RAJ", email: "raj@gmail.com", branch: "MECH", noOfStudents: 30 },
];

const CEdit = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("counsellor");
  const [selectedStudent, setSelectedStudent] = useState(null); // ✅ Track student being edited

  // Filter by name
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Delete student
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Save updated student
  const handleSave = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
  };

  return (
    <div className="cedit-page">
      <div className="nav-space"></div>

      {/* Search Section */}
      <div className="search-container">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="search-inpu"
        >
          <option value="counsellor">Counsellor</option>
          <option value="student">Student</option>
        </select>
        <input
          type="text"
          placeholder="Counsellor Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <h2 className="title">COUNSELLOR DETAILS</h2>

      {/* Table */}
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
                  <th>NO OF STUDENTS</th>
                  <th>E-MAIL-ID</th>
                  <th>CONTROL</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, index) => (
                  <tr key={s.id}>
                    <td>{index + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.noOfStudents}</td>
                    <td>{s.email}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(s.id)}
                      >
                        DELETE
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => setSelectedStudent(s)} // ✅ Open popup
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

      {/* ✅ Show popup when editing */}
      {selectedStudent && (
        <CView
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CEdit;
