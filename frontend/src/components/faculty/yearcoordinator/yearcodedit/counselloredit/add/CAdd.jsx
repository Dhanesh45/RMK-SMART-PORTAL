import React, { useState } from "react";
import "../view/CView.css";

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
      alert("Please fill all required fields");
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

        <h2 className="modal-title">Add New Counsellor</h2>

        <form className="modal-form">
          {/* ✅ 2-column layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* LEFT */}
            <div>
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
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* RIGHT */}
            <div>
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
                <label>Password</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ✅ Buttons bottom */}
          <div className="modal-actions" style={{ marginTop: "20px" }}>
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