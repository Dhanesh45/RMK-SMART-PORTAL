import React, { useState } from "react";
import "./CEdit.css";
import CView from "../view/CView";
import CAdd from "../add/CAdd";

const initialCounsellors = [
  { id: 1, name: "John Doe", noOfStudents: 25, email: "john@example.com" },
  { id: 2, name: "Jane Smith", noOfStudents: 30, email: "jane@example.com" },
  { id: 3, name: "Emily Brown", noOfStudents: 28, email: "emily@example.com" },
];

const CEdit = ({ selectedView, setSelectedView }) => {
  const [counsellors, setCounsellors] = useState(initialCounsellors);
  const [search, setSearch] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = counsellors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setCounsellors(counsellors.filter((c) => c.id !== id));
  };

  const handleSave = (updated) => {
    setCounsellors(counsellors.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleAdd = (newCounsellor) => {
    const newId = counsellors.length + 1;
    setCounsellors([...counsellors, { id: newId, ...newCounsellor }]);
  };

  return (
    <div className="cedit-page">
      <div className="nav-space"></div>

      {/* Search and Add Section */}
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

      {/* Table Section */}
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

      {/* Popup Modals */}
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
