import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditProjectUpdate from "./EditProjectUpdate";
import { Loader } from "monday-ui-react-core";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProjectUpdate = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    date: "",
    updates: "",
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
    try {
      const response = await axios.post(
        `/projectmanager/update/${project._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        setFormData({
          date: "",
          updates: "",
        });
        updateProjectData();
        closeModal();
      }
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  async function handleDelete(projectUpdate_id) {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/projectmanager/update/${project._id}/${projectUpdate_id}`
        );
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        updateProjectData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Function to format the date to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <Button onClick={openModal} className="m-2">
         Add Project Update
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Project Update Modal"
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
          className="bg-white rounded-md shadow-lg p-7 flex flex-col gap-3 w-full"
        >
          <div className="mb-1 w-full">
            <label className=" mb-1" htmlFor="date">
              Date
            </label>
            <input
              required
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className=" mb-1" htmlFor="updates">
              General Updates
            </label>
            <input
              required
              type="text"
              id="updates"
              name="updates"
              value={formData.updates}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>

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

      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              General Update
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_projectUpdates?.length > 0 &&
            project?.project_projectUpdates?.map((myProjectUpdate) => (
              <tr
                className="bg-white border-b hover:bg-gray-50 "
                key={myProjectUpdate._id}
              >
                <td className="px-6 py-4 ">
                  {formatDate(myProjectUpdate.date)}
                </td>
                <td className="px-6 py-4 ">{myProjectUpdate.updates}</td>

                <td className="px-6 py-4 text-right flex gap-2">
                  {/* EDITRESOURCE COMPONENT FOR POP UP  */}
                  <EditProjectUpdate
                    projectUpdate={myProjectUpdate}
                    setFetch={setFetch}
                    updateProjectData={updateProjectData}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(myProjectUpdate._id)}
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

export default ProjectUpdate;
