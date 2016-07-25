import mongoose from 'mongoose';

module.exports = () => {
  const schema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    done: { type: Boolean }
  });
  return mongoose.model('tasks', schema);
};
