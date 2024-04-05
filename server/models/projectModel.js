const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    project_desc: {
      type: String,
    },
    project_scope: {
      type: String,
    },
    project_stack: {
      type: String,
    },

    client_name: {
      type: String,
    },

    client_email: {
      type: String,
    },

    project_manager: {
      type: String,
    },

    project_manager_email: {
      type: String,
    },

    project_status: {
      type: String,
      default: "In progress",
    },

    // reference to the user who created the project

    project_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    project_budget: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
    project_risks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Risk",
      },
    ],

    project_sprints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sprint",
      },
    ],
    project_stackholder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StackHolder",
      },
    ],
    project_audit_history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuditHistory",
      },
    ],
    project_operational_matrix: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OperationalMatrix",
      },
    ],
    project_financial_matrix: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FinancialMatrix",
      },
    ],
    project_technical_matrix: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TechnicalMatrix",
      },
    ],

    // miltstones
    project_milestone: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Milestone",
      },
    ],

    project_resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],

    project_momsclients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Momsclient",
      },
    ],
    project_projectUpdates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectUpdate",
      },
    ],
    project_team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],

    project_version_history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VersionHistory",
      },
    ],
      // client feedback
    project_clientFeedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientFeedback",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
