import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import { JWT_EXPIRE_SECONDS, JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
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
      // match: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  let salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// Method to compare entered password with hashed password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

// Method to sign in user and return JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_SECONDS,
  });
};
const UserSchemaModel = model("Users", UserSchema);
export default UserSchemaModel;
