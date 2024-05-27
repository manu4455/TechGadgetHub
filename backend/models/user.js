import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  phoneNo: {
    type: String,
    
  },
  dob: {
    type: Date,
    
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    next();
  }

  // Generate a password hash (with a salt round of 10)
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Prevent Mongoose from creating the model if it already exists
export default mongoose.models.User || mongoose.model("User", userSchema);
