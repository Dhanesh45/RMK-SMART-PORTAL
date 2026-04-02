import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CEdit.css";
import CView from "../view/CView";
import CAdd from "../add/CAdd";

const CEdit = ({ selectedView, setSelectedView }) => {
  const [counsellors, setCounsellors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      const email = localStorage.getItem("facultyEmail");

      if (!email) {
        console.error("❌ facultyEmail missing in localStorage");
        return;
      }

      // ✅ Get logged-in year coordinator
      const facultyRes = await axios.get(
        `http://localhost:5000/api/faculty/email/${email}`
      );

      const branch = facultyRes.data.branch;

      if (!branch) {
        console.error("❌ Branch not found");
        return;
      }

      // ✅ Get all counsellors of same branch
      const counsellorRes = await axios.get(
        `http://localhost:5000/api/faculty/by-branch-role/${branch}/counsellor`
      );

      // ✅ Get students of branch for count
      const studentRes = await axios.get(
        `http://localhost:5000/api/student/branch/${branch}`
      );

      const students = studentRes.data;

      const finalCounsellors = counsellorRes.data.map((c) => ({
        id: c.f_id,
        name: c.faculty_name,
        email: c.mail,
        branch: c.faculty_branch,
        password: c.password || "",
        noOfStudents: students.filter(
          (s) => Number(s.counsellor) === Number(c.f_id)
        ).length,
      }));

      setCounsellors(finalCounsellors);
    } catch (error) {
      console.error("❌ Error fetching counsellors:", error);
    }
  };

  const filtered = counsellors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/${id}`);
      fetchCounsellors();
    } catch (error) {
      console.error("❌ Delete failed:", error);
    }
  };

  const handleSave = async (updated) => {
    try {
      await axios.put(
        `http://localhost:5000/api/faculty/${updated.id}`,
        updated
      );
      fetchCounsellors();
      setSelectedCounsellor(null);
    } catch (error) {
      console.error("❌ Update failed:", error);
    }
  };

  const handleAdd = async (newCounsellor) => {
    try {
      await axios.post("http://localhost:5000/api/faculty/add", {
        faculty_name: newCounsellor.name,
        faculty_branch: newCounsellor.branch,
        mail: newCounsellor.email,
        password: newCounsellor.password,
        role: "Counsellor",
      });

      fetchCounsellors();
      setIsAddOpen(false);
    } catch (err) {
      console.error(
        "❌ Add counsellor error:",
        err.response?.data || err.message
      );
    }
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
          <option value="counsellor">Counsellor</option>
          <option value="student">Student</option>
        </select>

        <input
          type="text"
          placeholder="Search by Counsellor Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="edit-btn" onClick={() => setIsAddOpen(true)}>
          ADD
        </button>
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
                  <th>NO. OF STUDENTS</th>
                  <th>E-MAIL-ID</th>
                  <th>CONTROL</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
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

      {isAddOpen && (
        <CAdd
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default CEdit;