import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function EditAuditHistory({ auditHistory, setFetch, project, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dateOfAudit: auditHistory.dateOfAudit,
    reviewedBy: auditHistory.reviewedBy,
    status: auditHistory.status,
    comment: auditHistory.comment,
    actionItem: auditHistory.actionItem,
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

  async function updateAuditHistory(e) {
    e.preventDefault();
    try {
      const response = await axios.put(`/auditor/auditHistory/${project._id}/${auditHistory._id}`, formData);
      if (response.status === 200) {
        toast.success("Audit history edited successfully");
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
      <div onClick={openModal} className="bg-opacity-80 text-black p-1 rounded-xl cursor-pointer">
        {/* Edit icon */}
        <BiEdit className="w-5 h-5" />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Audit History Modal"
      >
        <form onSubmit={updateAuditHistory} className="w-full">
          {/* Form fields */}
          {/* Date of Audit */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="dateOfAudit">
              Date of Audit
            </label>
            <input
              required
              type="date"
              id="dateOfAudit"
              name="dateOfAudit"
              value={formData.dateOfAudit}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Rest of the form fields */}
          <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="reviewedBy">
                Reviewed By
              </label>
              <input
                required
                type="text"
                id="reviewedBy"
                name="reviewedBy"
                value={formData.reviewedBy}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="status">
                Status
              </label>
              <select
                required
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              >
                <option value="">Select</option>
                <option value="Delayed">Delayed</option>
                <option value="On-time">On-time</option>
                <option value="Sign-off Pending">Sign-off Pending</option>
                <option value="Sign-off">Sign-off</option>
              </select>
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="comment">
                Comment
              </label>
              <input
                required
                type="text"
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="actionItem">
                Action Item
              </label>
              <input
                required
                type="text"
                id="actionItem"
                name="actionItem"
                value={formData.actionItem}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
          {/* Buttons */}
          <div className="flex justify-center">
            <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save
            </button>
            <button onClick={closeModal} type="button" className="inline-flex justify-center ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditAuditHistory;
