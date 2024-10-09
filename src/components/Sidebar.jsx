// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaHospital, FaProcedures } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="bg-green-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <FaUserMd className="text-xl" />
              <span className="font-medium">Doctor</span>
            </Link>
          </li>
          <li>
            <Link to="/customers" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <FaUserInjured className="text-xl" />
              <span className="font-medium">Patient</span>
            </Link>
          </li>
          <li>
            <Link to="/orders" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <FaCalendarAlt className="text-xl" />
              <span className="font-medium">Appointment</span>
            </Link>
          </li>
          <li>
            <Link to="/menu" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <FaHospital className="text-xl" />
              <span className="font-medium">Department</span>
            </Link>
          </li>
          <li>
            <Link to="/payments" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <FaProcedures className="text-xl" />
              <span className="font-medium">Treatment</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;