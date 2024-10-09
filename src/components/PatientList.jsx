// PatientList.js
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    id_dokter: '',
    nama: '',
    spesialisasi: '',
    id_departemen: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios.get('http://localhost:4000/patients')
      .then(response => {
        console.log('Fetched patients:', response.data);
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  };

  const handleShowModal = (patient = null) => {
    setEditingPatient(patient);
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({ id_dokter: '', nama: '', spesialisasi: '', id_departemen: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPatient(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPatient) {
      axios.put(`http://localhost:4000/patients/${editingPatient.id}`, formData)
        .then(() => {
          fetchPatients();
          handleCloseModal();
        })
        .catch(error => console.error('Error updating patient:', error));
    } else {
      axios.post('http://localhost:4000/patients', formData)
        .then(() => {
          fetchPatients();
          handleCloseModal();
        })
        .catch(error => console.error('Error adding patient:', error));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      axios.delete(`http://localhost:4000/patients/${id}`)
        .then(() => {
          fetchPatients();
        })
        .catch(error => console.error('Error deleting patient:', error));
    }
  };

  useEffect(() => {
    console.log('Current patients state:', patients);
  }, [patients]);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Patient List</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => handleShowModal()}
        >
          Add Patient
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Dokter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spesialisasi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Departemen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.id_dokter}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.spesialisasi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.id_departemen}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleShowModal(patient)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editingPatient ? 'Edit Patient' : 'Add Patient'}
              </h3>
              <form className="mt-2 text-left" onSubmit={handleSubmit}>
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spesialisasi">
                    Spesialisasi
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="spesialisasi"
                    value={formData.spesialisasi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_departemen">
                    ID Departemen
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="id_departemen"
                    value={formData.id_departemen}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {editingPatient ? 'Update' : 'Add'}
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

export default PatientList;