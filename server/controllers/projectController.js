const nodemailer = require("nodemailer");
const Project = require("../models/ProjectModel");
const Budget = require("../models/BudgetModel");
const Momsclient = require("../models/MomsclientModel");
const ProjectUpdates = require("../models/ProjectupdateModel");
const Resource = require("../models/ResourceModel");
const Team = require("../models/TeamModel");
const ClientFeedback = require("../models/ClientfeedbackModel");
const { sendEmail } = require('../utils/EmailUtil');

// CREATE PROJECT
const createProject = async (req, res, next) => {
  try {
    const {
      project_name,
      project_desc,
      project_scope,
      project_stack,
      client_name,
      client_email,
      project_manager,
      project_manager_email,
      project_status,
    } = req.body;
    const projectExists = await Project.findOne({ project_name });

    if (projectExists) {
      return res.status(409).json({ message: 'Project already exists' });
    }

    const projectDoc = await Project.create({
      project_name,
      project_desc,
      project_scope,
      project_stack,
      client_name,
      client_email,
      project_manager,
      project_manager_email,
      project_status,
    });

    // Send welcome email to the client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: client_email,
      subject: 'Welcome to Our Project Management Platform',
      html: `<p>Your email content here</p>`,
    };

    await sendEmail(mailOptions);

    return res.status(201).json({ message: 'Project created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};


// DISPLAY ALL PROJECTS
const displayProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({})
      .populate("project_momsclients")
      .populate("project_resources")
      .populate("project_projectUpdates")
      .populate("project_team")
      .populate("project_budget")
      .populate("project_risks")
      .populate("project_sprints")
      .populate("project_stackholder")
      .populate("project_audit_history")
      .populate("project_operational_matrix")
      .populate("project_financial_matrix")
      .populate("project_technical_matrix")
      .populate("project_milestone")
      .populate("project_version_history")
      .populate("project_clientFeedback");

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const projectDoc = await Project.findById(id);
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.deleteOne({ _id: id });
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// EDIT PROJECT
const editProject = async (req, res, next) => {
  try {
    const {
      project_id,
      project_name,
      project_desc,
      project_scope,
      project_stack,
      project_manager,
      client_name,
      client_email,
      project_manager_email,
      project_status,
    } = req.body;

    const projectDoc = await Project.findById(project_id);
    if (!projectDoc) {
      return res.status(404).json({ message: "Project does not exist" });
    }

    projectDoc.project_name = project_name;
    projectDoc.project_desc = project_desc;
    projectDoc.project_scope = project_scope;
    projectDoc.project_stack = project_stack;
    projectDoc.project_manager = project_manager;
    projectDoc.project_manager_email = project_manager_email;
    projectDoc.client_name = client_name;
    projectDoc.client_email = client_email;
    projectDoc.project_status = project_status;
    projectDoc.updatedAt = Date.now();

    await projectDoc.save();

    return res.status(200).json({ message: "Project edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// FETCH ONE PROJECT
const fetchOneProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const projectDoc = await Project.findById(id)
      .populate("project_momsclients")
      .populate("project_resources")
      .populate("project_projectUpdates")
      .populate("project_team")
      .populate("project_clientFeedback")
      .populate("project_budget")
      .populate("project_risks")
      .populate("project_sprints")
      .populate("project_stackholder")
      .populate("project_audit_history")
      .populate("project_operational_matrix")
      .populate("project_financial_matrix")
      .populate("project_technical_matrix")
      .populate("project_milestone")
      .populate("project_version_history");

    if (!projectDoc) {
      return res.status(404).json({ message: "Project does not exist" });
    }

    return res.status(200).json(projectDoc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

module.exports = {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
  fetchOneProject,
};
