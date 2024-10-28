import {model, Schema} from "mongoose";
import {hash, genSalt, compare} from "bcryptjs";

export interface IPersonnel extends Document {
  departmentId: Schema.Types.ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  title: string;
  salary: number;
  description?: string;
  isActive: boolean;
  isAdmin: boolean;
  isLead: boolean;
  startedAt: Date;
  checkPassword(enteredPassword: string): Promise<boolean>;
}

const personnelSchema = new Schema<IPersonnel>({
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    select: false
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    match: [
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g,
      "Please enter a valid phone number"
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Please enter a valid email address"
    ]
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  salary: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isLead: {
    type: Boolean,
    default: false,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  }
}, {timestamps: true});

personnelSchema.pre("save", async function (next) {
  const salt = await genSalt(12);
  this.password = await hash(this.password, salt);

  next();
})

personnelSchema.methods.checkPassword = async function (enteredPassword: string): Promise<boolean> {
  return compare(enteredPassword, this.password);
}

export default model("Personnel", personnelSchema);
