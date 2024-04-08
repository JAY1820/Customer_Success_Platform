import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditResource from "./EditResource";
import { Loader } from "monday-ui-react-core";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Resource = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    resourceName: "",
    role: "",
    startDate: "",
    endDate: "",
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
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.startDate > formData.endDate) {
      toast.error("Start date should be less or equal to completion date");
      return;
    }
    try {
      const response = await axios.post(
        `/projectmanager/resource/${project._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Resource Created successfully ");
        setFetch((prev) => !prev);
        setFormData({
          resourceName: "",
          role: "",
          startDate: "",
          endDate: "",
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

  async function handleDelete(resource_id) {
    const confirmDelete = window.confirm("Do you want to delete? ");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/projectmanager/resource/${project._id}/${resource_id}`
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
        Add Resource
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Resource Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
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
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow-lg p-7 flex flex-col gap-3"
        >
          <label htmlFor="resourceName">Resource Name</label>
          <input
            required
            type="text"
            id="resourceName"
            name="resourceName"
            value={formData.resourceName}
            onChange={handleChange}
            className="border rounded-md py-2 px-3"
          />

          <label htmlFor="role">Role</label>
          <input
            required
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded-md py-2 px-3"
          />

          <label htmlFor="startDate">Start Date</label>
          <input
            required
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border rounded-md py-2 px-3"
          />

          <label htmlFor="endDate">End Date</label>
          <input
            required
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border rounded-md py-2 px-3"
          />

          <label htmlFor="comments">Comments</label>
          <input
            required
            type="text"
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="border rounded-md py-2 px-3"
          />

          <div className="flex justify-between">
            <button
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
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

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Resource Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
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
          {project?.project_resources?.length > 0 &&
            project?.project_resources?.map((resource) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={resource._id}
              >
                <td className="px-6 py-4">{resource.resourceName}</td>
                <td className="px-6 py-4">{resource.role}</td>
                <td className="px-6 py-4">{formatDate(resource.startDate)}</td>
                <td className="px-6 py-4">{formatDate(resource.endDate)}</td>
                <td className="px-6 py-4">{resource.comments}</td>
                <td className="px-6 py-4 text-right flex gap-2">
                  <EditResource
                    resource={resource}
                    setFetch={setFetch}
                    updateProjectData={updateProjectData}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(resource._id)}
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

export default Resource;
