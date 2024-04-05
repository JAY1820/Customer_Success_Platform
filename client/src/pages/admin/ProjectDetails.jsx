import React, { useState } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { saveAs } from "file-saver";
import { FaDownload, FaTimes } from "react-icons/fa";
import {
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "monday-ui-react-core";

// Import the necessary components from the project_manager and auditor folders
import ProjectOverview from "../auditor/Project/ProjectOverview";
import Budget from "../auditor/Project/Budget";
import Stakeholder from "../auditor/Project/stakeholder";
import Sprint from "../project_manager/Project/Sprint";
import Milestone from "../project_manager/Project/Milestones";
import Resource from "../project_manager/Project/Resource";
import TeamPhase from "../project_manager/Project/Team";
import MomsClient from "../project_manager/Project/MomsClient";
import ClientFeedback from "../project_manager/Project/ClientFeeback";
import RiskProfile from "../project_manager/Project/Risk";
import AuditHistory from "../auditor/Project/AuditHistory";
import VersionHistory from "../auditor/Project/VersionHistory";
import FinancialMatrix from "../auditor/Project/FinancialMatrix";
import OperationalMatrix from "../auditor/Project/OperationalMatrix";
import TechnicalMatrix from "../auditor/Project/TechnicalMatrix";

function EscalationMatix({ project, setFetch, updateProjectData }) {
  return (
    <div>
      <FinancialMatrix
        project={project}
        setFetch={setFetch}
        updateProjectData={updateProjectData}
      />
      <OperationalMatrix
        project={project}
        setFetch={setFetch}
        updateProjectData={updateProjectData}
      />
      <TechnicalMatrix
        project={project}
        setFetch={setFetch}
        updateProjectData={updateProjectData}
      />
    </div>
  );
}

// Create a new component called ProjectDetails
function ProjectDetails({ onClose, project, updateProjectData }) {
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!project) {
    return <RingLoader />;
  }

  // DOWNLOAD PROJECT AS PDF
  const download = async (project_id) => {
    setLoading(true);
    try {
      // Send a POST request to the backend server to convert the URL to PDF
      const response = await axios.get(`/download-pdf/${project_id}`, {
        responseType: "arraybuffer",
      });

      // Convert the array buffer received from the server to a Blob
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Use file-saver to save the PDF file locally
      saveAs(pdfBlob, "output.pdf");
      setLoading(false);
    } catch (error) {
      // Handle errors if any occur during the conversion process
      console.error("Error converting to PDF:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <RingLoader />;
  }

  // Return the JSX for the ProjectDetails component
  return (
    <div className="w-full mt-2">
      <TabsContext>
        <TabList>
          <Tab>Project Overview</Tab>
          <Tab>Stakeholder</Tab>
          <Tab>Budget</Tab>

          <Tab>Sprint</Tab>
          <Tab>Milestones</Tab>
          <Tab>Resource</Tab>
          <Tab>Team Phase</Tab>
          <Tab>Risk Profiling</Tab>
          <Tab>MoMs CLient</Tab>
          <Tab>Client Feedback</Tab>

          <Tab>Audit History</Tab>
          <Tab>Version History</Tab>
          <Tab>Escalation Matrix</Tab>
        </TabList>
        <div className="flex gap-3 items-center cursor-pointer">
          <div
            className="flex text-center justify-content-between items-center"
            onClick={onClose}
          >
            <span className="font-bold">Close</span>
            <FaTimes />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <ProjectOverview
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
              download={download}
            />
          </TabPanel>

          <TabPanel>
            {/* STAKEHOLDER COMPONENT */}
            <Stakeholder
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            {/* BUDGET COMPONENT */}
            <Budget
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            <Sprint
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* Milestone */}
          <TabPanel>
            <Milestone
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* <h1>Resource</h1> */}
          <TabPanel>
            <Resource
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* team panel */}
          <TabPanel>
            <TeamPhase
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* Risk Profiling */}
          <TabPanel>
            <RiskProfile
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* Moms client */}
          <TabPanel>
            <MomsClient
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* Client Feedback */}
          <TabPanel>
            <ClientFeedback
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            {/* AUDIT HISTORY COMPONENT */}
            <AuditHistory
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            {/* VERSION HISTORY COMPONENT */}
            <VersionHistory
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            <EscalationMatix
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default ProjectDetails;
