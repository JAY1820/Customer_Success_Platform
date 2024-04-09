import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "../Project/ProjectOverview/EditProject";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { saveAs } from "file-saver";

function DisplayProjects({ fetch, setFetch, onViewMore }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/auditor/display-projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchData();
  }, [fetch]);

  async function handleDelete(id) {
    const confirmation = window.confirm("Do you want to delete?");
    if (confirmation) {
      try {
        const response = await axios.delete(`/auditor/delete-project/${id}`);
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "On hold":
        return "text-red-600 , bg-red-100 , border-red-600 , border-2 , border-solid , rounded-full , px-2 , py-1";
      case "On Time":
        return "text-orange-600 , font-bold , bg-orange-200 , border-orange-600 , border-2 , border-solid , rounded-full , px-2 , py-1";
      case "Completed":
        return "text-blue-600 , font-bold , bg-blue-200 , border-blue-600 , border-2 , border-solid , rounded-full , px-2 , py-1";
      case "In progress":
        return "text-green-600 , font-bold, bg-green-200 , border-green-600 , border-2 , border-solid , rounded-full , px-2 , py-1" ;
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="overflow-hidden shadow-lg sm:rounded-lg bg-white">
      <ToastContainer />
      {projects?.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-200">
              <th className="py-3 px-6 text-left border border-gray-200 font-semibold">Project name</th>
              <th className="py-3 px-6 text-left border border-gray-200 font-semibold">Project Description</th>
              <th className="py-3 px-6 text-center border border-gray-200 font-semibold">Project Status</th>
              <th className="py-3 px-6 text-center border border-gray-200 font-semibold">Stack</th>
              <th className="py-3 px-6 text-center border border-gray-200 font-semibold">Project Manager</th>
              <th className="py-3 px-6 text-center border border-gray-200 font-semibold">Created On</th>
              <th className="py-3 px-6 text-center border border-gray-200 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold">
            {projects?.map((project, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left border border-gray-200">{project.project_name}</td>
                <td className="py-3 px-6 text-left border border-gray-200">{project.project_desc}</td>
                <td className="py-3 px-6 text-center border border-gray-200">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      project.project_status
                    )}`}
                  >
                    {project.project_status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center border border-gray-200">{project.project_stack}</td>
                <td className="py-3 px-6 text-center border border-gray-200">{project.project_manager}</td>
                <td className="py-3 px-6 text-center border border-gray-200">
                  {formatCreatedAt(project.createdAt)}
                </td>
                <td className="py-3 px-6 text-center border border-gray-200">
                  <div className="flex item-center justify-center">
                    <button onClick={() => onViewMore(project)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <FiEye />
                    </button>

                    <EditProject project={project} setFetch={setFetch} />

                    <button
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 px-3"
                      onClick={() => handleDelete(project._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center text-gray-500">No data available.</div>
      )}
    </div>
  );
  
  
  
}

export default DisplayProjects;
