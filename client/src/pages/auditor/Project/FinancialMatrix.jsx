import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Loader } from "monday-ui-react-core";
import EditMatrix from "./EditMatrix";
import Modal from "react-modal";

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
  },
};

Modal.setAppElement("#root"); // replace with your app's id

const FinancialMatrix = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    level: "",
    name: "",
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
      await axios
        .post(`/auditor/create-financialMatrix/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            setFetch((prev) => !prev);
            toast.success("Matrix Created successfully ");
            setFormData({
              level: "",
              name: "",
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

  async function handleDelete(financialMatrix_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/auditor/delete-financialMatrix/${project._id}/${financialMatrix_id}`
        );
        toast.success(response.data.message);
        setFetch((prev) => !prev);
        updateProjectData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Financial Escalation Matrix
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Financial Escalation Matrix Modal"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
        >
          <div className="mb-4">
            <label className="block mb-1" htmlFor="level">
              Escalation Level
            </label>
            <input
              required
              type="text"
              id="level"
              name="level"
              min="0"
              value={formData.level}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              min="0"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>

          <div>
            <Button
              onClick={closeModal}
              className="mx-2"
              color="red"
              variant="secondary"
            >
              Close
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>

      {/* TABLE FOR DISPLAY Financial Escalation Matrix   */}
      <h1 className="font-bold text-center">Financial Escalation Matrix </h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Escalation Level
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_financial_matrix?.length > 0 &&
            project?.project_financial_matrix?.map((matrix) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={matrix._id}
              >
                <th className="px-6 py-4  ">{matrix.level}</th>

                <td className="px-6 py-4">{matrix.name}</td>
                <td className="px-6 py-4 text-right flex gap-2">
                  {/* EDITMATRIX COMPONENT FOR POP UP  */}
                  <EditMatrix
                    matrix={matrix}
                    setFetch={setFetch}
                    typeOfMatrix={"financial"}
                    updateProjectData={updateProjectData}
                  />
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(matrix._id)}
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

export default FinancialMatrix;
