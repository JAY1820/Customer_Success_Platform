const Project = require("../models/ProjectModel");
const ClientFeedback = require("../models/ClientfeedbackModel");

// CREATE CLIENT FEEDBACK
const createClientFeedback = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { type, dateReceived, feedback, actionTaken, closureDate } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this phase" });
    }

    const clientFeedbackDoc = await ClientFeedback.create({
      type,
      dateReceived,
      feedback,
      actionTaken,
      closureDate,
    });

    // ADD CLIENT FEEDBACK ID TO PROJECT TABLE
    projectDoc.project_clientFeedback.push(clientFeedbackDoc._id);
    await projectDoc.save();

    return res.status(201).json({ message: "Client Feedback created" }); // 201 for resource creation
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// DELETE CLIENT FEEDBACK
const deleteClientFeedback = async (req, res, next) => {
  try {
    const { project_id, clientFeedback_id } = req.params;
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the clientFeedback with the specified clientFeedback_id
    projectDoc.project_clientFeedback = projectDoc.project_clientFeedback.filter(
      (clientFeedback) => clientFeedback.toString() !== clientFeedback_id
    );

    // Save the updated project document
    await projectDoc.save();
    await ClientFeedback.deleteOne({ _id: clientFeedback_id });

    return res.status(200).json({ message: "ClientFeedback deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// EDIT CLIENT FEEDBACK
const editClientFeedback = async (req, res, next) => {
  try {
    const { type, dateReceived, feedback, actionTaken, closureDate } = req.body;
    const { clientFeedback_id } = req.params;
    const clientFeedbackDoc = await ClientFeedback.findById(clientFeedback_id);

    if (!clientFeedbackDoc) {
      return res.status(404).json({ message: "ClientFeedback not found" });
    }

    await clientFeedbackDoc.set({
      type,
      dateReceived,
      feedback,
      actionTaken,
      closureDate,
    });
    await clientFeedbackDoc.save();

    return res.status(200).json({ message: "ClientFeedback edited successfully" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

module.exports = {
  createClientFeedback,
  deleteClientFeedback,
  editClientFeedback,
};
