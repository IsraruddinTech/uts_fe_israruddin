 // DepartmentList.jsx
 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 
 const DepartmentList = () => {
   const [departments, setDepartments] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [editingDepartment, setEditingDepartment] = useState(null);
   const [formData, setFormData] = useState({
     id_departemen: '',
     nama_departemen: '',
     deskripsi_departemen: '',
   });
 
   useEffect(() => {
     fetchDepartments();
   }, []);
 
   const fetchDepartments = () => {
     axios.get('http://localhost:4000/departments')
       .then(response => {
         console.log('Fetched departments:', response.data);
         setDepartments(response.data);
       })
       .catch(error => {
         console.error('Error fetching departments:', error);
       });
   };
 
   const handleShowModal = (department = null) => {
     setEditingDepartment(department);
     if (department) {
       setFormData({ id_departemen: department.id_departemen, nama_departemen: department.nama_departemen, deskripsi_departemen: department.deskripsi_departemen });
     } else {
       setFormData({ id_departemen: '', nama_departemen: '', deskripsi_departemen: '' });
     }
     setShowModal(true);
   };
 
   const handleCloseModal = () => {
     setShowModal(false);
     setEditingDepartment(null);
   };
 
   const handleInputChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
     if (editingDepartment) {
       axios.put(`http://localhost:4000/updateDepartment/${editingDepartment.id}`, formData)
         .then(() => {
           fetchDepartments();
           handleCloseModal();
         })
         .catch(error => console.error('Error updating department:', error));
     } else {
       axios.post('http://localhost:4000/createDepartment', formData)
         .then(() => {
           fetchDepartments();
           handleCloseModal();
         })
         .catch(error => console.error('Error adding department:', error));
     }
   };
 
   const handleDelete = (id) => {
     if (window.confirm('Are you sure you want to delete this department?')) {
       axios.delete(`http://localhost:4000/deleteDepartment/${id}`)
         .then(() => {
           fetchDepartments();
         })
         .catch(error => console.error('Error deleting department:', error));
     }
   };
 
   return (
     <div className="container mx-auto px-4">
       <div className="mt-8">
         <h1 className="text-3xl font-bold mb-4">Department List</h1>
         <button
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
           onClick={() => handleShowModal()}
         >
           Add Department
         </button>
         <div className="overflow-x-auto">
           <table className="min-w-full bg-white">
             <thead className="bg-gray-100">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Departemen</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Departemen</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi Departemen</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200">
               {departments.map(department => (
                 <tr key={department.id}>
                   <td className="px-6 py-4 whitespace-nowrap">{department.id_departemen}</td>
                   <td className="px-6 py-4 whitespace-nowrap">{department.nama_departemen}</td>
                   <td className="px-6 py-4 whitespace-nowrap">{department.deskripsi_departemen}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <button
                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                       onClick={() => handleShowModal(department)}
                     >
                       Edit
                     </button>
                     <button
                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                       onClick={() => handleDelete(department.id)}
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
                 {editingDepartment ? 'Edit Department' : 'Add Department'}
               </h3>
               <form className="mt-2 text-left" onSubmit={handleSubmit}>
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
                 <div className="mb-4">
                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_departemen">
                     Nama Departemen
                   </label>
                   <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     type="text"
                     name="nama_departemen"
                     value={formData.nama_departemen}
                     onChange={handleInputChange}
                     required
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi_departemen">
                     Deskripsi Departemen
                   </label>
                   <textarea
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     name="deskripsi_departemen"
                     value={formData.deskripsi_departemen}
                     onChange={handleInputChange}
                     required
                   />
                 </div>
                 <div className="flex items-center justify-between">
                   <button
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="submit"
                   >
                     {editingDepartment ? 'Update' : 'Add'}
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
 
 export default DepartmentList;