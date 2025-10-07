import React, { useState } from "react";
import "./YView.css";

const YView = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    branch: "",
    numStudents: "",
    email: "harish260905@gmail.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Changes saved successfully!");
    onClose();
  };

  return (
    <div className="yview-overlay">
      <div className="yview-popup">
        <h2 className="yview-title">YEAR COORDINATOR INFORMATION</h2>

        <form className="yview-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <div className="yview-row">
            <div className="yview-field">
              <label>Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
              </select>
            </div>

            <div className="yview-field">
              <label>No. Of Students</label>
              <input
                type="number"
                name="numStudents"
                value={formData.numStudents}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Email ID</label>
          <div className="yview-email">
            <input type="email" value={formData.email} readOnly />
            <span className="verified">✔ verified</span>
          </div>

          <div className="yview-buttons">
            <button type="button" className="discard-btn" onClick={onClose}>
              Discard changes
            </button>
            <button type="submit" className="save-btn">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YView;
