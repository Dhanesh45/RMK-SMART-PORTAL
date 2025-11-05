import React, { useEffect, useState } from "react";
import axios from "axios";

const BonafideForm = () => {
  const [student, setStudent] = useState({});
  const [formData, setFormData] = useState({
    reason: "",
    year: "",
    fatherName: "",
    section: "",
    houseNo: "",
    dob: "",
    age: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    category: "",
    boardingPlace: "",
    bonafideType: "",
  });

  const studentId = 1; // 🔹 Replace with logged-in student's ID

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/student/${studentId}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.error("Error fetching student:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/application-form", {
        studentId,
        ...formData,
      });
      alert("Application submitted successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "1%",
          width: "90%",
          maxWidth: "1000px",
          backgroundColor: "#fff",
          borderRadius: "2vh",
          padding: "2vh 2vw",
          boxShadow: "0 0 1vh rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2%",
            fontSize: "3.2vh",
            fontWeight: "bolder",
            color: "rgba(30, 46, 79, 1)",
          }}
        >
          APPLICATION FORM FOR BONAFIDE CERTIFICATE
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2vh 2vw",
            fontSize: "2vh",
          }}
        >
          {/* Auto-filled fields */}
          <Field label="Name" value={student.name || ""} readOnly />
          <Field label="Register Number" value={student.registerNumber || ""} readOnly />
          <Field label="Branch" value={student.branch || ""} readOnly />
          <Field label="Year" value={student.year || ""} readOnly />

          {/* User-input fields */}
          <Field label="Reason for Bonafide Request" name="reason" onChange={handleChange} />
          <Field label="Father’s/Guardian’s Name" name="fatherName" onChange={handleChange} />
          <Field label="Section" name="section" onChange={handleChange} />
          <Field label="House No" name="houseNo" onChange={handleChange} />
          <Field label="Date of Birth" name="dob" type="date" onChange={handleChange} />
          <Field label="Age" name="age" type="number" onChange={handleChange} />
          <Field label="Street Name" name="street" onChange={handleChange} />
          <Field label="Enter Area" name="area" onChange={handleChange} />
          <Field label="Enter City" name="city" onChange={handleChange} />
          <Field label="Enter State" name="state" onChange={handleChange} />
          <Field label="Enter Pincode" name="pincode" onChange={handleChange} />
          <Field label="Select Category" name="category" onChange={handleChange} />
          <Field label="If Dayscholar, Boarding Place" name="boardingPlace" onChange={handleChange} />
          <Field label="Select the Type of Bonafide" name="bonafideType" onChange={handleChange} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "2%",
            width: "100%",
            alignItems: "end",
          }}
        >
          <button
            style={{
              backgroundColor: "#1f2a44",
              color: "rgba(224, 231, 231, 1)",
              borderRadius: "2vh",
              padding: "2% 9% 2%",
              fontSize: "2vh",
              fontWeight: "bolder",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

// Small reusable component
const Field = ({ label, name, type = "text", value, onChange, readOnly }) => (
  <div style={{ display: "flex", flexDirection: "column", height: "10vh" }}>
    <label style={{ fontWeight: "600", marginBottom: "0.9vh" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      style={{
        padding: "1vh",
        borderRadius: "1vh",
        border: "1px solid #999",
        backgroundColor: readOnly ? "#f3f3f3" : "white",
      }}
    />
  </div>
);

export default BonafideForm;
