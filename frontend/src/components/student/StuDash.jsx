import React, { useState} from "react";
import { useLocation } from "react-router-dom";
import StuNavbar from "./StuNavbar";
import Studentdash from "./Studentdash";
import Outpass from "./Outpass";
import DayScholarsOutPass from "./DayScholarsOutPass"; 
import ODform from "./ODform";
import BonafideForm from "./BonafideForm";
import DayscholarOD from "./DayscholarOD";

const StuDash = () => {
  const [activePage, setActivePage] = useState("HOME");
  
  const location = useLocation();
  const regNo = location.state?.regNo || "";
  const rawAccommodation = location.state?.accommodation || "";
  const accommodation = rawAccommodation.toLowerCase();
 
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <StuNavbar setActivePage={setActivePage} />
      {activePage === "HOME" && <Studentdash />}
      {activePage === "OUTPASS" &&
        accommodation === "dayscholar" &&
          <DayScholarsOutPass regNo={regNo}/>
        }
        {activePage === "OUTPASS" &&
        accommodation === "hosteller"  &&
          <Outpass regNo={regNo}/>
        }
      {activePage === "ON DUTY" && accommodation === "hosteller"  && <ODform regNo={regNo} />}
      {activePage === "ON DUTY" && accommodation === "dayscholar"  && <DayscholarOD regNo={regNo} />}
      {activePage === "APPLICATION" && <BonafideForm />}
    </div>
  );
};

export default StuDash;
