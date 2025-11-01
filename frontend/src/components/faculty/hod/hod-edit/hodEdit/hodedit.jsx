import React, { useState } from "react";
import CEdit from "../counselloredit/edit/CEdit.jsx";
import SEdit from "../studentedit/edit/SEdit.jsx";
import YEdit from "../yearcodedit/edit/YEdit.jsx";

const HodEdit = () => {
  // Default view → Student
  const [selectedView, setSelectedView] = useState("student");

  const renderView = () => {
    switch (selectedView) {
      case "counsellor":
        return <CEdit selectedView={selectedView} setSelectedView={setSelectedView} />;
      case "yearcode":
        return <YEdit selectedView={selectedView} setSelectedView={setSelectedView} />;
      case "student":
      default:
        return <SEdit selectedView={selectedView} setSelectedView={setSelectedView} />;
    }
  };

  return <div className="hodedit-page">{renderView()}</div>;
};

export default HodEdit;
