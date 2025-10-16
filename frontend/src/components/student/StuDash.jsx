import React, { useState } from 'react'
import StuNavbar from './StuNavbar'
import Studentdash from "./Studentdash"
import Outpass from "./Outpass"
import ODform from "./ODform"
import BonafideForm from "./BonafideForm"

const StuDash = () => {
    const [activePage,setActivePage]=useState("HOME")
  return (
   <div style={{width:"100%",height:"100vh"}}>
    <StuNavbar setActivePage={setActivePage} />
    {activePage === "HOME" && <Studentdash />}
     {activePage === "OUTPASS" && <Outpass />}
      {activePage === "ON DUTY" && <ODform />}
       {activePage === "APPLICATION" && <BonafideForm />}
 
    </div>
  )
}

export default StuDash 