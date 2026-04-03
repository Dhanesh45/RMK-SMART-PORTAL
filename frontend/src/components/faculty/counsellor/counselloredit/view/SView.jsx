import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./SView.css";

const SView = ({ student, onClose, onSave }) => {
  const [counsellors, setCounsellors] = useState([]);
const [yearCoordinators, setYearCoordinators] = useState([]);
const [hods, setHods] = useState([]);
  const [formData, setFormData] = useState({
  name: student?.name || "",
  regNo: student?.regNo || "",
  email: student?.email || "",
  year: student?.year || "",
  gender: student?.gender || "",
  branch: student?.branch || "",
  counsellor: student?.counsellor || "",
  yearCoordinator: student?.yearCoordinator || "",
  hod: student?.hod || "",
  section: student?.section || "",
  password: "",
  accommodation: student?.accommodation || "",
  parentName: student?.parentName || "",
  parentPhone: student?.parentPhone || "",
  native: student?.native || "",
});

useEffect(() => {
  if (!formData.branch) return;

  axios
    .get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/counsellor`)
    .then((res) => setCounsellors(res.data));

  axios
    .get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/year_coordinator`)
    .then((res) => setYearCoordinators(res.data));

  axios
    .get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/hod`)
    .then((res) => setHods(res.data));

}, [formData.branch]);

useEffect(() => {
  if (student) {
    setFormData({
      ...student,
      password: "", // keep empty
    });
  }
}, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for checkboxes if needed, but for gender, it's a single value
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  console.log("formData:", formData);
  console.log("student:", student);

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
          <h2 className="modal-title">EDIT STUDENT DETAILS</h2>
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
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>

            {/* Changed to checkbox as per request */}
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
              <select name="branch" value={formData.branch} onChange={handleChange}>
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

            <div className="form-field">
<label>Password</label>
<input
  type="password"
  name="password"
  value={formData.password || ""}
  onChange={handleChange}
  placeholder="password"
  readOnly
/>
<small style={{ color: "gray" }}>
  Leave blank student will change the password
</small>
</div>

<div className="form-field">
<label>Accommodation</label>
<select
  name="accommodation"
  value={(formData.accommodation || "").trim().toUpperCase()}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="HOSTELLER">Hosteller</option>
  <option value="DAYSCHOLAR">Dayscholar</option>
</select>
</div>

<div className="form-field">
  <label>Native</label>
  <input
    type="text"
    name="native"
    value={formData.native}
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
 value={Number(formData.counsellor)}
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
 value={Number(formData.yearCoordinator)}
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
              <label>Section</label>
             <select name="section" value={formData.section} onChange={handleChange}>
  <option value="">Select Section</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
  <option value="D">D</option>
  <option value="E">E</option>
  <option value="F">F</option>
</select>
            </div>

            <div className="form-field">
  <label>Parent Name</label>
  <input
    type="text"
    name="parentName"
    value={formData.parentName}
    onChange={handleChange}
  />
</div>

<div className="form-field">
  <label>Parent Phone</label>
  <input
    type="text"
    name="parentPhone"
    value={formData.parentPhone}
    onChange={handleChange}
  />
</div>

<div className="form-field">
  <label>HOD</label>
  <select
  name="hod"
 value={Number(formData.hod)}
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
        {/* Actions (buttons) are now directly inside the modal, after the fields container */}
      </div>
    </div>
  );
};

export default SView;
