import React, { useState } from 'react'
import CounNavbar from './CounNavbar'
import CounsellorDashboard from "./CounsellorDashboard"
import CounsApprovalList from './CounsApprovalList'
import CounsellorODApproval from "./counsODApproval/CounsellorODApproval"
import SEdit from "./counselloredit/edit/SEdit"
import CounsellorHistory from "./CounsellorHistory"

const CounDash = () => {
  const [activePage,setActivePage]=useState("HOME")
  return (
    <div style={{width:"100%",height:"100vh"}}>
    <CounNavbar setActivePage={setActivePage} />
    {activePage === "HOME" && <CounsellorDashboard />}
     {activePage === "OUTPASS" && <CounsApprovalList />}
      {activePage === "ON DUTY" && <CounsellorODApproval />}
       {activePage === "EDIT" && <SEdit />}
       {activePage === "HISTORY" && <CounsellorHistory />}
    </div>
  )
}

export default CounDash  