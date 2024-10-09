import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:4000/doctors'),
      axios.get('http://localhost:4000/patients'),
      axios.get('http://localhost:4000/appointments'),
      axios.get('http://localhost:4000/departements'),
      axios.get('http://localhost:4000/treatments')
    ]).then(([doctorsRes, patientsRes, appointmentsRes, departmentsRes, treatmentsRes]) => {
      setDoctors(doctorsRes.data);
      setPatients(patientsRes.data);
      setAppointments(appointmentsRes.data);
      setDepartments(departmentsRes.data);
      setTreatments(treatmentsRes.data);
    }).catch(error => {
      console.error('Error fetching dashboard data:', error);
    });
  }, []);

  return (
    <div className="flex-1 p-10 bg-blue-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Dashboard Rumah Sakit</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <DashboardCard title="Dokter" count={doctors.length} bgColor="bg-blue-400" />
        <DashboardCard title="Pasien" count={patients.length} bgColor="bg-green-400" />
        <DashboardCard title="Janji Temu" count={appointments.length} bgColor="bg-yellow-400" />
        <DashboardCard title="Departemen" count={departments.length} bgColor="bg-purple-400" />
        <DashboardCard title="Perawatan" count={treatments.length} bgColor="bg-red-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity title="Janji Temu Terbaru" data={appointments.slice(0, 5)} />
        <RecentActivity title="Perawatan Terbaru" data={treatments.slice(0, 5)} />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-lg p-6 text-white`}>
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-4xl font-bold">{count}</p>
  </div>
);

const RecentActivity = ({ title, data }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-4 text-blue-800">{title}</h2>
    <ul>
      {data.map((item, index) => (
        <li key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
          <p className="text-sm text-gray-600">{new Date(item.tanggal_janji || item.tanggal_perawatan).toLocaleDateString()}</p>
          <p className="font-medium">{item.id_pasien || item.id_perawatan}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Dashboard;