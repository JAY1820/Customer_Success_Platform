import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "monday-ui-react-core";
import { RingLoader } from "react-spinners";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MomsClient = ({ project, setFetch, updateProjectData }) => {
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    link: "",
    comments: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <table className="w-full border-collapse table-auto rounded-lg overflow-hidden shadow-lg">
        <thead className="text-left text-white bg-blue-900 uppercase">
          <tr>
            <th className="py-2 px-4 font-bold hover:bg-blue-700">Date</th>
            <th className="py-2 px-4 font-bold hover:bg-blue-700">Duration</th>
            <th className="py-2 px-4 font-bold hover:bg-blue-700">MoM Link</th>
            <th className="py-2 px-4 font-bold hover:bg-blue-700">Comments</th>
          </tr>
        </thead>
        <tbody>
          {project?.project_momsclients?.length > 0 &&
            project?.project_momsclients?.map((myMom) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={myMom._id}
              >
                <td className="px-6 py-4">{formatDate(myMom.date)}</td>
                <td className="px-6 py-4">{myMom.duration}</td>
                <td className="px-6 py-4">{myMom.link}</td>
                <td className="px-6 py-4">{myMom.comments}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default MomsClient;
