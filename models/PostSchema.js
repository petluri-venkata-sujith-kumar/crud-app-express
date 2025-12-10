import mongoose from "mongoose";

// Destructuring 'Schema' and 'model' from mongoose is cleaner:
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
