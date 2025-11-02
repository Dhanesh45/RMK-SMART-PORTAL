import React, { useState } from "react";
import "../view/SView.css"; // reuse same style

const SAdd = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    year: "",
    gender: "",
    branch: "",
    counsellor: "",
    yearCoordinator: "",
    section: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      // Ensure only one gender is selected
      setFormData({
        ...formData,
        gender: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAdd = () => {
    if (!formData.name || !formData.regNo || !formData.email) {
      alert("Please fill all mandatory fields");
      return;
    }
    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="close-btn" onClick={onClose}>
          &times;
        </div>
        <div>
          <div className="modal-header">
            <h2 className="modal-title">ADD STUDENT INFORMATION</h2>
          </div>

          <div className="modal-fields-container">
            {/* Left Fields */}
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

            {/* Right Fields */}
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
                  Cancel
                </button>
                <button onClick={handleAdd} className="save-btn">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAdd;