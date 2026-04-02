import React, { useState } from "react";
import "../../../../yearcoordinator/yearcodedit/counselloredit/view/CView.css";

const CAdd = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (
      !formData.name ||
      !formData.branch ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-btn">
          &times;
        </button>

        <h2 className="modal-title">Add Counsellor</h2>

        <div className="modal-form">
          <div className="form-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Department</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button className="discard-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAdd;