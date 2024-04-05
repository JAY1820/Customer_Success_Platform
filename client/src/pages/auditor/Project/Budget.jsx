import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Loader } from "monday-ui-react-core";
import EditBudget from "./EditBudget";
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

const Budget = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    budgetedHours: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/auditor/create-budget/${project._id}`,
        formData
      );
      if (response.status === 200) {
        setFetch((prev) => !prev);
        toast.success("Budget created successfully");
        setFormData({
          type: "",
          duration: "",
          budgetedHours: "",
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

  const handleDelete = async (budget_id) => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `/auditor/delete-budget/${project._id}/${budget_id}`
        );
        toast.success("Budget deleted successfully");
        setFetch((prev) => !prev); // Trigger re-fetch
        updateProjectData(); // Update the project data in the parent component
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Budget
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Budget Modal"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="type">
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
              <option value="">Select</option>
              <option value="Fixed Budget">Fixed Budget</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="duration">
              Duration
            </label>
            <input
              required
              type="number"
              id="duration"
              name="duration"
              min="0"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="budgetedHours">
              Budgeted Hours
            </label>
            <input
              required
              type="number"
              id="budgetedHours"
              name="budgetedHours"
              value={formData.budgetedHours}
              min="0"
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="flex justify-center gap-2 w-full">
            <Button onClick={closeModal}>Close</Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Budgeted Hours
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_budget?.length > 0 &&
            project.project_budget.map((budget) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={budget._id}
              >
                <td className="px-6 py-4">{budget.type}</td>
                <td className="px-6 py-4">{budget.duration}</td>
                <td className="px-6 py-4">{budget.budgetedHours}</td>
                <td className="px-6 py-4 flex gap-2">
                  <EditBudget
                    budget={budget}
                    setFetch={setFetch}
                    updateProjectData={updateProjectData}
                  />

                  <Button onClick={() => handleDelete(budget._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Budget;
