const express = require("express");
const RiskController = require("../controllers/RiskController");
const SprintController = require("../controllers/SprintController");
const MileStoneController = require("../controllers/MileStoneController");
const ProjectController = require("../controllers/ProjectController");
const ResourceController = require("../controllers/ResourceController");
const momsclientController = require("../controllers/MomsclientController");
const projectupdateController = require("../controllers/ProjectUpdateController");
const teamController = require("../controllers/TeamController");

const router = express.Router();

// / resource routes

const { createResource, deleteResource, editResource } = ResourceController;

/* APIs */
router.post("/resource/:project_id", createResource);
router.delete("/resource/:project_id/:resource_id", deleteResource);
router.put("/resource/:resource_id", editResource);

//write  a project update routes
const { createProjectUpdate, deleteProjectUpdate, editProjectUpdate } =
  projectupdateController;

/* APIs */
router.post("/update/:project_id", createProjectUpdate);
router.delete("/update/:project_id/:projectUpdate_id", deleteProjectUpdate);
router.put("/update/:projectUpdate_id", editProjectUpdate);

//write a moms clinet routes

const { createMom, deleteMom, editMom } = momsclientController;

router.post("/moms/:project_id", createMom);
router.delete("/moms/:project_id/:mom_id", deleteMom);
router.put("/moms/:mom_id", editMom);

// risk routes
const { createRisk, editRisk, deleteRisk } = RiskController;
// api
router.post("/risk/:project_id", createRisk);
router.delete("/risk/:project_id/:risk_id", deleteRisk);
router.put("/risk/:risk_id", editRisk);

// sprint routes
const { createSprint, deleteSprint, editSprint } = SprintController;
// api
router.post("/sprint/:project_id", createSprint);
router.delete("/sprint/:project_id/:sprint_id", deleteSprint);
router.put("/sprint/:sprint_id", editSprint);

// milestone routes
const { createMilestone, deleteMilestone, editMilestone } = MileStoneController;
// api
router.post("/milestone/:project_id", createMilestone);
router.delete("/milestone/:project_id/:milestone_id", deleteMilestone);
router.put("/milestone/:milestone_id", editMilestone);

// project routes
const { displayProjects, editProject, fetchOneProject } = ProjectController;
// api
router.get("/display-projects", displayProjects);
router.get("/fetch-project/:id", fetchOneProject);
router.put("/edit-project", editProject);

// team routes
const { createTeam, deleteTeam, editTeam } = teamController;
// api
router.post("/team/:project_id", createTeam);
router.delete("/team/:project_id/:team_id", deleteTeam);
router.put("/team/:team_id", editTeam);

module.exports = router;
