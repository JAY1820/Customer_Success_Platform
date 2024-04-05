import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster
import "react-toastify/dist/ReactToastify.css";

const Stakeholder = ({ project, setFetch }) => {
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
    project_manager_email: "",
    auditor_email: "", 
  });

  const [projectManagers, setProjectManagers] = useState([]);
  const [clientEmails, setClientEmails] = useState([]);
  const [auditorEmails, setAuditorEmails] = useState([]); // State for storing auditor emails

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
        client_name: project.client_name,
        client_email: project.client_email,
        project_manager_email: project.project_manager_email,
      }));
    }
  }, [project]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/getusers");
        const users = response.data;

        const managers = users.filter((user) => user.role === "ProjectManager");
        const clients = users.filter((user) => user.role === "Client");
        const auditors = users.filter((user) => user.role === "Auditor"); // Filter out auditors

        setProjectManagers(managers);
        setClientEmails(clients);
        setAuditorEmails(auditors); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

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
          <label className="block mb-1" htmlFor="project_manager">
            Project Manager
          </label>
          <select
            required
            id="project_manager"
            name="project_manager"
            value={formData.project_manager}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select</option>
            {projectManagers.map((manager) => (
              <option key={manager._id} value={manager.name}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_manager_email">
            Project Manager Email
          </label>
          <select
            required
            id="project_manager_email"
            name="project_manager_email"
            value={formData.project_manager_email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select</option>
            {projectManagers.map((manager) => (
              <option key={manager._id} value={manager.email}>
                {manager.email}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="auditor_email">
            Auditor Email
          </label>
          <select
            required
            id="auditor_email"
            name="auditor_email"
            value={formData.auditor_email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select</option>
            {auditorEmails.map((auditor) => (
              <option key={auditor._id} value={auditor.email}>
                {auditor.email}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="client_name">
            Client Name
          </label>
          <input
            required
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
          <select
            required
            id="client_email"
            name="client_email"
            value={formData.client_email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select</option>
            {clientEmails.map((email) => (
              <option key={email._id} value={email.email}>
                {email.email}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
      {/* Toaster for displaying notifications */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default Stakeholder;
