import {model, Schema} from 'mongoose';

export interface Department extends Document {
  name: string;
}

const departmentSchema = new Schema<Department>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, {timestamps: true});

export default model("Department", departmentSchema);
