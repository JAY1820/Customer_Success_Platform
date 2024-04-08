import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditTeam from "./EditTeam";
import Modal from "react-modal";
import { Loader } from "monday-ui-react-core";
import axios from "axios";

Modal.setAppElement("#root");

const Team = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    phaseNumber: "",
    numberOfResources: "",
    role: "",
    availabilityPercentage: "",
    duration: "",
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
        `/projectmanager/team/${project._id}`,
        formData
      );
      console.log("Response from server:", response); // Add this line for logging
      if (response.status === 200) {
        toast.success("Team Created successfully ");
        setFetch((prev) => !prev);
        setFormData({
          phaseNumber: "",
          numberOfResources: "",
          role: "",
          availabilityPercentage: "",
          duration: "",
        });
        closeModal();
        updateProjectData();
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error(err.response.data.message);
      } else {
        console.log("Error:", err); // Add this line for logging
      }
    }
  };
  
  async function handleDelete(team_id) {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/projectmanager/team/${project._id}/${team_id}`
        );
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        updateProjectData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const groupByPhase = (phases) => {
    return phases.reduce((groupedPhases, phase) => {
      const key = phase.phaseNumber;
      if (!groupedPhases[key]) {
        groupedPhases[key] = [];
      }
      groupedPhases[key].push(phase);
      return groupedPhases;
    }, {});
  };

  return (
    <>
      <Button onClick={openModal} className="m-2">
        Add Team
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Team Modal"
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
          className="flex flex-col justify-center items-center gap-1"
        >
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="phaseNumber">
              Phase
            </label>
            <input
              required
              type="number"
              min={0}
              id="phaseNumber"
              name="phaseNumber"
              value={formData.phaseNumber}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="numberOfResources">
              Number of resources
            </label>
            <input
              required
              type="number"
              min={1}
              id="numberOfResources"
              name="numberOfResources"
              value={formData.numberOfResources}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="role">
              Role
            </label>
            <input
              required
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="availabilityPercentage">
              Availability %
            </label>
            <input
              required
              type="number"
              min={0}
              id="availabilityPercentage"
              name="availabilityPercentage"
              value={formData.availabilityPercentage}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="duration">
              Duration
            </label>
            <input
              required
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
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

      {project ? (
        Object.entries(groupByPhase(project.project_team)).map(
          ([phaseNumber, phaseGroup]) => (
            <div key={phaseNumber} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Phase-{phaseNumber}</h2>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse table-auto rounded-lg overflow-hidden shadow-lg">
                <thead className="text-xs text-white bg-blue-900 uppercase">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold hover:bg-blue-700"
                    >
                      No. Of Resources
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold hover:bg-blue-700"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold hover:bg-blue-700"
                    >
                      Availability Percentage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold hover:bg-blue-700"
                    >
                      Duration (In Days)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-bold hover:bg-blue-700"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {phaseGroup?.map((phase) => (
                    <tr
                      className="border-t border-gray-300 bg-gray-100 hover:bg-gray-200"
                      key={phase._id}
                    >
                      <td className="px-6 py-4">
                        {phase.numberOfResources}
                      </td>
                      <td className="px-6 py-4">{phase.role}</td>
                      <td className="px-6 py-4">
                        {phase.availabilityPercentage}
                      </td>
                      <td className="px-6 py-4">{phase.duration}</td>
                      <td className="px-6 py-4 text-right flex gap-2">
                        <EditTeam
                          team={phase}
                          setFetch={setFetch}
                          updateProjectData={updateProjectData}
                        />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(phase._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )
      ) : (
        <Loader color="var(--primary-color)" size={64} />
      )}
    </>
  );
};

export default Team;
