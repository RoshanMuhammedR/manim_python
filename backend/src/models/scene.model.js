import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'system'],
    required: true,
    default: 'user'
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const sceneSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  sceneName: {
    type: String,
    default: null
  },
  chatHistory: {
    type: [chatMessageSchema],
    default: []
  },
  videoUrl: {
    type: String, 
    default: null
  },
}, {
  timestamps: true
});

sceneSchema.virtual('chatLen').get(function () {
  return this.chatHistory.length;
});

// sceneSchema.virtual('latestVidUrlComputed').get(function () {
//   const lastSystemMsg = [...this.chatHistory].reverse().find(msg => msg.role === 'system' && msg.videoUrl);
//   return lastSystemMsg ? lastSystemMsg.videoUrl : null;
// });


sceneSchema.set('toJSON', { virtuals: true });
sceneSchema.set('toObject', { virtuals: true });

const Scene = mongoose.model('Scene', sceneSchema);
export default Scene;
