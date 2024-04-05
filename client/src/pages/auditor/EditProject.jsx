import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiEdit } from "react-icons/bi";

function EditProject({ project, setFetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    project_id: project._id,
    project_name: project.project_name,
    project_desc: project.project_desc,
    project_scope: project.project_scope,
    project_stack: project.project_stack,
    project_manager: project.project_manager,
    project_manager_email: project.project_manager_email,
    client_name: project.client_name,
    client_email: project.client_email,
    project_status: project.project_status,
  });

  const [projectManagers, setProjectManagers] = useState([]);
  const [projectManagersemail, setProjectManagersemail] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/getusers");
        const users = response.data;

        const managers = users.filter((user) => user.role === "ProjectManager");
        const managersEmails = managers.map((manager) => manager.email);

        setProjectManagers(managers);
        setProjectManagersemail(managersEmails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    // Check if the clicked element is the modal background
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function updateProject(e) {
    e.preventDefault();
    try {
      await axios.put("/auditor/edit-project", formData).then((res) => {
        if (res.status === 200) {
          toast.success("Project Edited successfully ");
          setFetch((prev) => !prev);
          closeModal();
        }
      });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  }

  const formStyle = {
    width: "33%",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold", 
    marginBottom: "1rem",
  };

  

  return (
    <>
      <div
        onClick={openModal}
        className="bg-opacity-80 text-black p-1 rounded-xl cursor-pointer"
      >
        {/* Edit icon from React Icons */}
        <BiEdit className="w-5 h-5" />
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-500 bg-opacity-30 backdrop-filter backdrop-blur-md"
          onClick={handleModalClick} // Close modal when clicked on the background
        >
          <div style={formStyle}>
            <form className="flex flex-col gap-2" onSubmit={updateProject}>
              {/* Form fields */}
              <div className="w-full">
                <label className="mb-1" htmlFor="project_name">
                  Project Name
                </label>
                <input
                  required
                  type="text"
                  id="project_name"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3"
                />
              </div>
              <div className="mb-4 w-full">
                <label className=" mb-1" htmlFor="project_desc">
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
              <div className="mb-4 w-full">
                <label className=" mb-1" htmlFor="project_scope">
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

              <div className="mb-4 w-full">
                <label className=" mb-1" htmlFor="project_stack">
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

              <div className="mb-4 w-full">
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

              <div className="mb-4 w-full">
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
                  {projectManagersemail.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 w-full">
                <label className="block mb-1" htmlFor="project_status">
                  Project Status
                </label>
                <select
                  required
                  id="project_status"
                  name="project_status"
                  value={formData.project_status}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3"
                >
                  <option value="">Select</option>
                  <option value="In progress">In progress</option>
                  <option value="Complete">Completed</option>
                  <option value="On Time">On Time</option>
                  <option value="Delay">On hold</option>
                </select>
              </div>

              <div className="flex justify-center gap-2">
                <button onClick={closeModal}>Close</button>
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProject;
