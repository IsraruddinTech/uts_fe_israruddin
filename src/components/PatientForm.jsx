import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({
    id_pembayaran: '',
    tanggal_pembayaran: '',
    jumlah: '',
    metode_pembayaran: '',
    id_pasien: '',
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    axios.get('http://localhost:4000/payments')
      .then(response => {
        console.log('Fetched payments:', response.data);
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  };

  const handleShowModal = (payment = null) => {
    setEditingPayment(payment);
    if (payment) {
      setFormData(payment);
    } else {
      setFormData({ id_pembayaran: '', tanggal_pembayaran: '', jumlah: '', metode_pembayaran: '', id_pasien: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPayment(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPayment) {
      axios.put(`http://localhost:4000/payments/${editingPayment.id}`, formData)
        .then(() => {
          fetchPayments();
          handleCloseModal();
        })
        .catch(error => console.error('Error updating payment:', error));
    } else {
      axios.post('http://localhost:4000/payments', formData)
        .then(() => {
          fetchPayments();
          handleCloseModal();
        })
        .catch(error => console.error('Error adding payment:', error));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pembayaran ini?')) {
      axios.delete(`http://localhost:4000/payments/${id}`)
        .then(() => {
          fetchPayments();
        })
        .catch(error => console.error('Error deleting payment:', error));
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Daftar Pembayaran</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => handleShowModal()}
        >
          Tambah Pembayaran
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pembayaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pembayaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metode Pembayaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pasien</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.id_pembayaran}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.tanggal_pembayaran}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.jumlah}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.metode_pembayaran}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.id_pasien}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleShowModal(payment)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(payment.id)}
                    >
                      Hapus
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
                {editingPayment ? 'Edit Pembayaran' : 'Tambah Pembayaran'}
              </h3>
              <form className="mt-2 text-left" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_pembayaran">
                    ID Pembayaran
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="id_pembayaran"
                    value={formData.id_pembayaran}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_pembayaran">
                    Tanggal Pembayaran
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    name="tanggal_pembayaran"
                    value={formData.tanggal_pembayaran}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jumlah">
                    Jumlah
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metode_pembayaran">
                    Metode Pembayaran
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="metode_pembayaran"
                    value={formData.metode_pembayaran}
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
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {editingPayment ? 'Update' : 'Tambah'}
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Batal
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

export default PaymentForm;