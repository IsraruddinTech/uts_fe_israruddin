// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from './components/Header';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import PatientList from "./components/PatientList";
import AppointmentList from "./components/AppointmentList";
import DepartmentList from "./components/DepartmentList";
import TreatmentList from "./components/Treatment";
import AppointmentForm from "./components/AppointmentForm";
import PatientForm from "./components/PatientForm";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<PatientList />} />
            <Route path="/orders" element={<AppointmentList />} />
            <Route path="/menu" element={<DepartmentList />} />
            <Route path="/payments" element={<TreatmentList />} />
            <Route path="/orders/create" element={<AppointmentForm />} />
            <Route path="/payments/create" element={<PatientForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
