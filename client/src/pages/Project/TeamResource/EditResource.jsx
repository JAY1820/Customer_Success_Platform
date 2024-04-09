import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-modal';
import "react-toastify/dist/ReactToastify.css";

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

function EditResource({ resource, setFetch, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    resourceName: resource.resourceName,
    role: resource.role,
    startDate: resource.startDate,
    endDate: resource.endDate,
    comments: resource.comments,
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

  async function updateResource(e) {
    e.preventDefault();
    if (formData.startDate > formData.endDate) {
      toast.error("Start date should be less or equal to end date");
      return;
    }
    try {
      await axios
        .put(`/projectmanager/resource/${resource._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setFetch((prev) => !prev);
            closeModal();
            updateProjectData();
          }
        });
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
        contentLabel="Edit Resource Modal"
      >
        <form onSubmit={updateResource} className="w-full">
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="resourceName">
              Resource
            </label>
            <input
              required
              type="text"
              id="resourceName"
              name="resourceName"
              value={formData.resourceName}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="role">
              Role
            </label>
            <input
              required
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="startDate">
              Start Date
            </label>
            <input
              required
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="endDate">
              End Date
            </label>
            <input
              required
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="comments">
              Comments
            </label>
            <input
              required
              type="text"
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={closeModal}
              className="mx-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditResource;
