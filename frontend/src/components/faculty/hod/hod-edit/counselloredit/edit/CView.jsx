import React, { useState, useEffect } from "react";
import "../../../../yearcoordinator/yearcodedit/counselloredit/view/CView.css";

const CView = ({ coordinator, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    branch: "",
    email: "",
    password: "",
  });

  useEffect(() => {
  console.log("POPUP RECEIVED:", coordinator);

  if (coordinator) {
    setFormData({
      id: coordinator.id,
      name: coordinator.name || "",
      branch: coordinator.branch || "",
      email: coordinator.email || "",
      password: coordinator.password || "",
    });
  }
}, [coordinator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-btn">
          &times;
        </button>

        <h2 className="modal-title">Counsellor Information</h2>

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
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!!coordinator} // Disable password field when editing
            />
          </div>

          <div className="modal-actions">
            <button className="discard-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CView;