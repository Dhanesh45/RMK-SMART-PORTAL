import React, { useEffect, useState } from "react";
import axios from "axios";
import "./YEdit.css";
import YView from "../view/YView";
import YAdd from "./YAdd";

const YEdit = ({ selectedView, setSelectedView }) => {
  const [coordinators, setCoordinators] = useState([]);
  const [searchBranch, setSearchBranch] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const email = localStorage.getItem("facultyEmail");

      const hodRes = await axios.get(
        `http://localhost:5000/api/faculty/email/${email}`
      );

      const branch = hodRes.data.branch;

      const res = await axios.get(
        `http://localhost:5000/api/faculty/by-branch-role/${branch}/year_coordinator`
      );

      const mapped = res.data.map((c) => ({
        id: c.f_id,
        name: c.faculty_name,
        branch: c.faculty_branch,
        year: "III",
        email: c.mail,
      }));

      setCoordinators(mapped);
    } catch (err) {
      console.error("❌ Error fetching coordinators:", err);
    }
  };

  const filtered = coordinators.filter((c) =>
    c.branch.toLowerCase().includes(searchBranch.toLowerCase())
  );

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/faculty/${id}`);
    fetchCoordinators();
  };

  const handleSave = async (updated) => {
    await axios.put(
      `http://localhost:5000/api/faculty/${updated.id}`,
      updated
    );
    fetchCoordinators();
  };

 const handleAdd = async (newCoordinator) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/faculty/add",
      {
        faculty_name: newCoordinator.name,
        faculty_branch: newCoordinator.branch,
        mail: newCoordinator.email,
        password: newCoordinator.password, // ✅ FIX
        role: "Year Coordinator",
      }
    );

    const added = {
      id: res.data.f_id,
      name: res.data.faculty_name,
      branch: res.data.faculty_branch,
      year: newCoordinator.year,
      email: res.data.mail,
      password: res.data.password,
    };

    setCoordinators((prev) => [...prev, added]);
  } catch (err) {
    console.error("❌ Error adding coordinator:", err);
  }
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

      <div className="table">
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>NAME</th>
                <th>BRANCH</th>
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
                      onClick={() => setSelectedCoordinator(c)}
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