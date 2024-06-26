const Project = require("../models/ProjectModel");
const Sprint = require("../models/SprintModel");

// CREATE SPRINT
const createSprint = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { sprint, startDate, endDate, status, comments } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this phase" });
    }

    const sprintDoc = await Sprint.create({
      sprint,
      startDate,
      endDate,
      status,
      comments,
    });

    // ADD SPRINT ID TO PROJECT TABLE
    projectDoc?.project_sprints?.push(sprintDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Sprint created" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// DELETE SPRINT
const deleteSprint = async (req, res, next) => {
  try {
    const { project_id, sprint_id } = req.params;
    const sprintDoc = await Project.findById({ _id: project_id });

    if (!sprintDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the sprint with the specified sprint_id
    sprintDoc.project_sprints = sprintDoc.project_sprints.filter(
      (sprint) => sprint.toString() !== sprint_id
    );

    // Save the updated project document
    await sprintDoc.save();
    await Sprint.deleteOne({ _id: sprint_id });

    return res.status(200).json({ message: "Sprint deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// EDIT SPRINT
const editSprint = async (req, res, next) => {
  try {
    const { sprint, startDate, endDate, status, comments } = req.body;
    const { sprint_id } = req.params;
    const sprintDoc = await Sprint.findOne({ _id: sprint_id });

    if (!sprintDoc) {
      return res.status(409).json({ message: "Sprint does not exist" });
    }

    await sprintDoc.set({
      sprint,
      startDate,
      endDate,
      status,
      comments,
    });

    await sprintDoc.save();
    return res.status(200).json({ message: "Sprint edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

module.exports = { createSprint, deleteSprint, editSprint };
