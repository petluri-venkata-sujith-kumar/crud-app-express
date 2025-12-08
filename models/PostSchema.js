const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//if wont follow the schema it will throw an error casting error
const PostSchema = new Schema(
  {
    title: String,
    body: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
