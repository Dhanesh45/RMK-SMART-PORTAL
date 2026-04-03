import React, { useState, useEffect } from "react";
import "./YView.css";

const YView = ({ coordinator, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    branch: "",
    year: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (coordinator) {
      setFormData({
        id: coordinator.id,
        name: coordinator.name || "",
        branch: coordinator.branch || "",
        year: coordinator.year || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="yview-overlay">
      <div className="yview-popup">
        <h2 className="yview-title">YEAR COORDINATOR INFORMATION</h2>

        <form className="yview-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>

            <div className="yview-field">
              <label>Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>
          </div>

          <label>Email ID</label>
          <div className="yview-email">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="Disabled"
            value={formData.password}
            onChange={handleChange}
            disabled={!!coordinator} // Disable password field when editing
          />

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