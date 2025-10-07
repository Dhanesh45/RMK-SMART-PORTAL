import React, { useState } from "react";
import "./CView.css";

const CView = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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
        <button onClick={onClose} className="modal-close-btn">&times;</button>
        <h2 className="modal-title">Counselor Information</h2>
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
                value={formData.noOfStudents || ""}
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
            <span className="verified">✔ verified</span>
          </div>

          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={onClose}>
              Discard changes
            </button>
            <button type="button" className="save-btn" onClick={handleSave}>
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CView;
