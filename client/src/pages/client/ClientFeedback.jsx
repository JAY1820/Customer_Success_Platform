import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditClientFeedback from "./EditClientFeedback";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ClientFeedback = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    type: "",
    dateReceived: new Date().toJSON(),
    feedback: "",
    actionTaken: "",
    closureDate: "",
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
    return <div>Project Does not Assigned to a client.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/client/${project._id}`, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        setFormData({
          type: "",
          feedback: "",
          actionTaken: "",
          closureDate: "",
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

  async function handleDelete(clientFeedback_id) {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/client/${project._id}/${clientFeedback_id}`
        );
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        updateProjectData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <Button onClick={openModal} className="m-2">
        Add Feedback
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Client Feedback Modal"
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
            <label className="mb-1" htmlFor="type">
              Feedback type
            </label>
            <select
              required
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            >
              <option value="">Select</option>
              <option value="Complaint">Complaint</option>
              <option value="Appreciation">Appreciation</option>
            </select>
          </div>

          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="feedback">
              Detailed Feedback
            </label>
            <input
              required
              type="text"
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="actionTaken">
              Action Taken
            </label>
            <input
              required
              type="text"
              id="actionTaken"
              name="actionTaken"
              value={formData.actionTaken}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1 w-full">
            <label className="mb-1" htmlFor="closureDate">
              Closure Date
            </label>
            <input
              type="date"
              id="closureDate"
              name="closureDate"
              value={formData.closureDate}
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

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse table-auto rounded-lg overflow-hidden shadow-lg">
        <thead className="text-xs text-white bg-blue-900 uppercase">
          <tr>
          <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Feedback Type
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Date Received
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Detailed Feedback
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Action Taken
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Closure Date
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_clientFeedback?.length > 0 &&
            project?.project_clientFeedback?.map((myClientFeedback) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={myClientFeedback._id}
              >
                {myClientFeedback.type === "Complaint" && (
                  <th className="px-6 py-4 text-red-500">
                    {myClientFeedback.type}
                  </th>
                )}
                {myClientFeedback.type === "Appreciation" && (
                  <th className="px-6 py-4 text-green-500">
                    {myClientFeedback.type}
                  </th>
                )}
                <th className="px-6 py-4">
                  {formatDate(myClientFeedback.dateReceived)}
                </th>
                <th className="px-6 py-4">{myClientFeedback.feedback}</th>
                <th className="px-6 py-4">{myClientFeedback.actionTaken}</th>
                <th className="px-6 py-4">
                  {formatDate(myClientFeedback.closureDate)}
                </th>
                <td className="px-6 py-4 text-right flex gap-2">
                  <EditClientFeedback
                    clientFeedback={myClientFeedback}
                    setFetch={setFetch}
                    updateProjectData={updateProjectData}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(myClientFeedback._id)}
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

export default ClientFeedback;
