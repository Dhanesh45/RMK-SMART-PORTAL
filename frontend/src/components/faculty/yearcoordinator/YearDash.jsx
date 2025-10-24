import React, { useState } from 'react'
import YearCoordinatorDashboard from './YearCoordinatorDashboard'
import YearApprovalList from "./YearApprovalList"
import YearOdAppList from "./YearOdApproval/YearOdAppList"
import YearCoordinatorEdit from './yearcodedit/Year/YearCoordinatorEdit'
import YearNavbar from './YearNavbar'
import YearCoordinatorHistory from './YearCoordinatorHistory'

const YearDash = () => {
  const [activePage,setActivePage]=useState("HOME")
  return (
    <div style={{width:"100%",height:"100vh"}}>
    <YearNavbar setActivePage={setActivePage} />
    {activePage === "HOME" && <YearCoordinatorDashboard />}
     {activePage === "OUTPASS" && <YearApprovalList />}
      {activePage === "ON DUTY" && <YearOdAppList />}
       {activePage === "EDIT" && <YearCoordinatorEdit />}
       {activePage === "HISTORY" && <YearCoordinatorHistory />}
    </div>
  )
}

export default YearDash