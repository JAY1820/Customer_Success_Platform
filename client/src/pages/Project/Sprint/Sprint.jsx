import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditSprint from "./EditSprint";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Sprint = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    sprint: "",
    startDate: "",
    endDate: "",
    status: "",
    comments: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!project) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.startDate > formData.endDate) {
      toast.error("Start date should be less or equal to completion date");
      return;
    }
    try {
      const response = await axios.post(`/projectmanager/sprint/${project._id}`, formData);
      if (response.status === 200) {
        toast.success("Sprint Created successfully ");
        setFetch((prev) => !prev);
        setFormData({
          sprint: "",
          startDate: "",
          endDate: "",
          status: "",
          comments: "",
        });
        closeModal();
        updateProjectData();
      }
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  async function handleDelete(sprint_id) {
    const confirmDelete = window.confirm("Do you want to delete? ");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/projectmanager/sprint/${project._id}/${sprint_id}`);
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        updateProjectData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <Button onClick={openModal} className="m-2">
        Add New Sprint
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Sprint Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '40%',
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-1"
        >
          <div className="mb-1 w-full">
            <label className=" mb-1" htmlFor="sprint">
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
            <label className=" mb-1" htmlFor="startDate">
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
            <label className=" mb-1" htmlFor="endDate">
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
            <label className=" mb-1" htmlFor="comments">
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

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sprint
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_sprints?.length > 0 &&
            project?.project_sprints?.map((mySprint) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={mySprint._id}
              >
                <th className="px-6 py-4  ">{mySprint.sprint}</th>
                <th className="px-6 py-4  ">
                  {formatDate(mySprint.startDate)}
                </th>
                <th className="px-6 py-4  ">{formatDate(mySprint.endDate)}</th>
                <th className="px-6 py-4  ">{mySprint.status}</th>
                <th className="px-6 py-4  ">{mySprint.comments}</th>

                <td className="px-6 py-4 text-right flex gap-2">
                  <EditSprint
                    sprint={mySprint}
                    setFetch={setFetch}
                    updateProjectData={updateProjectData}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(mySprint._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Sprint;
