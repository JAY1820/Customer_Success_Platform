const Project = require("../models/ProjectModel");
const StackHolder = require("../models/StackHolderModel");

// CREATE STACKHOLDER
const createStackholder = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { role, name, contact } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found for this phase" });
    }

    const stackholderDoc = await StackHolder.create({
      role,
      name,
      contact,
    });

    // ADD STACKHOLDER ID TO PROJECT TABLE
    projectDoc?.project_stackholder?.push(stackholderDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "StackHolder created" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

//DISPLAY ALL PROJECTS
const displayStackholder = async (req, res, next) => {
  try {
    const stackholders = await StackHolder.find({});
    if (stackholders) {
      return res.status(200).json(stackholders);
    }
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// DELETE STACKHOLDER
const deleteStackholder = async (req, res, next) => {
  try {
    const { project_id, stackholder_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the stckholder with the specified stackholder_id
    projectDoc.project_stackholder = projectDoc.project_stackholder.filter(
      (stackholder) => stackholder.toString() !== stackholder_id
    );

    // Save the updated project document
    await projectDoc.save();
    await StackHolder.deleteOne({ _id: stackholder_id });

    return res.status(200).json({ message: "Stackholder deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

// EDIT STACKHOLDER
const editStackholder = async (req, res, next) => {
  try {
    const { role, name, contact } = req.body;
    const { stackholder_id } = req.params;
    const stackholderDoc = await StackHolder.findOne({ _id: stackholder_id });

    if (!stackholderDoc) {
      return res.status(409).json({ message: "Stackholder does not exist" });
    }

    await stackholderDoc.set({
      role,
      name,
      contact,
    });

    await stackholderDoc.save();
    return res.status(200).json({ message: "Stackholder edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || "An error occurred. Please try again." });
  }
};

module.exports = {
  createStackholder,
  deleteStackholder,
  editStackholder,
  displayStackholder,
};
