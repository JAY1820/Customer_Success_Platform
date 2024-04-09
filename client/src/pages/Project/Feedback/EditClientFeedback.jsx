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

Modal.setAppElement("#root"); // replace with your app's id

function EditClientFeedback({ clientFeedback, setFetch, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: clientFeedback.type,
    dateReceived: clientFeedback.dateReceived,
    feedback: clientFeedback.feedback,
    actionTaken: clientFeedback.actionTaken,
    closureDate: clientFeedback.closureDate,
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
      await axios
        .put(`/client/${clientFeedback._id}`, formData)
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
        contentLabel="Edit Client Feedback Modal"
      >
        <form onSubmit={updateResource} className="w-full">
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="type">
              Feedback type
            </label>
            <select
              required
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            >
              <option value="">Select</option>
              <option value="Complaint">Complaint</option>
              <option value="Appreciation">Appreciation</option>
            </select>
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="feedback">
              Detailed Feedback
            </label>
            <input
              required
              type="text"
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="actionTaken">
              Action Taken
            </label>
            <input
              required
              type="text"
              id="actionTaken"
              name="actionTaken"
              value={formData.actionTaken}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="closureDate">
              Closure Date
            </label>
            <input
              type="date"
              id="closureDate"
              name="closureDate"
              value={formData.closureDate}
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

export default EditClientFeedback;
