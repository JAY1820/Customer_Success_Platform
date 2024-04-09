import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProjectUpdate = ({ project }) => {
  const [formData, setFormData] = useState({
    date: "",
    updates: "",
  });

  // Function to format the date to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse table-auto rounded-lg overflow-hidden shadow-lg">
        <thead className="text-xs text-white bg-blue-900 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Date
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              General Update
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
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ProjectUpdate;
