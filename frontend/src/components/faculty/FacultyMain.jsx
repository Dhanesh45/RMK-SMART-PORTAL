import React, { useState,useEffect} from "react";
import FacultyLogin from "./FacultyLogin";
import CounDash from "./counsellor/CounDash";
import YearDash from "./yearcoordinator/YearDash";
import HodDashboard from "./hod/hod dashboard/HodDashboard";
import OaDashboard from "./office-assistant/oa Dashboard/OaDashboard";
import HodDash from "./hod/HodDash";
import OaDash from "./office-assistant/OaDash";
const FacultyMain = () => {
  const [userRole, setUserRole] = useState(null); // store who logged in

  useEffect(() => {
    const savedRole = localStorage.getItem("facultyRole");
    if (savedRole) {
      if (savedRole === "Counsellor") setUserRole("COUNSELLOR");
      else if (savedRole === "Year Coordinator")
        setUserRole("YEAR_COORDINATOR");
      else if (savedRole === "Head of the Department") setUserRole("HOD");
      else if (savedRole === "Office Assistant") setUserRole("OA");
    }
  }, []);

  // Step 3.1: Mapping roles to components
  const roleComponents = {
    COUNSELLOR: CounDash,
    YEAR_COORDINATOR: YearDash,
    HOD: HodDash,
    OA: OaDash,
  };

  // Step 3.2: Find which component to render
  const ActivePage = roleComponents[userRole];

  return (
    <div>
      {!userRole && <FacultyLogin setUserRole={setUserRole} />}

      {userRole && ActivePage && <ActivePage />}
    </div>
  );
};

export default FacultyMain;
