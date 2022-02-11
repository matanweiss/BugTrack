import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: String,
  description: String,
  bug: Boolean,
  done: Boolean
}, { timestamps: true });

const listSchema = new Schema({
  title: String,
  items: [itemSchema]
});

const projectSchema = new Schema({
  title: String,
  lists: [listSchema],
  user: String
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 }
});

export const Project = mongoose.model('Project', projectSchema);
export const List = mongoose.model('List', listSchema);
export const Item = mongoose.model('Item', itemSchema);
export const User = mongoose.model('User', userSchema);
