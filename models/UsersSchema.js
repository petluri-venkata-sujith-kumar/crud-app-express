import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: [true, "pls add the username"] },
    email: {
      type: String,
      unique: true,
      required: [true, "pls add the email"],
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
    },
    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "pls add password"],
      minLength: 8,
      match: ["^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"],
    },
  },
  { timestamps: true }
);

const UserSchemaModel = model("Users", UserSchema);
export default UserSchemaModel;
