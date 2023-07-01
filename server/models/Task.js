import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true
  },
  estimatedTime: {
    type: Number,
    required: true,
    default: '0:00'
  },
  actualTime: {
    type: Number
  },
  status: {
    type: String,
    enum: ['Active', 'On Hold', 'Unassigned', 'Completed'],
    default: 'Unassigned'
  },
  pinned: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
