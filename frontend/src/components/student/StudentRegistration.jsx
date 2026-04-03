// StudentRegistration.jsx
import React, { useState, useEffect } from "react";
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

    axios.get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/counsellor`)
      .then(res => setCounsellors(res.data));

    axios.get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/year_coordinator`)
      .then(res => setYearCoordinators(res.data));

    axios.get(`http://localhost:5000/api/faculty/by-branch-role/${formData.branch}/hod`)
      .then(res => setHods(res.data));

  }, [formData.branch]);

  const validateStep1 = () => {
    const newErrors = {};
    const fields = [
      "student_name","regNo","student_mail","password",
      "gender","accommodation","parent_name","parent_phone",
      "native","branch","year"
    ];
    fields.forEach(f => { if (!formData[f]) newErrors[f] = "Required"; });
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach(f => {
      if (!formData[f]) newErrors[f] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return alert("Fill all fields");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/register",
        formData
      );

      alert(res.data.message);
      navigate("/StuDash", {
        state: { accommodation: formData.accommodation, regNo: formData.regNo }
      });

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      
      {/* MAIN CARD */}
      <div style={styles.card}>

        {/* LEFT PANEL */}
        <div style={styles.left}>
          <div style={styles.glow}/>
          <h2 style={styles.logo}>RMK SMART PORTAL</h2>
        </div>

        {/* RIGHT FORM */}
        <div style={styles.right}>

          <h1 style={styles.title}>STUDENT REGISTRATION</h1>

          {step === 1 && (
            <>
              <Input name="student_name" label="NAME" value={formData.student_name} onChange={handleChange} error={errors.student_name}/>
              <Input name="regNo" label="REG NO" value={formData.regNo} onChange={handleChange} error={errors.regNo}/>
              <Input name="student_mail" label="EMAIL" value={formData.student_mail} onChange={handleChange} error={errors.student_mail}/>
              <Input type="password" name="password" label="PASSWORD" value={formData.password} onChange={handleChange} error={errors.password}/>
              
              <Select name="gender" label="GENDER" value={formData.gender} onChange={handleChange} options={["Male","Female","Other"]}/>
              <Select name="accommodation" label="ACCOMMODATION" value={formData.accommodation} onChange={handleChange} options={["HOSTELLER","DAYSCHOLAR"]}/>
              
              <Input name="parent_name" label="PARENT NAME" value={formData.parent_name} onChange={handleChange}/>
              <Input name="parent_phone" label="PARENT PHONE" value={formData.parent_phone} onChange={handleChange}/>
              <Input name="native" label="NATIVE" value={formData.native} onChange={handleChange}/>
              
              <Select name="branch" label="BRANCH" value={formData.branch} onChange={handleChange} options={["IT","CSE","AIDS","ECE","MECH","CIVIL"]}/>
              <Select name="year" label="YEAR" value={formData.year} onChange={handleChange} options={["I","II","III","IV"]}/>

              <button style={styles.primaryBtn} onClick={() => validateStep1() && setStep(2)}>
                NEXT
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <SelectDynamic name="counsellor" label="COUNSELLOR" list={counsellors} value={formData.counsellor} onChange={handleChange}/>
              <SelectDynamic name="year_coordinator" label="YEAR COORDINATOR" list={yearCoordinators} value={formData.year_coordinator} onChange={handleChange}/>
              <SelectDynamic name="hod" label="HOD" list={hods} value={formData.hod} onChange={handleChange}/>
              <Select name="section" label="SECTION" value={formData.section} onChange={handleChange} options={["A","B","C","D","E","F"]}/>

              <button style={styles.secondaryBtn} onClick={()=>setStep(1)}>BACK</button>
              <button style={styles.primaryBtn} onClick={handleSubmit}>SUBMIT</button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

/* ---------- STYLES ---------- */
const styles = {
  page:{
    display:"flex",justifyContent:"center",alignItems:"center",
    minHeight:"100vh",
    background:"linear-gradient(135deg,#1a3a4f,#1e4d5a,#1a5a5a)"
  },
  card:{
    width:"85vw",height:"88vh",display:"flex",
    borderRadius:"3vh",overflow:"hidden",
    background:"rgba(255,255,255,0.97)",
    boxShadow:"0 25px 60px rgba(0,0,0,0.25)"
  },
  left:{
    width:"55%",background:"linear-gradient(160deg,#1a3a4f,#1a5a5a)",
    display:"flex",justifyContent:"center",alignItems:"center",position:"relative"
  },
  glow:{
    position:"absolute",width:"250px",height:"250px",borderRadius:"50%",
    background:"radial-gradient(circle,rgba(123,224,203,0.3),transparent)"
  },
  logo:{color:"#7be0cb",fontWeight:"700",letterSpacing:"0.1em"},
  right:{width:"60%",padding:"4vh 3vw",overflowY:"auto"},
  title:{textAlign:"center",fontSize:"4vh",fontWeight:"800",color:"#1a3a4f"},
  primaryBtn:{
    width:"100%",padding:"12px",marginTop:"15px",
    background:"#1a3a4f",color:"#fff",border:"none",
    borderRadius:"3vh",cursor:"pointer"
  },
  secondaryBtn:{
    width:"100%",padding:"12px",marginTop:"10px",
    background:"#ccc",border:"none",borderRadius:"3vh"
  }
};

/* ---------- INPUT ---------- */
const Input = ({ label, error, ...props }) => (
  <div style={{marginBottom:"18px"}}>
    <label style={{fontSize:"12px",color:"#6b8fa8",fontWeight:"600"}}>
      {label}
    </label>
    <input {...props} style={{
      width:"100%",padding:"12px 14px",marginTop:"6px",
      borderRadius:"10px",border:"1.5px solid #e2eaf0"
    }}/>
    {error && <small style={{color:"red"}}>{error}</small>}
  </div>
);

/* ---------- SELECT ---------- */
const Select = ({ label, options, ...props }) => (
  <div style={{marginBottom:"18px"}}>
    <label style={{fontSize:"12px",color:"#6b8fa8",fontWeight:"600"}}>
      {label}
    </label>
    <select {...props} style={{
      width:"100%",padding:"12px 14px",marginTop:"6px",
      borderRadius:"10px",border:"1.5px solid #e2eaf0"
    }}>
      <option value="">Select</option>
      {options.map((o,i)=><option key={i}>{o}</option>)}
    </select>
  </div>
);

/* ---------- DYNAMIC SELECT ---------- */
const SelectDynamic = ({ label, list, ...props }) => (
  <div style={{marginBottom:"18px"}}>
    <label style={{fontSize:"12px",color:"#6b8fa8",fontWeight:"600"}}>
      {label}
    </label>
    <select {...props} style={{
      width:"100%",padding:"12px 14px",marginTop:"6px",
      borderRadius:"10px",border:"1.5px solid #e2eaf0"
    }}>
      <option value="">Select</option>
      {list.map((f,i)=>(
        <option key={i} value={f.mail}>
          {f.faculty_name} - {f.mail}
        </option>
      ))}
    </select>
  </div>
);

export default StudentRegistration;