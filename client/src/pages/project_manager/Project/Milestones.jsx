import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditMilestone from "./EditMilestones";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Milestones = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    completionDate: "",
    approvalDate: "",
    status: "",
    revisedCompletionDate: "",
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
    if (formData.startDate > formData.completionDate) {
      toast.error("Start date should be less or equal to completion date");
      return;
    }
    try {
      const response = await axios.post(
        `/projectmanager/milestone/${project._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Milestone Created successfully ");
        setFetch((prev) => !prev);
        setFormData({
          title: "",
          startDate: "",
          completionDate: "",
          approvalDate: "",
          status: "",
          revisedCompletionDate: "",
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

  async function handleDelete(milestone_id) {
    const confirmDelete = window.confirm("Do you want to delete? ");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/projectmanager/milestone/${project._id}/${milestone_id}`
        );
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
        Add Milestone
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Milestone Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%", // Changed from '40%' to '50%'
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
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-2" // Increased gap
        >
          <div className="w-full">
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
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          {/* Similar adjustments for other input fields */}

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
              className="w-full border rounded-md py-2 px-3"
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

      {/* Remaining table code */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              Completion Date
            </th>
            <th scope="col" className="px-6 py-3">
              Approval Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Revised Completion Date
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
          {project?.project_milestone?.length > 0 &&
            project?.project_milestone?.map((milestone) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={milestone._id}
              >
                <th className="px-6 py-4">{milestone.title}</th>
                <th className="px-6 py-4">{formatDate(milestone.startDate)}</th>
                <th className="px-6 py-4">
                  {formatDate(milestone.completionDate)}
                </th>
                <th className="px-6 py-4">
                  {formatDate(milestone.approvalDate)}
                </th>
                <th className="px-6 py-4">{milestone.status}</th>
                <th className="px-6 py-4">
                  {formatDate(milestone.revisedCompletionDate)}
                </th>
                <th className="px-6 py-4">{milestone.comments}</th>
                <td className="px-6 py-4 text-right flex gap-2">
                  <EditMilestone
                    setFetch={setFetch}
                    updateProjectData={updateProjectData}
                    project={project}
                    milestone={milestone}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(milestone._id)}
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

export default Milestones;
