import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EditSprint({ sprint, setFetch, updateProjectData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    sprint: sprint.sprint,
    startDate: sprint.startDate,
    endDate: sprint.endDate,
    status: sprint.status,
    comments: sprint.comments,
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

  async function updateSprint(e) {
    e.preventDefault();
    if (formData.startDate > formData.endDate) {
      toast.error("Start date should be less or equal to the completion date");
      return;
    }
    try {
      await axios.put(`/projectmanager/sprint/${sprint._id}`, formData).then((res) => {
        if (res.status === 200) {
          toast.success("Sprint Edited successfully ");
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
        <BiEdit className="w-5 h-5" />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Sprint Modal"
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
        <form onSubmit={updateSprint} className="flex flex-col justify-center items-center gap-1">
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="sprint">
              Sprint
            </label>
            <input
              required
              type="number"
              min={0}
              id="sprint"
              name="sprint"
              value={formData.sprint}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
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
              className="w-full border rounded-md py-2 px-3"
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
              className="w-full border rounded-md py-2 px-3"
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

export default EditSprint;
