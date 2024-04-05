// auditHistoryController.js
const Project = require('../models/ProjectModel');
const AuditHistory = require('../models/AuditHistoryModel');
const { sendEmail } = require('../utils/EmailUtil');

// Function to send email for audit history
const sendAuditHistoryEmail = async (projectDoc, mailOptions) => {
  try {
    const clientEmail = projectDoc.client_email;
    const project_name = projectDoc.project_name;
    mailOptions.subject = `Audit History for Project: ${project_name}`;
    const updatedMailOptions = { ...mailOptions, to: clientEmail };

    await sendEmail(updatedMailOptions);
  } catch (error) {
    console.log('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

// CREATE AUDIT HISTORY
const createAuditHistory = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { dateOfAudit, reviewedBy, status, comment, actionItem } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res.status(404).json({ message: 'Project not found for this Audit' });
    }

    const auditHistoryDoc = await AuditHistory.create({
      dateOfAudit,
      reviewedBy,
      status,
      comment,
      actionItem,
    });

    projectDoc.project_audit_history.push(auditHistoryDoc._id);
    await projectDoc.save();

    // Send email to client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      html: `<p>Email content here</p>`,
    };

    await sendAuditHistoryEmail(projectDoc, mailOptions);

    return res.status(201).json({ message: 'AuditHistory created' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

// DELETE AUDIT HISTORY
const deleteAuditHistory = async (req, res, next) => {
  try {
    const { project_id, auditHistory_id } = req.params;
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: 'Project not found' });
    }

    projectDoc.project_audit_history = projectDoc.project_audit_history.filter(
      (audit) => audit.toString() !== auditHistory_id
    );

    await projectDoc.save();
    await AuditHistory.deleteOne({ _id: auditHistory_id });

    // Send email to client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      html: `<p>Email content here</p>`,
    };

    await sendAuditHistoryEmail(projectDoc, mailOptions);

    return res.status(200).json({ message: 'AuditHistory deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

// EDIT AUDIT HISTORY
const editAuditHistory = async (req, res, next) => {
  try {
    const { dateOfAudit, reviewedBy, status, comment, actionItem } = req.body;
    const { auditHistory_id } = req.params;

    const auditHistoryDoc = await AuditHistory.findById(auditHistory_id);
    if (!auditHistoryDoc) {
      return res.status(404).json({ message: 'AuditHistory not found' });
    }

    await auditHistoryDoc.set({
      dateOfAudit,
      reviewedBy,
      status,
      comment,
      actionItem,
    });

    await auditHistoryDoc.save();

    // Find project related to this audit history
    const projectDoc = await Project.findOne({ project_audit_history: auditHistory_id });
    if (!projectDoc) {
      return res.status(404).json({ message: 'Project not found for this Audit History' });
    }

    // Send email to client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      html: `<p>Email content here</p>`,
    };

    await sendAuditHistoryEmail(projectDoc, mailOptions);

    return res.status(200).json({ message: 'AuditHistory edited successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

// FETCH ONE AUDIT HISTORY
const fetchOneAuditHistory = async (req, res, next) => {
  const { auditHistory_id } = req.params;
  try {
    const auditHistoryDoc = await AuditHistory.findById(auditHistory_id);

    if (!auditHistoryDoc) {
      return res.status(404).json({ message: 'AuditHistory not found' });
    }

    return res.status(200).json(auditHistoryDoc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

// FETCH ALL AUDIT HISTORIES
const fetchAllAuditHistories = async (req, res, next) => {
  try {
    const auditHistories = await AuditHistory.find({});

    return res.status(200).json(auditHistories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error occurred ${error.message}` });
  }
};

module.exports = {
  createAuditHistory,
  deleteAuditHistory,
  editAuditHistory,
  fetchOneAuditHistory,
  fetchAllAuditHistories,
};
