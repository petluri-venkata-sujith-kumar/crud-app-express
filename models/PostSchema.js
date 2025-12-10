import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the Schema
const PostSchema = new Schema(
  {
    title: String,
    body: String,
    author: String,
  },
  { timestamps: true }
);

// Use ESM syntax for the default export
const PostModel = model("Post", PostSchema);
export default PostModel;
