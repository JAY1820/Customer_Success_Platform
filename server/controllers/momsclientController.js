const Project = require("../models/ProjectModel");
const Mom = require("../models/MomsclientModel");

// CREATE MOM
const createMom = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { date, duration, link, comments } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this phase" });
    }

    const momsDoc = await Mom.create({ date, duration, link, comments });

    projectDoc.project_momsclients.push(momsDoc._id);
    await projectDoc.save();

    return res.status(201).json({ message: "Mom created" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// DELETE MOM
const deleteMom = async (req, res, next) => {
  try {
    const { project_id, mom_id } = req.params;
    const projectDoc = await Project.findById(project_id);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    projectDoc.project_momsclients = projectDoc.project_momsclients.filter(
      mom => mom.toString() !== mom_id
    );

    await projectDoc.save();
    await Mom.findByIdAndDelete(mom_id);

    return res.status(200).json({ message: "Mom deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// EDIT MOM
const editMom = async (req, res, next) => {
  try {
    const { date, duration, link, comments } = req.body;
    const { mom_id } = req.params;

    const momsDoc = await Mom.findByIdAndUpdate(
      mom_id,
      { date, duration, link, comments },
      { new: true }
    );

    if (!momsDoc) {
      return res.status(404).json({ message: "Mom not found" });
    }

    return res.status(200).json({ message: "Mom edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

module.exports = { createMom, deleteMom, editMom };
