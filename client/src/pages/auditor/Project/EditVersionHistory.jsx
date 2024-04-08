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

function EditVersionHistory({ versionHistory, setFetch, project, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    no: versionHistory.no,
    type: versionHistory.type,
    change: versionHistory.change,
    changeReason: versionHistory.changeReason,
    createdBy: versionHistory.createdBy,
    revisionDate: versionHistory.revisionDate,
    approvalDate: versionHistory.approvalDate,
    approvedBy: versionHistory.approvedBy,
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

  async function updateVersionHistory(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/auditor/versionHistory/${project._id}/${versionHistory._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Version history Edited successfully ");
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
        contentLabel="Edit Version History Modal"
      >
        <form onSubmit={updateVersionHistory} className="w-full">
          {/* Form fields */}
          {/* Version */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="no">
              Version
            </label>
            <input
              required
              type="number"
              min={0}
              id="no"
              name="no"
              value={formData.no}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Rest of the form fields */}
          <div className="mb-1 w-full">
            <label className=" mb-1" htmlFor="type">
              Type
            </label>
            <select
              required
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            >
              <option value="Scope">Scope</option>
              <option value="Project Stack">Project Stack</option>
              <option value="Escalation Matrix">Escalation Matrix</option>
              <option value="Phases">Phases</option>
              <option value="Detailed timeline">Detailed timeline</option>
              <option value="Approved Team">Approved Team</option>
              <option value="Resources">Resources</option>
              <option value="Stakeholders">Stakeholders</option>
              <option value="Risk Profiling">Risk Profiling</option>
              <option value="Sprint-wise detail">Sprint-wise detail</option>
            </select>
          </div>
          {/* Add the remaining form fields similarly */}
          <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="change">
                Change
              </label>
              <input
                required
                id="change"
                type="text"
                name="change"
                value={formData.change}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="changeReason">
                Change Reason
              </label>
              <input
                required
                id="changeReason"
                type="text"
                name="changeReason"
                value={formData.changeReason}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="createdBy">
                Created By
              </label>
              <input
                required
                id="createdBy"
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="revisionDate">
                Revision Date
              </label>
              <input
                required
                type="date"
                id="revisionDate"
                name="revisionDate"
                value={formData.revisionDate}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="approvalDate">
                Approval Date
              </label>
              <input
                required
                type="date"
                id="approvalDate"
                name="approvalDate"
                value={formData.approvalDate}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="approvedBy">
                Approved By
              </label>
              <input
                required
                id="approvedBy"
                type="text"
                name="approvedBy"
                value={formData.approvedBy}
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

export default EditVersionHistory;
