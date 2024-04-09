import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

// Styles for the modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    width: "90%",
  },
};

Modal.setAppElement("#root"); 

function EditTeam({ team, setFetch, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phaseNumber: team.phaseNumber,
    numberOfResources: team.numberOfResources,
    role: team.role,
    availabilityPercentage: team.availabilityPercentage,
    duration: team.duration,
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
    try {
      await axios.put(`/projectmanager/team/${team._id}`, formData).then((res) => {
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
        contentLabel="Edit Team Modal"
      >
        <form onSubmit={updateResource} className="w-full">
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="phaseNumber">
              Phase
            </label>
            <input
              required
              type="number"
              min={0}
              id="phaseNumber"
              name="phaseNumber"
              value={formData.phaseNumber}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="numberOfResources">
              Number of Resources
            </label>
            <input
              required
              type="number"
              min={1}
              id="numberOfResources"
              name="numberOfResources"
              value={formData.numberOfResources}
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
            <label className="mb-1" htmlFor="availabilityPercentage">
              Availability %
            </label>
            <input
              required
              type="number"
              min={0}
              id="availabilityPercentage"
              name="availabilityPercentage"
              value={formData.availabilityPercentage}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="duration">
              Duration
            </label>
            <input
              required
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
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

export default EditTeam;
