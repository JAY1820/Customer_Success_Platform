const express = require("express");
const projectController = require("../controllers/ProjectController");
const clientFeedbackController = require("../controllers/ClientFeedbackController");
const downloadAsPdf = require("../controllers/DownloadAsPdf");

const router = express.Router();

// Project Routes
const { displayProjects, fetchOneProject } = projectController; 

router.get("/display-projects", displayProjects);
router.get("/fetch-project/:id", fetchOneProject);

// ALL FUNCTIONS
const { createClientFeedback, deleteClientFeedback, editClientFeedback } =
  clientFeedbackController;

// CLIENT FEEDBACK ROUTES
router.post("/:project_id", createClientFeedback);

//DELETE CLIENT FEEDBACK
router.delete("/:project_id/:clientFeedback_id", deleteClientFeedback);

//EDIT CLIENT FEEDBACK
router.put("/:clientFeedback_id", editClientFeedback);

// DOWNLOAD AS PDF

router.get("/download-pdf/:project_id", downloadAsPdf.downloadAllContent);

module.exports = router;
