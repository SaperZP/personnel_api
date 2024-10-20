import {model, Schema} from 'mongoose';

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, {timestamps: true});

export default model("Department", departmentSchema);
