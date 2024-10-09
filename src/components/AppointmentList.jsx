// AppointmentList.js
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    tanggal_janji: '',
    status: '',
    id_pasien: '',
    id_dokter: '',
    patientid: '',
    doctorid: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get('http://localhost:4000/appointments')
      .then(response => {
        console.log('Fetched appointments:', response.data);
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  };

  const handleShowModal = (appointment = null) => {
    setEditingAppointment(appointment);
    if (appointment) {
      setFormData(appointment);
    } else {
      setFormData({ tanggal_janji: '', status: '', id_pasien: '', id_dokter: '', patientid: '', doctorid: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAppointment(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAppointment) {
      axios.put(`http://localhost:4000/Appointments/${editingAppointment.id}`, formData)
        .then(() => {
          fetchAppointments();
          handleCloseModal();
        })
        .catch(error => console.error('Error updating appointment:', error));
    } else {
      axios.post('http://localhost:4000/Appointments', formData)
        .then(() => {
          fetchAppointments();
          handleCloseModal();
        })
        .catch(error => console.error('Error adding appointment:', error));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      axios.delete(`http://localhost:4000/Appointments/${id}`)
        .then(() => {
          fetchAppointments();
        })
        .catch(error => console.error('Error deleting appointment:', error));
    }
  };

  useEffect(() => {
    console.log('Current appointments state:', appointments);
  }, [appointments]);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Appointment List</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => handleShowModal()}
        >
          Add Appointment
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Janji</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pasien</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Dokter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.length > 0 ? (
                appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.tanggal_janji}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.id_pasien}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.id_dokter}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.patientid}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorid}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => handleShowModal(appointment)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editingAppointment ? 'Edit Appointment' : 'Add Appointment'}
              </h3>
              <form className="mt-2 text-left" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_janji">
                    Tanggal Janji
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    name="tanggal_janji"
                    value={formData.tanggal_janji}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_pasien">
                    ID Pasien
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="id_pasien"
                    value={formData.id_pasien}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_dokter">
                    ID Dokter
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="id_dokter"
                    value={formData.id_dokter}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientid">
                    Patient ID
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="patientid"
                    value={formData.patientid}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorid">
                    Doctor ID
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="doctorid"
                    value={formData.doctorid}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {editingAppointment ? 'Update' : 'Add'}
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;