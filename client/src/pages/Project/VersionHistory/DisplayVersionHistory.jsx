import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Loader } from "monday-ui-react-core";
import Modal from "react-modal";

const VersionHistory = ({ project }) => {
  const [formData, setFormData] = useState({
    no: "",
    type: "",
    change: "",
    changeReason: "",
    createdBy: "",
    revisionDate: "",
    approvalDate: "",
    approvedBy: "",
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
              Version
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Type
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Change
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Change Reason
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Created By
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Revision Date
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Approval Date
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Approved By
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_version_history?.length > 0 &&
            project?.project_version_history?.map((versionHistory) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={versionHistory._id}
              >
                <th className="px-6 py-4  ">{versionHistory.no}</th>
                <th className="px-6 py-4  ">{versionHistory.type}</th>
                <th className="px-6 py-4  ">{versionHistory.change}</th>
                <th className="px-6 py-4  ">{versionHistory.changeReason}</th>
                <th className="px-6 py-4  ">{versionHistory.createdBy}</th>
                <th className="px-6 py-4  ">
                  {formatDate(versionHistory.revisionDate)}
                </th>
                <th className="px-6 py-4  ">
                  {formatDate(versionHistory.approvalDate)}
                </th>
                <th className="px-6 py-4  ">{versionHistory.approvedBy}</th>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default VersionHistory;
