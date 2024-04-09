import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "monday-ui-react-core";
import { RingLoader } from "react-spinners";
import EditMom from "./EditMomsClient";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MomsClient = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    link: "",
    comments: "",
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
    return <RingLoader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/projectmanager/moms/${project._id}`, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        setFormData({
          date: "",
          duration: "",
          link: "",
          comments: "",
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

  async function handleDelete(mom_id) {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/projectmanager/moms/${project._id}/${mom_id}`);
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
      <Button onClick={openModal} className="m-2  bg-blue-900">
        Add Moms Client
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Moms Client Modal"
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <div className="mb-1">
            <label className="mb-1" htmlFor="date">
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
          <div className="mb-1">
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
          <div className="mb-1">
            <label className="mb-1" htmlFor="link">
              MoM Link
            </label>
            <input
              required
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-1">
            <label className="mb-1" htmlFor="comments">
              Comments
            </label>
            <input
              required
              type="text"
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="flex justify-between">
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

      <table className="w-full border-collapse table-auto rounded-lg overflow-hidden shadow-lg">
        <thead className="text-left text-white bg-blue-900 uppercase">
          <tr>
          <th className="py-2 px-4 font-bold hover:bg-blue-700">
              Date
            </th>
            <th className="py-2 px-4 font-bold hover:bg-blue-700">
              Duration
            </th>
           <th className="py-2 px-4 font-bold hover:bg-blue-700">
              MoM Link
            </th>
           <th className="py-2 px-4 font-bold hover:bg-blue-700">
              Comments
            </th>
           <th className="py-2 px-4 font-bold hover:bg-blue-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_momsclients?.length > 0 &&
            project?.project_momsclients?.map((myMom) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={myMom._id}>
                <td className="px-6 py-4">{formatDate(myMom.date)}</td>
                <td className="px-6 py-4">{myMom.duration}</td>
                <td className="px-6 py-4">{myMom.link}</td>
                <td className="px-6 py-4">{myMom.comments}</td>
                <td className="px-6 py-4 text-right flex gap-2">
                  <EditMom
                    mom={myMom}
                    setFetch={setFetch}
                    updateProjectData={updateProjectData}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(myMom._id)}
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

export default MomsClient;
