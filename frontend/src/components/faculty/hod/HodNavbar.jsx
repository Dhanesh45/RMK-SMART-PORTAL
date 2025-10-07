import React from 'react'
import logo from "../../../assets/logo.jpg" // Assuming you have a logo image named logo.png in the same directory

const HodNavbar = () => {
  return (
    <div className='w-[100vw] h-[10vh] flex items-center justify-center bg-[#eeeeee]'>
      <nav className='h-[6.5vh] w-[96vw] bg-[#1E2E4F] text-white flex justify-between items-center rounded-[3.5vh] px-[1vw]'>
        <div className='flex items-center gap-[2vh]'>
          <img src={logo} alt="RMK Logo" className='w-[3vh] h-[3vh] rounded-full' />
          <h1 className='text-[2.5vh] font-semibold'>RMK SMART PORTAL</h1>
        </div>

        <div className='flex items-center gap-[3vw]'>
          <a href="#" className='text-[2vh] font-bold hover:text-gray-300'>HOME</a>
          <a href="#" className='text-[2vh] font-bold hover:text-gray-300'>OUTPASS LIST</a>
          <a href="#" className='text-[2vh] font-bold hover:text-gray-300'>ON DUTY LIST</a>
          <a href="#" className='text-[2vh] font-bold hover:text-gray-300'>APPLICATION LIST</a>
          <a href="#" className='text-[2vh] font-bold hover:text-gray-300'>EDIT</a>
          <a href="#" className='text-[2vh] font-bold hover:text-gray-300'>HISTORY</a>
          <button className='bg-[#D9E1F1] text-[#1E2E4F] font-bold text-[2vh] px-[1.7vw] py-[0.7vh] rounded-[2.3vh] hover:bg-[#7be0cb] transition-colors duration-300'>
            LOGOUT
          </button>
        </div>
      </nav>
    </div>
  )
}

export default HodNavbar