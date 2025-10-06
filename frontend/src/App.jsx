import React from 'react'
import Navbar from './components/Navbar'
import CounNavbar from './components/faculty/counsellor/CounNavbar'
import YearNavbar from './components/faculty/yearcoordinator/YearNavbar'
import OaNavbar from './components/faculty/office-assistant/OaNavbar'

const App = () => {
  return (
    <div>
        <CounNavbar />
        <YearNavbar />
        <OaNavbar />
    </div>
  )
}

export default App