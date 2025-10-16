import React from 'react'
import logo from "../../../assets/logo.jpg" // Assuming you have a logo image named logo.png in the same directory
import { useNavigate } from 'react-router-dom';

const HodNavbar = ({setActivePage}) => {
  const navigate=useNavigate();
  const hodNavItems=["HOME","OUTPASS LIST","ON DUTY LIST","APPLICATION LIST","EDIT","HISTORY"];
  return (
    <div className='w-[100vw] h-[10vh] flex items-center justify-center bg-[#eeeeee]'>
      <nav className='h-[6.5vh] w-[96vw] bg-[#1E2E4F] text-white flex justify-between items-center rounded-[3.5vh] px-[1vw]'>
        <div className='flex items-center gap-[2vh]'>
          <img src={logo} alt="RMK Logo" className='w-[3vh] h-[3vh] rounded-full' />
          <h1 className='text-[2.5vh] font-semibold'>RMK SMART PORTAL</h1>
        </div>

        <div className='flex items-center gap-[3vw]'>
          {hodNavItems.map((item, index) => (
            <span
              key={index}
              onClick={() => setActivePage(item)}
              className="cursor-pointer text-[2vh] font-bold hover:text-gray-300"
            >
              {item}
            </span>
          ))}
          <button onClick={()=>navigate("/FacultyLogin")} className='bg-[#D9E1F1] text-[#1E2E4F] font-bold text-[2vh] px-[1.7vw] py-[0.7vh] rounded-[2.3vh] hover:bg-[#7be0cb] transition-colors duration-300'>
            LOGOUT
          </button>
        </div>
      </nav>
    </div>
  )
}

export default HodNavbar