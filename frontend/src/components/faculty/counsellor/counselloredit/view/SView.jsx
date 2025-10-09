import React, { useState } from "react";
import "./SView.css";

const SView = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for checkboxes if needed, but for gender, it's a single value
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      
      <div className="modal">
        <div className="close-btn" onClick={onClose}>
            &times;
          </div>
         <div>
        {/* Div 1: Student Information Title with close button */}
        <div className="modal-header">
          <div>
          <h2 className="modal-title">STUDENT INFORMATION</h2>
          </div>
          
        </div>

        {/* Div 2: Fields Container */}
        <div className="modal-fields-container">
          {/* Left Fields Div */}
          <div className="left-fields">
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
              <label>Year</label>
              <select name="year" value={formData.year} onChange={handleChange}>
                <option value="">Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* Changed to checkbox as per request */}
            <div className="form-field">
              <label>Gender</label>
              <div className="checkbox-group">
                <label>
                  Male
                  <input
                    type="checkbox"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Female
                  <input
                    type="checkbox"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="form-field">
              <label>Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              />
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
          </div>

          {/* Right Fields Div */}
          <div className="right-fields">
            <div className="form-field">
              <label>Register Number</label>
              <input
                type="text"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Counsellor</label>
              <select
                name="counsellor"
                value={formData.counsellor}
                onChange={handleChange}
              >
                <option value="">Select Counsellor</option>
                <option value="Mr. Ravi">Mr. Ravi</option>
                <option value="Ms. Devi">Ms. Devi</option>
              </select>
            </div>

            <div className="form-field">
              <label>Year Coordinator</label>
              <select
                name="yearCoordinator"
                value={formData.yearCoordinator}
                onChange={handleChange}
              >
                <option value="">Select Coordinator</option>
                <option value="Mr. Kumar">Mr. Kumar</option>
                <option value="Mrs. Priya">Mrs. Priya</option>
              </select>
            </div>

            <div className="form-field">
              <label>Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
              />
            </div>
            <div className="modal-actions">
              <button onClick={onClose} className="discard-btn">
                Discard
              </button>
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
        </div>
        {/* Actions (buttons) are now directly inside the modal, after the fields container */}
      </div>
    </div>
  );
};

export default SView;
