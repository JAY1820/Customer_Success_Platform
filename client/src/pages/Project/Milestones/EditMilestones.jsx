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

function EditMilestone({ milestone, setFetch, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: milestone.title,
    startDate: milestone.startDate,
    completionDate: milestone.completionDate,
    approvalDate: milestone.approvalDate,
    status: milestone.status,
    revisedCompletionDate: milestone.revisedCompletionDate,
    comments: milestone.comments,
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

  async function updatePhase(e) {
    e.preventDefault();
    if (formData.startDate > formData.completionDate) {
      toast.error("Start date should be less or equal to completion date");
      return;
    }
    if (formData.startDate > formData.revisedCompletionDate) {
      toast.error("Start date should be less or equal to revised Completion Date");
      return;
    }
    try {
      await axios
        .put(`/projectmanager/milestone/${milestone._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Milestone edited successfully ");
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
        contentLabel="Edit Milestone Modal"
      >
        <form onSubmit={updatePhase} className="w-full">
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="title">
              Title
            </label>
            <input
              required
              type="text"
              id="title"
              name="title"
              value={formData.title}
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
            <label className="mb-1" htmlFor="completionDate">
              Completion Date
            </label>
            <input
              required
              type="date"
              id="completionDate"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="approvalDate">
              Approval Date
            </label>
            <input
              required
              type="date"
              id="approvalDate"
              name="approvalDate"
              value={formData.approvalDate}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="status">
              Status
            </label>
            <select
              required
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            >
              <option value="">Select</option>
              <option value="Delayed">Delayed</option>
              <option value="On-time">On-time</option>
              <option value="Sign-off Pending">Sign-off Pending</option>
              <option value="Sign-off">Sign-off</option>
            </select>
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="revisedCompletionDate">
              Revised Completion Date
            </label>
            <input
              required
              type="date"
              id="revisedCompletionDate"
              name="revisedCompletionDate"
              value={formData.revisedCompletionDate}
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

export default EditMilestone;
