import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Loader } from "monday-ui-react-core";
import EditAuditHistory from "./EditAuditHistory";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-modal';

// Styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    padding: '20px'
  }
};

Modal.setAppElement('#root') // replace with your app's id

const AuditHistory = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    dateOfAudit: "",
    reviewedBy: "",
    status: "",
    comment: "",
    actionItem: "",
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
    return <Loader color="var(--primary-color)" size={64} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/auditor/auditHistory${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Audit History Created successfully ");
            setFetch((prev) => !prev);
            setFormData({
              dateOfAudit: "",
              reviewedBy: "",
              status: "",
              comment: "",
              actionItem: "",
            });
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

  async function handleDelete(auditHistory_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/auditor/auditHistory/${project._id}/${auditHistory_id}`
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
      <button
        onClick={openModal}
        className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Audit History
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Audit History Modal"
      >
        <form
          onSubmit={handleSubmit}
          className="text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
        >
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="dateOfAudit">
                Date of Audit
              </label>
              <input
                required
                type="date"
                id="dateOfAudit"
                name="dateOfAudit"
                value={formData.dateOfAudit}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="reviewedBy">
                Reviewed By
              </label>
              <input
                required
                type="text"
                id="reviewedBy"
                name="reviewedBy"
                value={formData.reviewedBy}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="status">
                Status
              </label>
              <select
                required
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              >
                <option value="">Select</option>
                <option value="Delayed">Delayed</option>
                <option value="On-time">On-time</option>
                <option value="Sign-off Pending">Sign-off Pending</option>
                <option value="Sign-off">Sign-off</option>
              </select>
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="comment">
                Comment
              </label>
              <input
                required
                type="text"
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="actionItem">
                Action Item
              </label>
              <input
                required
                type="text"
                id="actionItem"
                name="actionItem"
                value={formData.actionItem}
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date of Audit
            </th>
            <th scope="col" className="px-6 py-3">
              Reviewed By
            </th>
            <th scope="col" className="px-6 py-3">
              Status
              
            </th>
            <th scope="col" className="px-6 py-3">
              Comment
            </th>
            <th scope="col" className="px-6 py-3">
              Action Item
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_audit_history?.length > 0 &&
            project?.project_audit_history?.map((auditHistory) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={auditHistory._id}
              >
                <th className="px-6 py-4  ">
                  {formatDate(auditHistory.dateOfAudit)}
                </th>
                <th className="px-6 py-4  ">{auditHistory.reviewedBy}</th>
                <th className="px-6 py-4  ">{auditHistory.status}</th>
                <th className="px-6 py-4  ">{auditHistory.comment}</th>
                <th className="px-6 py-4  ">{auditHistory.actionItem}</th>

                <td className="px-6 py-4 text-right flex gap-2">
                  <EditAuditHistory
                    auditHistory={auditHistory}
                    setFetch={setFetch}
                    project={project}
                    updateProjectData={updateProjectData}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(auditHistory._id)}
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
}

export default AuditHistory;
