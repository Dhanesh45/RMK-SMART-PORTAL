import React, { useState } from "react";
import OSNavbar from "./OSNavbar";
import OfficeStaffApproval from "./OfficeStaffApproval"
import OfficeStaffGenerate from "./OfficeStaffGenerate"
import OsHistoryPage from "./OsHistoryPage"
import OfficeStaffDashboard from "./OfficeStaffDashboard";
const OsDash = () => {
  const [activePage, setActivePage] = useState("HOME");
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <OSNavbar setActivePage={setActivePage} />
      {activePage === "HOME" && <OfficeStaffDashboard />}
      {activePage === "APPROVAL" && <OfficeStaffApproval />}
      {activePage === "GENERATE" && <OfficeStaffGenerate />}
      {activePage === "HISTORY" && <OsHistoryPage />}
    </div>
  );
};

export default OsDash;
