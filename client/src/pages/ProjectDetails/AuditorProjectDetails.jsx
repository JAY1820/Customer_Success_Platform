import axios from "axios";
import React, {useState } from "react";
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

import ProjectOverview from "../Project/ProjectOverview/ProjectOverview";
import Budget from "../Project/Budget/Budget";
import Stakeholder from "../Project/Stakeholder/stakeholder";
import AuditHistory from "../Project/Audit/AuditHistory";
import VersionHistory from "../Project/VersionHistory/DisplayVersionHistory";
import FinancialMatrix from "../Project/Matrix/FinancialMatrix";
import OperationalMatrix from "../Project/Matrix/OperationalMatrix";
import TechnicalMatrix from "../Project/Matrix/TechnicalMatrix";

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

function ProjectDetails({ onClose, project, updateProjectData }) {
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!project) {
    return <RingLoader />;
  }

// loading spinner
  if (loading) {
    return <RingLoader />;
  }

  // return the project details
  return (
    <div className="w-full mt-2">
      <TabsContext>
        <TabList>
          <Tab>Project Overview</Tab>
          <Tab>Stakeholder</Tab>
          <Tab>Budget</Tab>
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
            {/* PROJECT OVERVIEW COMPONENT */}
            <ProjectOverview project={project} setFetch={setFetch} />
          </TabPanel>

          <TabPanel>
            {/* STAKEHOLDER COMPONENT */}
            <Stakeholder project={project} setFetch={setFetch} />
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
