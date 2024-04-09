import React from "react";
import { Loader } from "monday-ui-react-core";

const DispalyAuditHistory = ({ project }) => {
  // Function to format the date to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (!project) {
    return <Loader color="var(--primary-color)" size={64} />;
  }

  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-collapse table-auto rounded-lg overflow-hidden shadow-lg">
        <thead className="text-xs text-white bg-blue-900 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Date of Audit
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Reviewed By
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Status
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Comment
            </th>
            <th scope="col" className="px-6 py-3 font-bold hover:bg-blue-700">
              Action Item
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_audit_history?.length > 0 &&
            project?.project_audit_history?.map((auditHistory) => (
              <tr
                className="border-t border-gray-300 bg-gray-100 hover:bg-gray-200"
                key={auditHistory._id}
              >
                <td className="px-6 py-4">{formatDate(auditHistory.dateOfAudit)}</td>
                <td className="px-6 py-4">{auditHistory.reviewedBy}</td>
                <td className="px-6 py-4">{auditHistory.status}</td>
                <td className="px-6 py-4">{auditHistory.comment}</td>
                <td className="px-6 py-4">{auditHistory.actionItem}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DispalyAuditHistory;
