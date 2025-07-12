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
        <Route path="/leaverequests" element={<LeaveRequests />} />
        <Route path="/trainingProgram" element={<TrainingProgram />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>

    </div>
  );
}

export default Requests;
