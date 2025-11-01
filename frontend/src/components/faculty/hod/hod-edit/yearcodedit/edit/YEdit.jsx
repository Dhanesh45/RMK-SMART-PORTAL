import React, { useState } from "react";
import "./YEdit.css";
import YView from "../view/YView";
import YAdd from "./YAdd"; // ✅ Import Add popup

const initialCoordinators = [
  {
    id: 1,
    name: "AKASH",
    branch: "IT",
    year: "III",
    email: "230329.it@rmkec.ac.in",
  },
  {
    id: 2,
    name: "RAHUL",
    branch: "CSE",
    year: "II",
    email: "rahul@rmkec.ac.in",
  },
  {
    id: 3,
    name: "VIGNESH",
    branch: "ECE",
    year: "III",
    email: "vignesh@rmkec.ac.in",
  },
];

const YEdit = ({ selectedView, setSelectedView }) => {
  const [coordinators, setCoordinators] = useState(initialCoordinators);
  const [searchBranch, setSearchBranch] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false); // ✅ Add popup state

  const filtered = coordinators.filter((c) =>
    c.branch.toLowerCase().includes(searchBranch.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coordinator?")) {
      setCoordinators(coordinators.filter((c) => c.id !== id));
      alert("Coordinator deleted successfully!");
    }
  };

  const handleSave = (updated) => {
    setCoordinators(
      coordinators.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handleAdd = (newCoordinator) => {
    const newId = coordinators.length + 1;
    setCoordinators([...coordinators, { id: newId, ...newCoordinator }]);
  };

  return (
    <div className="yedit-page">
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


        <div className="filter-add">
          <input
            type="text"
            placeholder="Search by Branch"
            value={searchBranch}
            onChange={(e) => setSearchBranch(e.target.value)}
            className="search-input"
          />
          <button className="add-btn" onClick={() => setIsAddOpen(true)}>
            + Add
          </button>
        </div>
      </div>

      <h2 className="title">YEAR COORDINATOR DETAILS</h2>

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
                  <th>YEAR</th>
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
                    <td>{c.year}</td>
                    <td>{c.email}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(c.id)}
                      >
                        DELETE 🗑
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => setSelectedCoordinator(c)}
                      >
                        EDIT ✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ✅ Popups */}
      {selectedCoordinator && (
        <YView
          coordinator={selectedCoordinator}
          onClose={() => setSelectedCoordinator(null)}
          onSave={handleSave}
        />
      )}

      {isAddOpen && (
        <YAdd
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default YEdit;
