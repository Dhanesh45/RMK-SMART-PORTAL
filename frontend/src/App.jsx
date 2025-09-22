import React from 'react'
import Outpass from './components/student/Outpass'
import HodDashboard from './components/faculty/hod/hod dashboard/HodDashboard'
import OaDashboard from './components/faculty/office-assistant/oa Dashboard/OaDashboard'

const App = () => {
  return (
    // <div className='w-[10%] h-[10%] text-9xl'>App</div>
    <div>
      {/* <Outpass /> */}
      <HodDashboard />
      <OaDashboard />
    </div>
  )
}

export default App