const Project = require("../models/ProjectModel");
const Milestone = require("../models/MlieStoneModel");

// CREATE MILESTONE
const createMilestone = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const {
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this milestone" });
    }

    const milestoneDoc = await Milestone.create({
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    });

    projectDoc.project_milestone.push(milestoneDoc._id);
    await projectDoc.save();

    return res.status(201).json({ message: "Milestone created", milestone: milestoneDoc });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// DELETE MILESTONE
const deleteMilestone = async (req, res, next) => {
  try {
    const { project_id, milestone_id } = req.params;
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    const milestoneIndex = projectDoc.project_milestone.findIndex(
      milestone => milestone.toString() === milestone_id
    );

    if (milestoneIndex === -1) {
      return res.status(404).json({ message: "Milestone not found in project" });
    }

    projectDoc.project_milestone.splice(milestoneIndex, 1);
    await projectDoc.save();

    await Milestone.findByIdAndDelete(milestone_id);

    return res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// EDIT MILESTONE
const editMilestone = async (req, res, next) => {
  try {
    const {
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    } = req.body;
    const { milestone_id } = req.params;

    const milestoneDoc = await Milestone.findByIdAndUpdate(
      milestone_id,
      {
        title,
        startDate,
        completionDate,
        approvalDate,
        status,
        revisedCompletionDate,
        comments,
      },
      { new: true }
    );

    if (!milestoneDoc) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    return res.status(200).json({ message: "Milestone edited successfully", milestone: milestoneDoc });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

module.exports = { createMilestone, deleteMilestone, editMilestone };
