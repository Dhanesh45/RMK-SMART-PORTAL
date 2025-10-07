import React, { useState } from "react";
import CEdit from "../counselloredit/edit/CEdit.jsx";
import SEdit from "../studentedit/edit/SEdit.jsx";

const YearCoordinatorEdit = () => {
  const [selectedView, setSelectedView] = useState("counsellor");

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {selectedView === "counsellor" ? (
        <CEdit setSelectedView={setSelectedView} />
      ) : (
        <SEdit setSelectedView={setSelectedView} />
      )}
    </div>
  );
};

export default YearCoordinatorEdit;
