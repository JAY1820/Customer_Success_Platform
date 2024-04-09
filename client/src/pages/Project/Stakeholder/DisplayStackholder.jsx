import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayStakeholder = ({ project, setFetch }) => {
  const [formData, setFormData] = useState({
    project_manager: "",
    project_manager_email: "",
    client_name: "",
    client_email: "",
  });

  const [projectManagers, setProjectManagers] = useState([]);
  const [clientEmails, setClientEmails] = useState([]);

  useEffect(() => {
    if (project) {
      setFormData({
        project_manager: project.project_manager,
        project_manager_email: project.project_manager_email,
        client_name: project.client_name,
        client_email: project.client_email,
      });
    }
  }, [project]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/getusers");
        const users = response.data;

        const managers = users.filter((user) => user.role === "ProjectManager");
        const clients = users.filter((user) => user.role === "Client");

        setProjectManagers(managers);
        setClientEmails(clients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-4">
      <table className="w-full border-collapse table-auto rounded-lg overflow-hidden shadow-lg">
        <thead className="text-left text-white bg-blue-900 uppercase">
          <tr>
            <th className="py-2 px-4 font-bold hover:bg-blue-700">Role</th>
            <th className="py-2 px-4 font-bold hover:bg-blue-700">Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-300 bg-gray-100 hover:bg-gray-200">
            <td className="py-2 px-4">Client</td>
            <td className="py-2 px-4">{formData.client_email}</td>
          </tr>
          <tr className="border-t border-gray-300 hover:bg-gray-200">
            <td className="py-2 px-4">Project Manager</td>
            <td className="py-2 px-4">{formData.project_manager_email}</td>
          </tr>
        </tbody>
      </table>
      {/* Toaster for displaying notifications */}
    </div>
  );
  
  };  
export default DisplayStakeholder;
