import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload, FaTimes } from "react-icons/fa";
import { RingLoader } from "react-spinners";
import { saveAs } from "file-saver";

import {
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "monday-ui-react-core";

// import file
import ProjectOverview from "../auditor/Project/ProjectOverview";
import RiskProfile from "./Project/Risk";
import Sprint from "./Project/Sprint";
import Milestone from "./Project/Milestones";

import Stakeholder from "./Project/DisplayStackholder";
import AuditHistory from "./Project/DisplayAudithistory";

function ProjectDetails({ onClose, project, updateProjectData }) {
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!project) {
    return <RingLoader />;
  }

  if (loading) {
    return <RingLoader />;
  }

  return (
    <div className="w-full mt-2">
      <TabsContext>
        <TabList>
          <Tab>Project Overview</Tab>
          <Tab>Risk Profiling</Tab>
          <Tab>Sprint</Tab>
          <Tab>Milestones</Tab>
          <Tab>Resource</Tab>
          <Tab>Phase</Tab>
          <Tab>Project Updates</Tab>
          <Tab>MoMs CLient</Tab>
          <Tab>Stakeholder</Tab>
          <Tab>Audit History</Tab>
          <Tab>Client Feedback</Tab>
        </TabList>

        <div className="flex gap-3 items-center cursor-pointer">
          <h1 className="font-bold">Project Name: {project.project_name}</h1>

          <div
            className="flex text-center justify-content-between items-center"
            onClick={onClose}
          >
            <span className="font-bold">Close</span>
            <FaTimes />
          </div>
        </div>
        <TabPanels>
          {/* PROJECT OVERVIEW COMPONENT */}
          <TabPanel>
            <ProjectOverview
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* RISK PROFILING COMPONENT */}
          <TabPanel>
            <RiskProfile
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* SPRINT COMPONENT */}
          <TabPanel>
            <h1>Sprint</h1>
            <Sprint
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          {/* Milestone */}
          <TabPanel>
            <h1>Milestone</h1>

            <Milestone
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            <h1>Resource</h1>
          </TabPanel>

          <TabPanel>
            <h1>Phase</h1>
          </TabPanel>

          <TabPanel>
            <h1>Project Updates</h1>
          </TabPanel>

          <TabPanel>
            <h1>MoMs CLient</h1>
          </TabPanel>

          {/* STAKEHOLDER COMPONENT */}
          <TabPanel>
            <Stakeholder project={project} 
            setFetch={setFetch}
            updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
              <AuditHistory project={project} 
              setFetch={setFetch}
              updateProjectData={updateProjectData}
              />  

          </TabPanel>

          <TabPanel>
            <h1>Client Feedback</h1>
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default ProjectDetails;
