import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

// Styles for the modal
const customStyles = {
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
};

Modal.setAppElement("#root"); // replace with your app's id

const ClientFeedback = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    type: "",
    dateReceived: new Date().toJSON(),
    feedback: "",
    actionTaken: "",
    closureDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!project) {
    return <div>Project Does not Assigned to a client.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function updateResource(e) {
    e.preventDefault();
    try {
      await axios
        .put(`/client/${formData._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setFetch((prev) => !prev);
            closeModal();
            updateProjectData();
          }
        });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  return (
    <>
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
                  <div
                    onClick={() => {
                      setFormData({
                        ...formData,
                        _id: myClientFeedback._id,
                        type: myClientFeedback.type,
                        dateReceived: myClientFeedback.dateReceived,
                        feedback: myClientFeedback.feedback,
                        actionTaken: myClientFeedback.actionTaken,
                        closureDate: myClientFeedback.closureDate,
                      });
                      openModal();
                    }}
                    className="bg-opacity-80 text-black p-1 rounded-xl cursor-pointer"
                  >
                    <BiEdit className="w-5 h-5" />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Client Feedback Modal"
      >
        <form onSubmit={updateResource} className="w-full">
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
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
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
              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            />
          </div>
          <div className="flex justify-center mt-4">
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
    </>
  );
};

export default ClientFeedback;
