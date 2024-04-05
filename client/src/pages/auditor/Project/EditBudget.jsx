import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-modal';

// Set the root element for the modal to be accessible by screen readers
Modal.setAppElement('#root');

function EditBudget({ budget, setFetch, updateProjectData }) {
  // State to manage the modal open/close and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: budget.type,
    duration: budget.duration,
    budgetedHours: budget.budgetedHours,
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to update budget information
  async function updateBudget(e) {
    e.preventDefault();
    try {
      const response = await axios.put(`/auditor/edit-budget/${budget._id}`, formData);
      if (response.status === 200) {
        toast.success("Budget Edited successfully");
        setFetch((prev) => !prev);
        closeModal();
        updateProjectData(); // Update the project data in the parent component
      }
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  }

  return (
    <>
      {/* Edit icon to open the modal */}
      <div onClick={openModal} className="p-1 cursor-pointer">
        <BiEdit className="w-5 h-5" />
      </div>
      {/* Modal for editing budget */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Budget Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            padding: '20px',
            maxWidth: '400px',
            width: '90%'
          }
        }}
      >
        {/* Form inside the modal */}
        <form onSubmit={updateBudget} className="flex flex-col justify-center items-center gap-4">
          <div className="text-2xl mb-4">Edit Budget</div>

          {/* Select input for type */}
          <div className="w-full">
            <label className="block mb-1 text-left" htmlFor="type">
              Type
            </label>
            <select
              required
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            >
              <option value="">Select</option>
              <option value="Fixed Budget">Fixed Budget</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          {/* Input for duration */}
          <div className="w-full">
            <label className="block mb-1 text-left" htmlFor="duration">
              Duration
            </label>
            <input
              required
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          {/* Input for budgeted hours */}
          <div className="w-full">
            <label className="block mb-1 text-left" htmlFor="budgetedHours">
              Budgeted Hours
            </label>
            <input
              required
              type="number"
              id="budgetedHours"
              name="budgetedHours"
              value={formData.budgetedHours}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          {/* Buttons for closing modal and updating budget */}
          <div className="flex justify-center w-full">
            <button type="button" onClick={closeModal} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Close
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditBudget;
