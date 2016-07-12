import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  done: { type: Boolean }
});

export default mongoose.model('tasks', schema);
