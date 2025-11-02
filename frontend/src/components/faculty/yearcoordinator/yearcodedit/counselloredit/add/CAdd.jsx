import React, { useState } from "react";
import "../view/CView.css"; // ✅ reuse same styling as CView for exact look

const CAdd = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    noOfStudents: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (!formData.name || !formData.branch || !formData.email) {
      alert("Please fill all required fields!");
      return;
    }
    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-btn">&times;</button>
        <h2 className="modal-title">Add New Counselor</h2>
        <form className="modal-form">
          <div className="form-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Department</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="form-field">
              <label>No. of Students</label>
              <input
                type="number"
                name="noOfStudents"
                value={formData.noOfStudents}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="save-btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CAdd;