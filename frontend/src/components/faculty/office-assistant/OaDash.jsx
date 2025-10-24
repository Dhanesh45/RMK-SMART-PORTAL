import React, { useState } from 'react'
import OaDashboard from './oa Dashboard/OaDashboard'
import PrintPage from "./PrintPage"
import OaHistoryPage from "./OaHistoryPage"
import OaNavbar from './OaNavbar'

const OaDash = () => {
  const [activePage,setActivePage]=useState("HOME")
  return (
    <div style={{width:"100%",height:"100vh"}}>
    <OaNavbar setActivePage={setActivePage} />
    {activePage === "HOME" && <OaDashboard/>}
     {activePage === "PRINT" && <PrintPage />}
      {activePage === "HISTORY" && <OaHistoryPage />}
      
    </div>
  )
}

export default OaDash