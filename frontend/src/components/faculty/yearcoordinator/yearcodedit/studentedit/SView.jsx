import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../counsellor/counselloredit/view/SView.css";

const SView = ({ student, onClose, onSave }) => {
  const [counsellors, setCounsellors] = useState([]);
  const [yearCoordinators, setYearCoordinators] = useState([]);
  const [hods, setHods] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    regNo: "",
    email: "",
    year: "",
    gender: "",
    branch: "",
    counsellor: "",
    yearCoordinator: "",
    hod: "",
    section: "",
    password: "",
    accommodation: "",
    parentName: "",
    parentPhone: "",
    native: "",
  });

  // ✅ Prefill selected student data
  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id || "",
        name: student.name || "",
        regNo: student.regNo || "",
        email: student.email || "",
        year: student.year || "",
        gender: student.gender || "",
        branch: student.branch || "",
        counsellor: student.counsellor || "",
        yearCoordinator: student.yearCoordinator || "",
        hod: student.hod || "",
        section: student.section || "",
        password: "",
        accommodation: student.accommodation || "",
        parentName: student.parentName || "",
        parentPhone: student.parentPhone || "",
        native: student.native || "",
      });
    }
  }, [student]);

  // ✅ Load faculty dropdowns based on branch
  useEffect(() => {
    if (!formData.branch) return;

    axios
      .get(
        `http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/counsellor`
      )
      .then((res) => setCounsellors(res.data));

    axios
      .get(
        `http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/year_coordinator`
      )
      .then((res) => setYearCoordinators(res.data));

    axios
      .get(
        `http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/hod`
      )
      .then((res) => setHods(res.data));
  }, [formData.branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="close-btn" onClick={onClose}>
          &times;
        </div>

        <div className="modal-header">
          <h2 className="modal-title">EDIT STUDENT DETAILS</h2>
        </div>

        <div className="modal-fields-container">
          {/* LEFT */}
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
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>

            <div className="form-field">
              <label>Gender</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="form-field">
              <label>Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Select Branch</option>
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
                <option value="AIDS">AIDS</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
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
                {counsellors.map((f) => (
                  <option key={f.f_id} value={f.f_id}>
                    {f.faculty_name} - {f.mail}
                  </option>
                ))}
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
                {yearCoordinators.map((f) => (
                  <option key={f.f_id} value={f.f_id}>
                    {f.faculty_name} - {f.mail}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>HOD</label>
              <select
                name="hod"
                value={formData.hod}
                onChange={handleChange}
              >
                <option value="">Select HOD</option>
                {hods.map((f) => (
                  <option key={f.f_id} value={f.f_id}>
                    {f.faculty_name} - {f.mail}
                  </option>
                ))}
              </select>
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
    </div>
  );
};

export default SView;