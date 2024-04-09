import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "../Project/ProjectOverview/EditProject";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { saveAs } from "file-saver";
import { Bar } from "react-chartjs-2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chart from "chart.js/auto";

function DisplayProjects({ fetch, setFetch, onViewMore }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/auditor/display-projects");
        setProjects(response.data);
        console.log("All Projects:", response.data); // Log all project data
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

  const download = async (project_id) => {
    setLoading(true); // Set loading state to true
    try {
      toast.info("PDF download in progress..."); // Display informational toast message
      // Request PDF download
      const response = await axios.get(`/client/download-pdf/${project_id}`, {
        responseType: "arraybuffer",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      saveAs(pdfBlob, "output.pdf"); // Save downloaded PDF
      setLoading(false); // Set loading state to false
      toast.success("PDF downloaded successfully"); // Display success toast message
    } catch (error) {
      console.error("Error converting to PDF:", error);
      setLoading(false); // Set loading state to false
      toast.error("Error converting to PDF"); // Display error toast message
    }
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
        return "text-green-600 , font-bold, bg-green-200 , border-green-600 , border-2 , border-solid , rounded-full , px-2 , py-1";
      default:
        return "text-gray-600";
    }
  };

  // Prepare data for Project Status Bar Chart
  const projectStatusCounts = projects.reduce((acc, project) => {
    acc[project.project_status] = (acc[project.project_status] || 0) + 1;
    return acc;
  }, {});

  const projectStatusData = {
    labels: Object.keys(projectStatusCounts),
    datasets: [
      {
        label: "Project Status",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        data: Object.values(projectStatusCounts),
      },
    ],
  };

  // Prepare data for Project Managers Bar Chart
  const projectManagerCounts = projects.reduce((acc, project) => {
    acc[project.project_manager] = (acc[project.project_manager] || 0) + 1;
    return acc;
  }, {});

  const projectManagerData = {
    labels: Object.keys(projectManagerCounts),
    datasets: [
      {
        label: "Project Managers",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: Object.values(projectManagerCounts),
      },
    ],
  };

  // Prepare data for Stacked Bar Chart for Project Types
  const projectTypes = Array.from(
    new Set(projects.map((project) => project.project_stack))
  );
  const projectTypeCountsByStatus = projects.reduce((acc, project) => {
    if (!acc[project.project_status]) {
      acc[project.project_status] = {};
    }
    if (!acc[project.project_status][project.project_stack]) {
      acc[project.project_status][project.project_stack] = 0;
    }
    acc[project.project_status][project.project_stack]++;
    return acc;
  }, {});

  const stackedBarChartData = {
    labels: Object.keys(projectTypeCountsByStatus),
    datasets: projectTypes.map((type, index) => ({
      label: type,
      backgroundColor: `rgba(54, 162, 235, 0.${index + 3})`,
      borderColor: `rgba(54, 162, 235, 1)`,
      borderWidth: 1,
      stack: "Stack 1",
      data: Object.values(projectTypeCountsByStatus).map(
        (count) => count[type] || 0
      ),
    })),
  };

  return (
    <div>
      <div className="overflow-hidden shadow-lg sm:rounded-lg bg-white mb-8">
      <ToastContainer /> {/* Container for toast messages */}
        {projects?.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-200">
                <th className="py-3 px-6 text-left border border-gray-200 font-semibold">
                  Project name
                </th>
                <th className="py-3 px-6 text-left border border-gray-200 font-semibold">
                  Project Description
                </th>
                <th className="py-3 px-6 text-center border border-gray-200 font-semibold">
                  Project Status
                </th>
                <th className="py-3 px-6 text-center border border-gray-200 font-semibold">
                  Stack
                </th>
                <th className="py-3 px-6 text-center border border-gray-200 font-semibold">
                  Project Manager
                </th>
                <th className="py-3 px-6 text-center border border-gray-200 font-semibold">
                  Created On
                </th>
                <th className="py-3 px-6 text-center border border-gray-200 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold">
              {projects?.map((project, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left border border-gray-200">
                    {project.project_name}
                  </td>
                  <td className="py-3 px-6 text-left border border-gray-200">
                    {project.project_desc}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        project.project_status
                      )}`}
                    >
                      {project.project_status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {project.project_stack}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {project.project_manager}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    {formatCreatedAt(project.createdAt)}
                  </td>
                  <td className="py-3 px-6 text-center border border-gray-200">
                    <div className="flex item-center justify-center">
                      <button
                        onClick={() => onViewMore(project)}
                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                      >
                        <FiEye />
                      </button>

                      <EditProject project={project} setFetch={setFetch} />

                      <button
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 px-3"
                        onClick={() => handleDelete(project._id)}
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        className="w-4 mr-2 transform hover:text-green-500 hover:scale-110 px-3"
                        onClick={() => download(project._id)}
                      >
                        <FiDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No data available.
          </div>
        )}
      </div>

      <div className="overflow-hidden shadow-lg sm:rounded-lg bg-white mb-8">
        <h2 className="text-lg font-bold p-4">Project Status Bar Chart</h2>
        <Bar data={projectStatusData} />
      </div>

      <div className="overflow-hidden shadow-lg sm:rounded-lg bg-white mb-8">
        <h2 className="text-lg font-bold p-4">Project Managers Bar Chart</h2>
        <Bar data={projectManagerData} />
      </div>

      <div className="overflow-hidden shadow-lg sm:rounded-lg bg-white mb-8">
        <h2 className="text-lg font-bold p-4">
          Stacked Bar Chart for Project Types
        </h2>
        <Bar
          data={stackedBarChartData}
          options={{ scales: { x: { stacked: true }, y: { stacked: true } } }}
        />
      </div>
    </div>
  );
}

export default DisplayProjects;
