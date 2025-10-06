import stuimg from '../assets/student.png'
import facimg from '../assets/faculty.png'
import staimg from '../assets/staff.png'

const SelectRole = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-[#31487A] to-[#8FB3E2] p-[5vh]">
      <div className="w-[90%] h-[85vh] bg-white rounded-[3vh] shadow-lg flex flex-col items-center justify-center overflow-hidden py-[5vh] px-[2.5%] sm:py-[2vh] md:py-[5vh]">
        <h1 className="text-[#1E2E4F] text-[4vh]  font-bold mb-[2vh]">
          SELECT YOUR ROLE
        </h1>
        <p className="text-[#1E2E4F] text-[2vh] sm:text-[1.5vh] md:text-[2vh] mb-[5vh] text-center">
          Choose your role to continue and personalize your experience
        </p>

        <div className="flex justify-evenly items-center  w-[100%] h-[40vh]">
          {/* Student Card */}
          <div className="w-[20%]  bg-white rounded-[2vh] border-[1vh] border-[#1E2E4F] mb-[2.5vh] sm:mb-0 flex flex-col items-center justify-between p-[2.5vh] text-center">
            <div className="h-[25vh] w-full flex justify-center items-center">
              <img src={stuimg} alt="Student" className="h-[90%]" />
            </div>
            <h2 className="text-[#1E2E4F] text-[2.5vh] font-bold">STUDENT</h2>
          </div>

          {/* Faculty Card */}
          <div className="w-[20%]  bg-white rounded-[2vh] border-[1vh] border-[#1E2E4F]  mb-[2.5vh] sm:mb-0 flex flex-col items-center justify-between p-[2.5vh] text-center">
            <div className="h-[25vh] w-full flex justify-center items-center">
              <img src={facimg} alt="Faculty" className="h-[90%]" />
            </div>
            <h2 className="text-[#1E2E4F] text-[2.5vh] font-bold">FACULTY</h2>
          </div>

          {/* Office Staff Card */}
          <div className="w-[20%]  bg-white rounded-[2vh] border-[1vh] border-[#1E2E4F]  flex flex-col items-center justify-between p-[2.5vh] text-center">
            <div className="h-[25vh] w-full flex justify-center items-center">
              <img src={staimg} alt="Office Staff" className="h-[90%]" />
            </div>
            <h2 className="text-[#1E2E4F] text-[2.5vh] font-bold">OFFICE STAFF</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;