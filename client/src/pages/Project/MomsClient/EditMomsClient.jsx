import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import Modal from "react-modal";

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

function EditMomsClient({ mom, setFetch , updateProjectData}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: mom.date,
    duration: mom.duration,
    link: mom.link,
    comments: mom.comments,
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

  async function updateMom(e) {
    e.preventDefault();
    try {
      await axios.put(`/projectmanager/moms/${mom._id}`, formData).then((res) => {
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
        contentLabel="Edit Moms Client Modal"
      >
        <form
          onSubmit={updateMom}
          className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
        >
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="date">
              Date
            </label>
            <input
              required
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="duration">
              Duration
            </label>
            <input
              required
              type="text"
              min={0}
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>

          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="link">
              MoM Link
            </label>
            <input
              required
              type="text"
              min={0}
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
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
              className="w-full border rounded-md py-2 px-3"
            />
          </div>

          <div>
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

export default EditMomsClient;
