import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayProjects from "../DisplayProjects/ClientDisplayProjects";
import ProjectDetails from "../ProjectDetails/ClientProjectDetails";
import axios from "axios"; // Import axios

const ClientDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated, user } = useAuth0();
  const [clientEmail, setClientEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      if (isAuthenticated) {
        try {
          const temp = await getAccessTokenSilently();
          setToken(temp); // Set token
          setClientEmail(user.email);
        } catch (error) {
          console.error("Error fetching email:", error);
        }
      }
    };
    
    fetchEmail();
  }, [getAccessTokenSilently, isAuthenticated, user]);

  if (isLoading) {
    toast.info("Loading...");
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    toast.error("You must be logged in to view this page.");
    return <div className="text-center mt-10">You must be logged in to view this page.</div>;
  }

  const openProjectDetails = (project) => {
    setProject(project);
  };

  const closeProjectDetails = () => {
    setProject(null);
  };

  const updateProjectData = async () => {
    try {
      const response = await axios.get(
        `/client/fetch-project/${project._id}`,
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mt-10 mb-10">Client Dashboard</h1>
      <div className="font-semibold">
        <div>
          <h1 className="text-lg  mb-4">Project Display</h1>
          {!project && (
            <DisplayProjects
              fetch={fetch}
              setFetch={setFetch}
              onViewMore={openProjectDetails}
              clientEmail={clientEmail}
            />
          )}
        </div>
        {project && (
          <ProjectDetails
            project={project}
            onClose={closeProjectDetails}
            updateProjectData={updateProjectData}
          />
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
