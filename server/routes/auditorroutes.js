const express = require("express");
const auditorController = require("../controllers/ProjectController");
const budgetController = require("../controllers/BudgetController");
const stackholderController = require("../controllers/StackholderController");
const auditHistoryController = require("../controllers/AuditHistoryController");
const matrixController = require("../controllers/MatrixController");
const versionHistoryController = require("../controllers/VersionHistoryController");

const router = express.Router();

// Routes for Project
const {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
  fetchOneProject,
} = auditorController;

router.post("/create-project", createProject);
router.get("/display-projects", displayProjects);
router.get("/fetch-project/:id", fetchOneProject);
router.delete("/delete-project/:id", deleteProject);
router.put("/edit-project", editProject);

// Routes for Project Budget
const { createBudget, deleteBudget, editBudget } = budgetController;
router.post("/budget/:project_id", createBudget);
router.delete("/budget/:project_id/:budget_id", deleteBudget);
router.put("/budget/:budget_id", editBudget);

// Routes for Audit History
const { createAuditHistory, deleteAuditHistory, editAuditHistory } =
  auditHistoryController;

router.post("/auditHistory:project_id", createAuditHistory);
router.delete(
  "/auditHistory/:project_id/:auditHistory_id",
  deleteAuditHistory
);
router.put("/auditHistory/:project_id/:auditHistory_id", editAuditHistory);

// Routes for Matrix
const {
  createOperationalMatrix,
  deleteOperationalMatrix,
  editOperationalMatrix,
  createFinancialMatrix,
  deleteFinancialMatrix,
  editFinancialMatrix,
  createTechnicalMatrix,
  deleteTechnicalMatrix,
  editTechnicalMatrix,
} = matrixController;

router.post("/operationalMatrix/:project_id", createOperationalMatrix);
router.post("/financialMatrix/:project_id", createFinancialMatrix);
router.post("/technicalMatrix/:project_id", createTechnicalMatrix);

router.delete(
  "/operationalMatrix/:project_id/:operationalMatrix_id",
  deleteOperationalMatrix
);
router.delete(
  "/financialMatrix/:project_id/:financialMatrix_id",
  deleteFinancialMatrix
);
router.delete(
  "/technicalMatrix/:project_id/:technicalMatrix_id",
  deleteTechnicalMatrix
);

router.put(
  "/edit-operationalMatrix/:operationalMatrix_id",
  editOperationalMatrix
);
router.put("/edit-financialMatrix/:financialMatrix_id", editFinancialMatrix);
router.put("/edit-technicalMatrix/:technicalMatrix_id", editTechnicalMatrix);

// Routes for Version History
const { createVersionHistory, deleteVersionHistory, editVersionHistory } =
  versionHistoryController;

router.post("/versionHistory/:project_id", createVersionHistory);
router.delete(
  "/versionHistory/:project_id/:versionHistory_id",
  deleteVersionHistory
);
router.put(
  "/versionHistory/:project_id/:versionHistory_id",
  editVersionHistory
);

// Routes for Project Stackholder
const {
  createStackholder,
  deleteStackholder,
  editStackholder,
  displayStackholder,
} = stackholderController;

router.get("/stackholder", displayStackholder);
router.post("/stackholder/:project_id", createStackholder);
router.delete(
  "/stackholder/:project_id/:stackholder_id",
  deleteStackholder
);
router.put("/stackholder/:stackholder_id", editStackholder);

// Exporting the router
module.exports = router;
