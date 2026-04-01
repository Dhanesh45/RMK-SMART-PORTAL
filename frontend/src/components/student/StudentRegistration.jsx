  import React, { useState, useEffect } from "react";
  import loginimg from "../../assets/login.png";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  const StudentRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
      student_mail: "",
      password: "",
      regNo: "",
      year: "",
      branch: "",
      student_name: "",
      gender: "",
      accommodation: "",
      parent_name: "",
      parent_phone: "",
      native: "",
      counsellor: "",
      year_coordinator: "",
      hod: "",
      section: "",
    });
    const [counsellors, setCounsellors] = useState([]);
    const [yearCoordinators, setYearCoordinators] = useState([]);
    const [hods, setHods] = useState([]);

    const handleChange = (e) => {
      setErrors({ ...errors, [e.target.name]: "" });
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   useEffect(() => {
  if (!formData.branch) return;

  // Counsellors
  axios
    .get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/counsellor`)
    .then((res) => {
      console.log("Counsellors:", res.data); // ✅ log for debugging
      setCounsellors(res.data);
    });

  // Year Coordinators
  axios
    .get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/year_coordinator`)
    .then((res) => {
      console.log("Year Coordinators:", res.data); // ✅ log for debugging
      setYearCoordinators(res.data);
    });

  // HODs
  axios
    .get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/hod`)
    .then((res) => {
      console.log("HODs:", res.data); // ✅ log for debugging
      setHods(res.data);
    });
}, [formData.branch]);


    const validateFields = () => {
      const newErrors = {};
      const requiredFields = [
        "student_name",
        "regNo",
        "student_mail",
        "password",
        "gender",
        "accommodation",
        "parent_name",
        "parent_phone",
        "native",
        "branch",
        "year",
        "counsellor",
        "year_coordinator",
        "hod",
        "section",
      ];

      requiredFields.forEach((f) => {
        if (!formData[f]) newErrors[f] = "This field is required";
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const validateStep1 = () => {
      const newErrors = {};

      const step1Fields = [
        "student_name",
        "regNo",
        "student_mail",
        "password",
        "gender",
        "accommodation",
        "parent_name",
        "parent_phone",
        "native",
        "branch",
        "year",
      ];

      step1Fields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = "This field is required";
        }
      });

      setErrors((prev) => ({ ...prev, ...newErrors }));

      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
      if (!validateFields()) {
        alert("Please fill all required fields.");
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/student/register",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );

        alert(res.data.message);
        navigate("/StuDash", {
          state: {
            accommodation: formData.accommodation,
            regNo: formData.regNo,
          },
        });
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      }
    };

    return (
      <div style={styles.page}>
        <div style={styles.card}>
          {/* LEFT IMAGE */}
          <div style={styles.left}>
            <img src={loginimg} alt="login" style={styles.image} />
          </div>

          {/* RIGHT FORM */}
          <div style={styles.right}>
            <h2 style={styles.title}>STUDENT REGISTRATION</h2>
            <p
              style={{
                textAlign: "center",
                fontSize: "3vh",
                paddingBottom: "5%",
                fontWeight: "600",
                color: "#1E2E4F",
              }}
            >
              Complete your registration to access student services
            </p>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  NAME
                </p>
                <Input
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  error={errors.student_name}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  REGISTRATION NUMBER
                </p>
                <Input
                  name="regNo"
                  value={formData.regNo}
                  onChange={(e) =>
                    /^\d{0,12}$/.test(e.target.value) && handleChange(e)
                  }
                  error={errors.regNo}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  E-MAIL
                </p>
                <Input
                  name="student_mail"
                  value={formData.student_mail}
                  onChange={(e) => {
                    const v = e.target.value; 
                    if (
                      /^[A-Za-z0-9._%+@-]*$(@rmkec\.ac\.in)?$/.test(v) ||
                      v === ""
                    )
                      handleChange(e);
                  }}
                  error={errors.student_mail || "Must end with @rmkec.ac.in"}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  PASSWORD
                </p>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => e.target.value.length <= 8 && handleChange(e)}
                  error={errors.password}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  GENDER
                </p>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={["Male", "Female", "Other"]}
                  error={errors.gender}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  ACCOMODATION
                </p>
                <Select
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  options={["HOSTELLER", "DAYSCHOLAR"]}
                  error={errors.accommodation}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  PARENT NAME
                </p>
                <Input
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  error={errors.parent_name}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  PARENT PHONE
                </p>
                <Input
                  name="parent_phone"
                  value={formData.parent_phone}
                  onChange={(e) =>
                    /^\d{0,10}$/.test(e.target.value) && handleChange(e)
                  }
                  error={errors.parent_phone}
                />
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  NATIVE
                </p>
                <Input
                  name="native"
                  value={formData.native}
                  onChange={handleChange}
                  error={errors.native}
                />

                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  BRANCH
                </p>
                <Select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  options={["IT", "CSE", "AIDS", "ECE", "MECH", "CIVIL"]}
                  error={errors.branch}
                />

                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  YEAR
                </p>
                <Select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  options={["I", "II", "III", "IV"]}
                  error={errors.year}
                />

                <button
                  style={styles.primaryBtn}
                  onClick={() => {
                    if (validateStep1()) {
                      setStep(2);
                    } else {
                      alert("Please fill all required fields before proceeding.");
                    }
                  }}
                >
                  Next
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  COUNSELLOR
                </p>
                <Select
    name="counsellor"
    value={formData.counsellor}
    onChange={handleChange}
    options={counsellors.map(f => ({
      label: `${f.faculty_name} - ${f.mail}`,
      value: f.mail,
    }))}
    error={errors.counsellor}
  />


                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  YEAR COORDINATOR
                </p>
                <Select
    name="year_coordinator"
    value={formData.year_coordinator}
    onChange={handleChange}
    options={yearCoordinators.map(f => ({
      label: `${f.faculty_name} - ${f.mail}`,
      value: f.mail,
    }))}
    error={errors.year_coordinator}
  />

                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  HOD
                </p>
              <Select
    name="hod"
    value={formData.hod}
    onChange={handleChange}
    options={hods.map(f => ({
      label: `${f.faculty_name} - ${f.mail}`,
      value: f.mail,
    }))}
    error={errors.hod}
  />

                <p
                  style={{
                    fontSize: "2.5vh",
                    fontWeight: "600",
                    color: "rgba(30, 46, 76, 1 )",
                  }}
                >
                  SECTION
                </p>
                <Select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  options={["A", "B", "C", "D", "E", "F"]}
                  error={errors.section}
                />

                <button style={styles.secondaryBtn} onClick={() => setStep(1)}>
                  Back
                </button>
                <button style={styles.primaryBtn} onClick={handleSubmit}>
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ================= STYLES ================= */

  const styles = {
    page: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(180deg,#31487a,#8fb3e2)",
    },
    card: {
      width: "90%",
      height: "90%",
      display: "flex",
      borderRadius: "18px",
      background: "#fff",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    },
    left: {
      width: "50%",
      background: "#eef5ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "90%",
      height: "90%",
      borderRadius: "14px",
    },
    right: {
      width: "50%",
      padding: "3%",
      overflowY: "auto",
    },
    title: {
      textAlign: "center",
      fontWeight: "800",
      fontSize: "6vh",
      color: "rgba(30, 46, 76, 1 )",
      paddingBottom: "3%",
    },
    primaryBtn: {
      width: "100%",
      padding: "14px",
      background: "#31487a",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "700",
      borderRadius: "10px",
      border: "none",
      marginTop: "20px",
      cursor: "pointer",
    },
    secondaryBtn: {
      width: "100%",
      padding: "12px",
      background: "#ccc",
      fontWeight: "600",
      borderRadius: "10px",
      border: "none",
      marginTop: "10px",
      cursor: "pointer",
    },
  };

  const Input = ({ label, error, ...props }) => (
    <div style={{ marginBottom: "18px" }}>
      <label style={{ fontWeight: 600 }}>{label}</label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );

  const Select = ({ label, options, error, ...props }) => (
    <div style={{ marginBottom: "18px" }}>
      <label style={{ fontWeight: 600 }}>{label}</label>

      <select
        {...props}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      >
        <option value="">Select</option>

        {options.map((o, i) =>
          typeof o === "string" ? (
            <option key={i} value={o}>
              {o}
            </option>
          ) : (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          )
        )}
      </select>

      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );

  export default StudentRegistration;
