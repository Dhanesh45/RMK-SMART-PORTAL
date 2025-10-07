import React, { useState } from "react";
import CEdit from "../counselloredit/edit/CEdit.jsx";
import SEdit from "../studentedit/edit/SEdit.jsx";
import YEdit from "../yearcodedit/edit/YEdit.jsx";


const HodEdit = () => {
  // Default page is "yearcode" (YEdit.jsx)
  const [selectedView, setSelectedView] = useState("student");

  // Function to choose which component to show
  const renderView = () => {
    switch (selectedView) {
      case "counsellor":
        return <CEdit selectedView={selectedView} setSelectedView={setSelectedView} />;
      case "student":
        return <SEdit selectedView={selectedView} setSelectedView={setSelectedView} />;
      case "yearcode":
      default:
        return <YEdit selectedView={selectedView} setSelectedView={setSelectedView} />;
    }
  };

  return (
    <div className="hodedit-page">
      {renderView()}
    </div>
  );
};

export default HodEdit;
