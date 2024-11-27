import mongoose, { Schema } from "mongoose";
import { emailRegex, nameRegex } from "../utils/validation";

type UserProps = {
  username: string;
  email: string;
  password: string;
};

const userSchema = new Schema<UserProps>(
  {
    username: {
      type: String,
      required: true,
      match: nameRegex,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegex,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
