// TreatmentList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TreatmentList = () => {
  const [treatments, setTreatments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [formData, setFormData] = useState({
    id_perawatan: '',
    tanggal_perawatan: '',
    deskripsi: '',
    id_pasien: '',
    id_dokter: '',
  });

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = () => {
    axios.get('http://localhost:4000/perawatan')
      .then(response => {
        console.log('Fetched treatments:', response.data);
        setTreatments(response.data);
      })
      .catch(error => {
        console.error('Error fetching treatments:', error);
      });
  };

  const handleShowModal = (treatment = null) => {
    setEditingTreatment(treatment);
    if (treatment) {
      setFormData(treatment);
    } else {
      setFormData({ id_perawatan: '', tanggal_perawatan: '', deskripsi: '', id_pasien: '', id_dokter: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTreatment(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTreatment) {
      axios.put(`http://localhost:4000/updatePerawatan/${editingTreatment.id}`, formData)
        .then(() => {
          fetchTreatments();
          handleCloseModal();
        })
        .catch(error => console.error('Error updating treatment:', error));
    } else {
      axios.post('http://localhost:4000/createPerawatan', formData)
        .then(() => {
          fetchTreatments();
          handleCloseModal();
        })
        .catch(error => console.error('Error adding treatment:', error));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this treatment?')) {
      axios.delete(`http://localhost:4000/deletePerawatan/${id}`)
        .then(() => {
          fetchTreatments();
        })
        .catch(error => console.error('Error deleting treatment:', error));
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Treatment List</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => handleShowModal()}
        >
          Add Treatment
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {treatments.map(treatment => (
                <tr key={treatment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{treatment.id_perawatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{treatment.tanggal_perawatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{treatment.deskripsi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{treatment.id_pasien}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{treatment.id_dokter}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleShowModal(treatment)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(treatment.id)}
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
                {editingTreatment ? 'Edit Treatment' : 'Add Treatment'}
              </h3>
              <form className="mt-2 text-left" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_perawatan">
                    Treatment ID
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="id_perawatan"
                    value={formData.id_perawatan}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_perawatan">
                    Treatment Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    name="tanggal_perawatan"
                    value={formData.tanggal_perawatan}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_pasien">
                    Patient ID
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
                    Doctor ID
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
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {editingTreatment ? 'Update' : 'Add'}
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

export default TreatmentList;