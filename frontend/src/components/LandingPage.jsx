import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar.jsx is in the same directory
import bubbleTopRight from '../assets/rightbubble.png'; // Adjust path as needed
import bubbleBottomLeft from '../assets/leftbubble.png'; // Adjust path as needed
import mainVectorImage from '../assets/landing.png'; // Adjust path as needed

const LandingPage = () => {
  return (
    <div className="relative w-[100vw] h-[100vh] bg-gradient-to-br from-[#8FB3E2] to-[#D9E1F1] overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Bubble Background Images */}
      <img
        src={bubbleTopRight}
        alt="Decorative bubble"
        className="absolute top-0 right-0 w-[20vw] h-auto z-0 opacity-80" // Adjust size and opacity as needed
      />
      <img
        src={bubbleBottomLeft}
        alt="Decorative bubble"
        className="absolute bottom-0 left-0 w-[25vw] h-auto z-0 opacity-80" // Adjust size and opacity as needed
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex items-center h-[90vh] px-[5vw]"> {/* 100vh - 10vh (navbar) = 90vh */}
        {/* Left Section: Text and Button */}
        <div className="w-[50vw] flex flex-col justify-center text-white p-[3vh]">
          <h1 className="text-[7vh] font-bold leading-tight mb-[2vh]">
            RMK SMART PORTAL
          </h1>
          <p className="text-[2.2vh] leading-[3.5vh] mb-[4vh]">
            RMK Smart Portal is an integrated digital platform designed to
            streamline student services. It enables efficient management
            of outpass, on-duty, and bonafide processes with
            transparency and accuracy.
          </p>
          <button className="bg-[#1a233b] text-white text-[2.5vh] font-semibold px-[0.5vw] py-[1.5vh] rounded-[3.5vh] flex items-center justify-center w-[15vw] shadow-lg hover:bg-[#2e3a5a] transition-colors duration-300">
            GET STARTED
            <span className="ml-[1vw] text-[3vh] leading-none">&rarr;</span>
          </button>
        </div>

        {/* Right Section: Vector Image */}
        <div className="w-[50vw] flex items-center justify-center h-full">
          <img
            src={mainVectorImage}
            alt="Students illustration"
            className="max-w-[80vw] max-h-[80vh] object-contain" // Adjust size as needed, object-contain to prevent cropping
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;