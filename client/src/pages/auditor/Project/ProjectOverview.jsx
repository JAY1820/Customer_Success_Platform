import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

const ProjectOverview = ({ project, setFetch }) => {
  const [formData, setFormData] = useState({
    project_id: "",
    project_name: "",
    project_desc: "",
    project_scope: "",
    project_stack: "",
    project_manager: "",
    client_name: "",
    client_email: "",
    project_status: "",
    project_manager_email: "", // Added project_manager_email to formData
  });

  useEffect(() => {
    if (project) {
      setFormData((prevState) => ({
        ...prevState,
        project_id: project._id,
        project_name: project.project_name,
        project_desc: project.project_desc,
        project_scope: project.project_scope,
        project_stack: project.project_stack,
        project_status: project.project_status,
        project_manager: project.project_manager,
        project_manager_email: project.project_manager_email, // Assign project_manager_email from project
        client_name: project.client_name,
        client_email: project.client_email,
      }));
    }
  }, [project]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/auditor/edit-project", formData).then((res) => {
        if (res.status === 200) {
          toast.success("Successfully data saved!"); // Notify success
          setFetch((prev) => !prev);
        }
      });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message); // Notify error
      }
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        {/* Form Inputs */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_name">
            Project Name
          </label>
          <input
            readOnly // Set readOnly to disable editing
            type="text"
            id="project_name"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        {/* Add other form inputs */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_desc">
            Project Description
          </label>
          <textarea
            id="project_desc"
            name="project_desc"
            value={formData.project_desc}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_scope">
            Project Scope
          </label>
          <input
            required
            type="text"
            id="project_scope"
            name="project_scope"
            value={formData.project_scope}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_stack">
            Project Stack
          </label>
          <select
            readOnly // Set readOnly to disable editing
            type="text"
            id="project_stack"
            name="project_stack"
            value={formData.project_stack}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Database">Database</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_status">
            Project Status
          </label>
          <select
            id="project_status"
            name="project_status"
            value={formData.project_status}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
            <option value="On Time">On Time</option>
            <option value="On hold">On hold</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_manager">
            Project Manager
          </label>
          <input
            readOnly // Set readOnly to disable editing
            type="text"
            id="project_manager"
            name="project_manager"
            value={formData.project_manager}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        {/* Non-editable fields */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="client_name">
            Client Name
          </label>
          <input
            readOnly // Set readOnly to disable editing
            type="text"
            id="client_name"
            name="client_name"
            value={formData.client_name}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="client_email">
            Client Email
          </label>
          <input
            readOnly // Set readOnly to disable editing
            type="email"
            id="client_email"
            name="client_email"
            value={formData.client_email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_manager_email">
            Project Manager Email
          </label>
          <input
            readOnly // Set readOnly to disable editing
            type="email"
            id="project_manager_email"
            name="project_manager_email"
            value={formData.project_manager_email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ProjectOverview;
