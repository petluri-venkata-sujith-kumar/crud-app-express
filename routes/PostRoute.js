// const express = require("express");
import express from "express";
import PostSchema from "../models/PostSchema.js";
// const PostSchema = require("../models/PostSchema");

export const router = express.Router();

router.post("/create-post", async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res
      .status(201)
      .json({ message: "post has been created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/get-posts", async (req, res) => {
  try {
    const posts = await PostSchema.find();
    res
      .status(200)
      .json({ message: "posts has been fetched successfully", posts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/* UPDATE POST BY ID
   endPoint: /api/update-post/:id
    method: PUT
*/
router.put("/update-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;
    const options = { new: true, overwrite: true }; // overwrite: true is the key concept here    // ⚠️ DANGER: req.body MUST contain ALL fields (title, body, author)
    // If 'author' is missing from req.body, it will be removed/set to null in the database.
    const updatedPost = await PostSchema.updateOne(
      { _id: postId },
      updatedData,
      options
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200, "ok")
      .json({ message: "Successfully updated post", data: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

/* Patch - UPDATE POST BY ID
   endPoint: /api/patch-post/:id
   method: PATCH
*/
router.patch("/patch-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;
    const options = { new: true, runValidators: true }; // to return the new document if not available return old one
    const updatedPost = await PostSchema.updateOne(
      { _id: postId },
      { $set: updatedData }, // only fields present in req.body will be updated
      options
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200, "ok")
      .json({ message: "Successfully patched post", data: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to patch post" });
  }
});

/* DELETE POST BY ID
   endPoint: /api/delete-post/:id
   method: DELETE
*/
router.delete("/delete-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    // const deletedPost = await PostSchema.deleteOne({ _id: postId });
    const deletedPost = await PostSchema.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200, "ok")
      .json({ message: "Successfully deleted post", data: deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

// module.exports = router;
