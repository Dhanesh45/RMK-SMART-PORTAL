import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import SelectRole from "./components/SelectRole"
import StudentRegistration from './components/student/StudentRegistration'
import StuDash from './components/student/StuDash'
import StudentLogin from "./components/student/StudentLogin"
import OfficeStaffLogin from "./components/office-staff/OfficeStaffLogin"
import OsDash from './components/office-staff/OsDash'
import FacultyMain from "./components/faculty/FacultyMain"
import FacultyLogin from './components/faculty/FacultyLogin'
import CounsApprovalList from './components/faculty/counsellor/CounsApprovalList'
import Outpass from './components/student/Outpass'

const App = () => {
  return (
    <div>
      <BrowserRouter>

       <Routes>
         {/* landing page */}
         <Route path="/" element={<LandingPage />}/>
         {/* select role page */}
         <Route path="/SelectRole" element={<SelectRole />}/>
      {/* student login */}
         <Route path="/StudentRegistration" element={<StudentRegistration />}/>
         <Route path="/StuDash"element={<StuDash />}/>
         <Route path="/StudentLogin"element={<StudentLogin />}/>

         {/* Outpass */}
         {/* <Route path="/Outpass" element={<Outpass/>}/> */}

         {/* faculty login   */}
         <Route path="/FacultyMain"element={<FacultyMain />}/>
         <Route path="/FacultyLogin"element={<FacultyLogin />}/>
       

         {/* office staff login   */}
        <Route path="/OfficeStaffLogin"element={<OfficeStaffLogin />}/>
         <Route path="/OsDash"element={<OsDash />}/>


     </Routes>

      </BrowserRouter>
  
    </div>
  )
}

export default App