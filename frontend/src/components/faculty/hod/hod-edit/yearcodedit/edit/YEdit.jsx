import React, { useState } from "react";
import "./YEdit.css";
import YView from "../view/YView";

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
    name: "AKASH",
    branch: "IT",
    year: "II",
    email: "230329.it@rmkec.ac.in",
  },
  {
    id: 3,
    name: "AKASH",
    branch: "IT",
    year: "III",
    email: "230329.it@rmkec.ac.in",
  },
];

const YEdit = ({ selectedView, setSelectedView }) => {
  const [coordinators, setCoordinators] = useState(initialCoordinators);
  const [searchBranch, setSearchBranch] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);

  const filtered = coordinators.filter((c) =>
    c.branch.toLowerCase().includes(searchBranch.toLowerCase())
  );

  const handleDelete = (id) => {
    setCoordinators(coordinators.filter((c) => c.id !== id));
  };

  const handleSave = (updated) => {
    setCoordinators(
      coordinators.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  return (
    <div className="cedit-page">
      <div className="nav-space"></div>

      <div className="search-container">
        <select
          onChange={(e) => setSelectedView(e.target.value)}
          className="input"
          Value={selectedView} // or "student" or "yearcode" depending on the file
        >
          <option value="student">Student</option>
          <option value="yearcode">Year Code</option>
          <option value="counsellor">Counsellor</option>
          
        </select>
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

      {selectedCoordinator && (
        <YView
          coordinator={selectedCoordinator}
          onClose={() => setSelectedCoordinator(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default YEdit;
