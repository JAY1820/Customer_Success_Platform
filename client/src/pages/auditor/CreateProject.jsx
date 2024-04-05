import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "monday-ui-react-core/tokens";

// Create a new component called CreateProject
const CreateProject = ({ fetch, setFetch, isOpen }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    project_desc: "",
    project_scope: "",
    project_stack: "",
    client_name: "",
    client_email: "",
    project_manager: "",
    project_manager_email: "", 
  });

  const [projectManagers, setProjectManagers] = useState([]);
  const [clientEmails, setClientEmails] = useState([]);
  const [projectManagersemail, setProjectManagersemail] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetching users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/getusers");
        const users = response.data;

        const managers = users.filter((user) => user.role === "ProjectManager");
        const clients = users.filter((user) => user.role === "Client");
        const projectManagerEmails = managers.map((manager) => manager.email); // Extracting emails from project managers

        setProjectManagers(managers);
        setClientEmails(clients);
        setProjectManagersemail(projectManagerEmails); // Setting emails directly
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auditor/create-project", formData);

      if (res.status === 200) {
        setFormData({
          project_name: "",
          project_desc: "",
          project_scope: "",
          project_stack: "",
          client_name: "",
          client_email: "",
          project_manager: "",
          project_manager_email: "", // Clearing the field after submission
        });
        toast.success("Project Created successfully and Mail sent to Client.");
        setFetch((prev) => !prev);
        setModalIsOpen(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  // Return the JSX of the component
  return (
    <>
      <div className="max-w mt-8">
        <div className="flex p-4 w-1/6  hover:border-slate-400"></div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
            },
            content: {
              width: "40%",
              margin: "auto",
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "auto",
            },
          }}
        >
          <form onSubmit={handleSubmit} className="p-4">
            {/* part 1 */}
            <div className="mb-4">
              <label className="block mb-1" htmlFor="project_name">
                Project Name
              </label>
              <input
                required
                type="text"
                id="project_name"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                className={"w-full border rounded-md py-2 px-3"}
              />
            </div>
            {/* Add other form fields as needed */}
            <div className="mb-4">
              <label className="block mb-1" htmlFor="project_desc">
                Project Description
              </label>
              <textarea
                id="project_desc"
                name="project_desc"
                value={formData.project_desc}
                onChange={handleChange}
                className={"w-full border rounded-md py-2 px-3"}
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
                className={"w-full border rounded-md py-2 px-3"}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="project_stack">
                Project Stack
              </label>
              <select
                required
                type="text"
                id="project_stack"
                name="project_stack"
                value={formData.project_stack}
                onChange={handleChange}
                className={"w-full border rounded-md py-2 px-3"}
              >
                <option value="">Select</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Database">Database</option>
              </select>
            </div>

            {/* part 2 */}
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
                onChange={handleChange}
                className={"w-full border rounded-md py-2 px-3"}
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

            {/* part 3 */}
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

            {/* part 4 */}
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
                {projectManagersemail.map((manageremail) => (
                   <option key={manageremail} value={manageremail}>
                   {manageremail}
                 </option>
                ))}
              </select>
            </div>

            {/* Add some spacing between the form fields */}
            <div className="mb-4"></div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create Project
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default CreateProject;
