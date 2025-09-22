import React, { useState } from "react";
import "./CEdit.css";
import CView from "./view/CView.jsx";

const initialStudents = [
  { id: 1, name: "AKASH", regNo: "111723203001", email: "230329.it@rmkec.ac.in", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 2, name: "HARISH", regNo: "111723203002", email: "harish269005@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Male", section: "B", branch: "CSE" },
  { id: 3, name: "ABISHEK", regNo: "111723203003", email: "abishek@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 4, name: "ABINAYA", regNo: "111723203004", email: "abinaya@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Female", section: "B", branch: "CSE" },
  { id: 5, name: "ADITHYA", regNo: "111723203005", email: "adithya@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 6, name: "AGILA", regNo: "111723203006", email: "agila@gmail.com", year: "1", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Female", section: "C", branch: "CSE" },
  { id: 7, name: "AJITH", regNo: "111723203007", email: "ajith@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 8, name: "ANANDHI", regNo: "111723203008", email: "anandhi@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Female", section: "B", branch: "CSE" },
  { id: 9, name: "ARUL", regNo: "111723203009", email: "arul@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 10, name: "BHUVANESWARI", regNo: "111723203010", email: "bhuvana@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Female", section: "B", branch: "CSE" },
  { id: 11, name: "CHENDRAYA", regNo: "111723203011", email: "chend@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 12, name: "DEEPAK", regNo: "111723203012", email: "deepak@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Male", section: "B", branch: "CSE" },
  { id: 13, name: "DIVYA", regNo: "111723203013", email: "divya@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Female", section: "A", branch: "IT" },
  { id: 14, name: "GANESH", regNo: "111723203014", email: "ganesh@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Male", section: "B", branch: "CSE" },
  { id: 15, name: "GOKUL", regNo: "111723203015", email: "gokul@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 16, name: "GOWTHAM", regNo: "111723203016", email: "gowtham@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Male", section: "B", branch: "CSE" },
  { id: 17, name: "HARINI", regNo: "111723203017", email: "harini@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Female", section: "A", branch: "IT" },
  { id: 18, name: "HEMANTH", regNo: "111723203018", email: "hemanth@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Male", section: "B", branch: "CSE" },
  { id: 19, name: "JAGADISH", regNo: "111723203019", email: "jagadish@gmail.com", year: "3", yearCoordinator: "Mr. Kumar", counsellor: "Mr. Ravi", gender: "Male", section: "A", branch: "IT" },
  { id: 20, name: "MANOJ", regNo: "111723203020", email: "manoj@gmail.com", year: "2", yearCoordinator: "Mrs. Priya", counsellor: "Ms. Devi", gender: "Male", section: "B", branch: "CSE" },
];

const CEdit = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = students.filter((s) =>
    s.regNo.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleSave = (updated) => {
    setStudents(
      students.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  return (
    <div className="cedit-page">
      <div className="nav-space"></div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Reg No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="title">STUDENT DETAILS</h2>

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
                <th>REG.NO</th>
                <th>E-MAIL-ID</th>
                <th>CONTROL</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.regNo}</td>
                  <td>{s.email}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(s.id)}>DELETE</button>
                    <button className="edit-btn" onClick={() => setSelectedStudent(s)}>EDIT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

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
