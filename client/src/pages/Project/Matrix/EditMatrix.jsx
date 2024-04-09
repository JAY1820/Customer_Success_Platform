import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-modal';

// Styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    padding: '20px'
  }
};

Modal.setAppElement('#root') // replace with your app's id

function EditMatrix({ matrix, setFetch, typeOfMatrix, project, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    level: matrix.level,
    name: matrix.name,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function updateRisk(e) {
    e.preventDefault();
    try {
      const response = await axios.put(`/auditor/edit-${typeOfMatrix}Matrix/${matrix._id}`, formData);
      if (response.status === 200) {
        toast.success("Matrix Edited successfully ");
        setFetch((prev) => !prev);
        closeModal();
        updateProjectData();
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
      <div
        onClick={openModal}
        className="bg-opacity-80 text-black p-1 rounded-xl cursor-pointer"
      >
        {/* Edit icon */}
        <BiEdit className="w-5 h-5" />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Matrix Modal"
      >
        <form onSubmit={updateRisk} className="w-full">
          {/* Form fields */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="level">
              Escalation Level
            </label>
            <input
              required
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-center">
            <Button onClick={closeModal} className="mx-2" color="negative">
              Close
            </Button>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditMatrix;
