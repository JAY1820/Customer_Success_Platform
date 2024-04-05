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
router.delete("/delete-project/:id", deleteProject);
router.put("/edit-project", editProject);

// Routes for Project Budget
const { createBudget, deleteBudget, editBudget } = budgetController;
router.post("/create-budget/:project_id", createBudget);
router.delete("/delete-budget/:project_id/:budget_id", deleteBudget);
router.put("/edit-budget/:budget_id", editBudget);

// Routes for Project Stackholder
const {
  createStackholder,
  deleteStackholder,
  editStackholder,
  displayStackholder,
} = stackholderController;

router.get("/get-all-stackholder", displayStackholder);
router.post("/create-stackholder/:project_id", createStackholder);
router.delete(
  "/delete-stackholder/:project_id/:stackholder_id",
  deleteStackholder
);
router.put("/edit-stackholder/:stackholder_id", editStackholder);

// Routes for Audit History
const {
  createAuditHistory,
  deleteAuditHistory,
  editAuditHistory,
} = auditHistoryController;

router.post("/create-auditHistory/:project_id", createAuditHistory);
router.delete(
  "/delete-auditHistory/:project_id/:auditHistory_id",
  deleteAuditHistory
);
router.put("/edit-auditHistory/:project_id/:auditHistory_id", editAuditHistory);

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

router.post("/create-operationalMatrix/:project_id", createOperationalMatrix);
router.post("/create-financialMatrix/:project_id", createFinancialMatrix);
router.post("/create-technicalMatrix/:project_id", createTechnicalMatrix);

router.delete(
  "/delete-operationalMatrix/:project_id/:operationalMatrix_id",
  deleteOperationalMatrix
);
router.delete(
  "/delete-financialMatrix/:project_id/:financialMatrix_id",
  deleteFinancialMatrix
);
router.delete(
  "/delete-technicalMatrix/:project_id/:technicalMatrix_id",
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

router.post("/create-versionHistory/:project_id", createVersionHistory);
router.delete(
  "/delete-versionHistory/:project_id/:versionHistory_id",
  deleteVersionHistory
);
router.put(
  "/edit-versionHistory/:project_id/:versionHistory_id",
  editVersionHistory
);

// Exporting the router
module.exports = router;
