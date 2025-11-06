import React, { useEffect, useState } from "react";
import axios from "axios";

const BonafideForm = () => {
  const [student, setStudent] = useState({});
  const [formData, setFormData] = useState({
    reason: "",
    year: "",
    fatherName: "",
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

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Replace with actual logged-in student ID
  const studentId = 1;

  // 🔹 Fetch student details when page loads
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/student/${studentId}`)
      .then((res) => {
        const data = res.data;
        setStudent(data);

        // 🔹 Auto-fill known student details into the form
        setFormData((prev) => ({
          ...prev,
          year: data.year || "",
          fatherName: data.father_name || "",
          category: data.category || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          boardingPlace: data.boarding_place || "",
        }));

        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching student:", err);
        setLoading(false);
      });
  }, [studentId]);

  // 🔹 Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.reason || !formData.bonafideType) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { studentId, ...formData };
      const res = await axios.post("http://localhost:8080/api/applicationform", payload);
      alert("✅ Application submitted successfully!");
      console.log("Response:", res.data);

      // Reset form
      setFormData({
        reason: "",
        year: "",
        fatherName: "",
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
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("Error submitting form. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "5%" }}>
        <h2>Loading student details...</h2>
      </div>
    );
  }

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

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2vh 2vw",
              fontSize: "2vh",
            }}
          >
            {/* 🔹 Auto-filled student details */}
            <Field label="Name" value={student.student_name || ""} readOnly />
            <Field label="Register Number" value={student.reg_no || ""} readOnly />
            <Field label="Branch" value={student.branch || ""} readOnly />
            <Field label="Year" value={student.year || ""} readOnly />
            <Field label="Section" value={student.section || ""} readOnly />

            {/* 🔹 Input fields for user */}
            <Field
              label="Reason for Bonafide Request"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
            <Field
              label="Father’s/Guardian’s Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <Field
              label="House No"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
            />
            <Field
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
            <Field
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
            <Field
              label="Street Name"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
            <Field
              label="Enter Area"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
            <Field
              label="Enter City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <Field
              label="Enter State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <Field
              label="Enter Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
            <Field
              label="Select Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <Field
              label="If Dayscholar, Boarding Place"
              name="boardingPlace"
              value={formData.boardingPlace}
              onChange={handleChange}
            />
            <Field
              label="Select the Type of Bonafide"
              name="bonafideType"
              value={formData.bonafideType}
              onChange={handleChange}
            />
          </div>

          {/* 🔹 Submit Button */}
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
              type="submit"
              disabled={submitting}
              style={{
                backgroundColor: submitting ? "#999" : "#1f2a44",
                color: "rgba(224, 231, 231, 1)",
                borderRadius: "2vh",
                padding: "2% 9% 2%",
                fontSize: "2vh",
                fontWeight: "bolder",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 🔹 Reusable Field Component
const Field = ({ label, name, type = "text", value, onChange, readOnly, required }) => (
  <div style={{ display: "flex", flexDirection: "column", height: "10vh" }}>
    <label style={{ fontWeight: "600", marginBottom: "0.9vh" }}>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
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
