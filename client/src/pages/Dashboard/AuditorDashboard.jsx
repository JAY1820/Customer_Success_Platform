import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import axios from "axios";

import CreateProject from "../Project/ProjectOverview/CreateProject";
import DisplayProjects from "../DisplayProjects/AuditorDisplayProjects";
import ProjectDetails from "../ProjectDetails/AuditorProjectDetails";
import Adduser from "../User/AddUserForm";

const AuditorDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [project, setProject] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const temp = await getAccessTokenSilently();
        setToken(temp);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  const openProjectDetails = (project) => {
    setProject(project);
  };

  const closeProjectDetails = () => {
    setProject(null);
  };

  const updateProjectData = async () => {
    try {
      const response = await axios.get(
        `/auditor/fetch-project/${project._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setProject(response.data);
      } else {
        console.log("Failed to fetch project data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCreateProjectModal = () => {
    setIsCreateProjectModalOpen(!isCreateProjectModalOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RingLoader color="#36D7B7" size={100} loading={isLoading} />
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error("You must be logged in to view this page.");
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <h1 className="text-4xl font-bold text-center mt-10 mb-10">
        Auditor Dashboard
      </h1>

      {/* create proejct  */}
      {!project && (
        <div className="flex justify-start items-center space-x-4 mb-5">
          <button
            className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600"
            onClick={toggleCreateProjectModal}
          >
            Create Project
          </button>

          <button
            className="bg-blue-500 text-white py-2 px-2 ml-5 rounded-md hover:bg-blue-600"
            onClick={() => setShowAddUser(true)}
          >
            Add User
          </button>
        </div>
      )}

      {/* add user  */}
      {showAddUser && (
        <div
          onClick={() => setShowAddUser(false)}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-500 bg-opacity-30 z-50"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "40%",
              margin: "auto",
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
            <Adduser fetch={fetch} />
          </div>
        </div>
      )}

      {!project && (
        <DisplayProjects
          fetch={fetch}
          setFetch={setFetch}
          onViewMore={openProjectDetails}
        />
      )}

      {project && (
        <ProjectDetails
          project={project}
          onClose={closeProjectDetails}
          updateProjectData={updateProjectData}
        />
      )}

      {/* Render CreateProject component with isOpen prop */}
      <CreateProject
        fetch={fetch}
        setFetch={setFetch}
        isOpen={isCreateProjectModalOpen}
      />
    </div>
  );
};

export default AuditorDashboard;
