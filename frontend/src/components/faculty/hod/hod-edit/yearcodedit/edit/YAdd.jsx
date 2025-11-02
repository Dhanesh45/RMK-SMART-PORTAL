import React, { useState } from "react";
import "./YAdd.css";

const YAdd = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    year: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.branch || !formData.year || !formData.email) {
      alert("Please fill in all fields!");
      return;
    }
    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">ADD YEAR COORDINATOR</h2>
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleAdd}>
          <div className="modal-fields-container">
            <div className="left-fields">
              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-field">
                <label>Branch</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                >
                  <option value="">Select branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
              </div>
            </div>

            <div className="right-fields">
              <div className="form-field">
                <label>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select year</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>

              <div className="form-field">
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="discard-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YAdd;