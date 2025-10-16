import React, { useState } from 'react'
import HodDashboard from './hod dashboard/HodDashboard'
import HodApprovalList from "./HodApprovalList"
import HodOdAppList from "./hodOdApproval/HodOdAppList"
import YEdit from "./hod-edit/yearcodedit/edit/YEdit"
import HodHistoryPage from "./HodHistoryPage"
import HodBonafideApproval from './HodBonafideApproval'
import HodNavbar from './HodNavbar'

const HodDash = () => {
  const [activePage,setActivePage]=useState("HOME")
  return (
    <div style={{width:"100%",height:"100vh"}}>
    <HodNavbar setActivePage={setActivePage} />
    {activePage === "HOME" && <HodDashboard />}
     {activePage === "OUTPASS LIST" && <HodApprovalList />}
      {activePage === "ON DUTY LIST" && <HodOdAppList />}
      {activePage === "APPLICATION LIST" && <HodBonafideApproval />}
       {activePage === "EDIT" && <YEdit />}
       {activePage === "HISTORY" && <HodHistoryPage />}
    </div>
  )
}

export default HodDash