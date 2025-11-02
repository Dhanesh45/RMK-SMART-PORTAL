import React, { useState } from "react";
import "./SEdit.css";
import SView from "../../../../counsellor/counselloredit/view/SView";
import SAdd from "../../../../counsellor/counselloredit/add/SAdd";

const initialStudents = [
  {
    id: 1,
    name: "AKASH",
    regNo: "111723203001",
    email: "230329.it@rmkec.ac.in",
  },
  {
    id: 2,
    name: "HARISH",
    regNo: "111723203002",
    email: "harish269005@gmail.com",
  },
  { id: 3, name: "ABISHEK", regNo: "111723203003", email: "abishek@gmail.com" },
  { id: 4, name: "ABINAYA", regNo: "111723203004", email: "abinaya@gmail.com" },
];

const SEdit = ({ selectedView, setSelectedView }) => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = students.filter((s) =>
    s.regNo.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleSave = (updated) => {
    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleAdd = (newStudent) => {
    const newId = students.length + 1;
    setStudents([...students, { id: newId, ...newStudent }]);
  };

  return (
    <div className="cedit-page">
      <div className="nav-space"></div>

      <div className="search-container">
        <select
          onChange={(e) => setSelectedView(e.target.value)}
          className="input"
          value={selectedView}
        >
          <option value="student">Student</option>
         
          <option value="counsellor">Counsellor</option>
        </select>

        <input
          type="text"
          placeholder="Reg No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="edit-btn" onClick={() => setIsAddOpen(true)}>
          ADD
        </button>
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
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(s.id)}
                      >
                        DELETE
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => setSelectedStudent(s)}
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

      {selectedStudent && (
        <SView
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSave={handleSave}
        />
      )}

      {isAddOpen && (
        <SAdd
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default SEdit;