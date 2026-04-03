import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CEdit.css";
import CView from "./CView.jsx";
import CAdd from "./CAdd.jsx";

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
    

    const hodRes = await axios.get(
      `http://localhost:5000/api/faculty/email/${email}`
    );

    const branch = hodRes.data.branch;

   const res = await axios.get(
  `http://localhost:5000/api/faculty/by-branch-role/${branch}/counsellor`
);

console.log("API RESPONSE:", res.data);

    const formatted = res.data.map((c) => ({
      id: c.f_id,
      name: c.faculty_name || "",
      email: c.mail || "",
      branch: c.faculty_branch || "",   // ✅ VERY IMPORTANT
      password: c.password || "",       // ✅ VERY IMPORTANT
      noOfStudents: c.noOfStudents || 0,
    }));

    setCounsellors(formatted);
  } catch (err) {
    console.error("❌ Error fetching counsellors:", err);
  }
};

  const filtered = counsellors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/faculty/${id}`);
    fetchCounsellors();
  };

const handleSave = async (updatedCounsellor) => {
  try {
    await axios.put(
      `http://localhost:5000/api/faculty/${updatedCounsellor.id}`,
      {
        name: updatedCounsellor.name,
        branch: updatedCounsellor.branch,
        email: updatedCounsellor.email,
        password: updatedCounsellor.password,
      }
    );

    // ✅ update UI table immediately
    setCounsellors((prev) =>
      prev.map((c) =>
        c.id === updatedCounsellor.id ? updatedCounsellor : c
      )
    );

    setSelectedCounsellor(null);
  } catch (err) {
    console.error("❌ Error updating counsellor:", err);
  }
};
const handleAdd = async (newCounsellor) => {
  await axios.post("http://localhost:5000/api/faculty/add", {
    faculty_name: newCounsellor.name,
    faculty_branch: newCounsellor.branch,
    mail: newCounsellor.email,
    password: newCounsellor.password, // ✅ exact entered password
    role: "Counsellor",
  });

  fetchCounsellors();
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
          <option value="yearcode">Year Code</option>
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

      <div className="table">
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>NAME</th>
                <th>E-MAIL-ID</th>
                <th>CONTROL</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
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
  onClick={() => {
    console.log("SELECTED ROW:", c);
    setSelectedCounsellor(c);
  }}
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

      {selectedCounsellor && (
        <CView
  coordinator={selectedCounsellor}
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