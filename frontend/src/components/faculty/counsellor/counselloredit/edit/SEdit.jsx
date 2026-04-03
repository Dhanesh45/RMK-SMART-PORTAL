import React, { useState } from "react";
import "./SEdit.css";
import SView from "../view/SView";
import axios from "axios";
import { useEffect } from "react";



const SEdit = ({ selectedView, setSelectedView }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
  const fetchStudents = async () => {
    try {
      const facultyData = JSON.parse(localStorage.getItem("facultyData"));
      const f_id = facultyData.id;

      const res = await axios.get(
        `http://localhost:5000/api/student/counsellor/${f_id}`
      );

      // Map backend → frontend format
  const formatted = res.data.map((s) => ({
  id: s.studentId,
  name: s.studentName,
  regNo: s.regNo,
  email: s.studentMail,

  year: s.year,
  branch: s.branch,
  section: s.section,

  gender: s.gender,
  accommodation: s.accommodation,
  parentName: s.parentName,
  parentPhone: s.parentPhone,
  native: s.native,

  counsellor: s.counsellor,
  yearCoordinator: s.yearCoordinator,
  hod: s.hod,
}));

      setStudents(formatted);
    } catch (err) {
      console.error(err);
      alert("Error fetching students");
    }
  };

  fetchStudents();
}, []);



  const filtered = students.filter((s) =>
    s.regNo.toLowerCase().includes(search.toLowerCase())
  );

 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/student/${id}`);
    setStudents(students.filter((s) => s.id !== id));
  } catch (err) {
    alert("Delete failed");
  }
};

const handleSave = async (updated) => {
  try {
    await axios.put(
      `http://localhost:5000/api/student/${updated.id}`,
      updated // ✅ send full data
    );

    setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
  } catch (err) {
    alert("Update failed");
  }
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

    </div>
  );
};

export default SEdit;