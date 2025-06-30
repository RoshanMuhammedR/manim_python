import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projName: {
    type: String,
    required: true,
    minlength: 3
  },
  projDesc: {
    type: String
  },
  projStatus: {
    type: String,
    enum: ['In Progress', 'Completed', 'Planning'],
    default: 'Planning'
  },
  createdAt: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0)
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
