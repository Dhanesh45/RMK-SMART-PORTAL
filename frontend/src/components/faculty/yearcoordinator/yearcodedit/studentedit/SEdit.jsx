import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SEdit.css";

const SEdit = ({ selectedView, setSelectedView }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
  try {
    const faculty = JSON.parse(localStorage.getItem("facultyData"));

    console.log("Logged in faculty data:", faculty);

    const f_id = faculty?.id;

    console.log("Logged in YC ID:", f_id);

    if (!f_id) {
      console.error("Faculty ID not found");
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/student/year-coordinator/${f_id}`
    );

    const formatted = res.data.map((s) => ({
      id: s.studentId,
      name: s.studentName,
      regNo: s.regNo,
      email: s.studentMail,
    }));

    setStudents(formatted);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
  }
};

  const filtered = students.filter((s) =>
    s.regNo.toLowerCase().includes(search.toLowerCase())
  );

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
                      <button className="delete-btn">DELETE</button>
                      <button className="edit-btn">EDIT</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEdit;