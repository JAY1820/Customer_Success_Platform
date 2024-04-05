const Project = require("../models/ProjectModel");
const OperationalMatrix = require("../models/OperationalMatrixModel");
const FinancialMatrix = require("../models/FinancialMatrixModel");
const TechnicalMatrix = require("../models/TechnicalMatrixModel");

// CREATE Operational Matrix
const createOperationalMatrix = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { level, name } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this phase" });
    }

    const operationalMatrixDoc = await OperationalMatrix.create({ level, name });

    // ADD OperationalMatrix ID TO PROJECT TABLE
    projectDoc.project_operational_matrix.push(operationalMatrixDoc._id);
    await projectDoc.save();

    return res.status(201).json({ message: "OperationalMatrix created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// DELETE Operational Matrix
const deleteOperationalMatrix = async (req, res, next) => {
  try {
    const { project_id, operationalMatrix_id } = req.params;
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    projectDoc.project_operational_matrix = projectDoc.project_operational_matrix.filter(
      matrixId => matrixId.toString() !== operationalMatrix_id
    );

    await projectDoc.save();
    await OperationalMatrix.findByIdAndDelete(operationalMatrix_id);

    return res.status(200).json({ message: "Operational Matrix deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// EDIT Operational Matrix
const editOperationalMatrix = async (req, res, next) => {
  try {
    const { level, name } = req.body;
    const { operationalMatrix_id } = req.params;
    const operationalMatrixDoc = await OperationalMatrix.findByIdAndUpdate(
      operationalMatrix_id,
      { level, name },
      { new: true }
    );

    if (!operationalMatrixDoc) {
      return res.status(404).json({ message: "Operational Matrix not found" });
    }

    return res.status(200).json({ message: "Operational Matrix edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// CREATE Financial Matrix
const createFinancialMatrix = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { level, name } = req.body;

    const projectDoc = await Project.findById(project_id);
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this phase" });
    }

    const financialMatrixDoc = await FinancialMatrix.create({ level, name });

    projectDoc.project_financial_matrix.push(financialMatrixDoc._id);
    await projectDoc.save();

    return res.status(201).json({ message: "Financial Matrix created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// DELETE Financial Matrix
const deleteFinancialMatrix = async (req, res, next) => {
  try {
    const { project_id, financialMatrix_id } = req.params;
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    projectDoc.project_financial_matrix = projectDoc.project_financial_matrix.filter(
      matrixId => matrixId.toString() !== financialMatrix_id
    );

    await projectDoc.save();
    await FinancialMatrix.findByIdAndDelete(financialMatrix_id);

    return res.status(200).json({ message: "Financial Matrix deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// EDIT Financial Matrix
const editFinancialMatrix = async (req, res, next) => {
  try {
    const { level, name } = req.body;
    const { financialMatrix_id } = req.params;
    const financialMatrixDoc = await FinancialMatrix.findByIdAndUpdate(
      financialMatrix_id,
      { level, name },
      { new: true }
    );

    if (!financialMatrixDoc) {
      return res.status(404).json({ message: "Financial Matrix not found" });
    }

    return res.status(200).json({ message: "Financial Matrix edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// CREATE Technical Matrix
const createTechnicalMatrix = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { level, name } = req.body;

    const projectDoc = await Project.findById(project_id);
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this phase" });
    }

    const technicalMatrixDoc = await TechnicalMatrix.create({ level, name });

    projectDoc.project_technical_matrix.push(technicalMatrixDoc._id);
    await projectDoc.save();

    return res.status(201).json({ message: "Technical Matrix created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// DELETE Technical Matrix
const deleteTechnicalMatrix = async (req, res, next) => {
  try {
    const { project_id, technicalMatrix_id } = req.params;
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    projectDoc.project_technical_matrix = projectDoc.project_technical_matrix.filter(
      matrixId => matrixId.toString() !== technicalMatrix_id
    );

    await projectDoc.save();
    await TechnicalMatrix.findByIdAndDelete(technicalMatrix_id);

    return res.status(200).json({ message: "Technical Matrix deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// EDIT Technical Matrix
const editTechnicalMatrix = async (req, res, next) => {
  try {
    const { level, name } = req.body;
    const { technicalMatrix_id } = req.params;
    const technicalMatrixDoc = await TechnicalMatrix.findByIdAndUpdate(
      technicalMatrix_id,
      { level, name },
      { new: true }
    );

    if (!technicalMatrixDoc) {
      return res.status(404).json({ message: "Technical Matrix not found" });
    }

    return res.status(200).json({ message: "Technical Matrix edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

module.exports = {
  createOperationalMatrix,
  deleteOperationalMatrix,
  editOperationalMatrix,
  createFinancialMatrix,
  deleteFinancialMatrix,
  editFinancialMatrix,
  createTechnicalMatrix,
  deleteTechnicalMatrix,
  editTechnicalMatrix,
};
