import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StuNavbar from "./StuNavbar";
import Studentdash from "./Studentdash";
import Outpass from "./Outpass";
import DayScholarsOutPass from "./DayScholarsOutPass";
import ODform from "./ODform";
import BonafideForm from "./BonafideForm";

const StuDash = () => {
  const [activePage, setActivePage] = useState("HOME");
  const [accommodation, setAccommodation] = useState("");

   const location = useLocation();
  const regNo = location.state?.regNo || "";

  useEffect(() => {
    const storedAcc = localStorage.getItem("accommodation");
    if (storedAcc) {
      setAccommodation(storedAcc);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <StuNavbar setActivePage={setActivePage} />
      {activePage === "HOME" && <Studentdash />}
      {activePage === "OUTPASS" &&
        (accommodation === "Dayscholar" ? (
          <DayScholarsOutPass regNo={regNo}/>
        ) : (
          <Outpass regNo={regNo} />
        ))}
      {activePage === "ON DUTY" && <ODform />}
      {activePage === "APPLICATION" && <BonafideForm />}
    </div>
  );
};

export default StuDash;
