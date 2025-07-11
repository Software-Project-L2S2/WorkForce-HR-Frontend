import React from "react";
import { Route, Routes } from "react-router-dom";
import LeaveRequests from "./LeaveRequests";
import TrainingProgram from "./TrainingProgram";
import Promotion from "./Promotion";
import Transfer from "./Transfer";


function Requests() {
  return (
    <div>
      
      <Routes>
        <Route path="LeaveRequests" element={<LeaveRequests />} />
        <Route path="TrainingProgram" element={<TrainingProgram />} />
        <Route path="Promotion" element={<Promotion />} />
        <Route path="Transfer" element={<Transfer />} />
      </Routes>

    </div>
  );
}

export default Requests;
