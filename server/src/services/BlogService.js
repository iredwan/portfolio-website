import fs from 'fs';
import mongoose from "mongoose";
import BlogModel from "../model/BlogModel.js";
import { deleteFile } from '../utility/fileUtils.js';
const ObjectId = mongoose.Types.ObjectId;


export const createBlogService = async (req) => {
  try {
    let reqBody = req.body;
    let data = await BlogModel.create(reqBody);
    return { status: true, data: data, msg: "Blog create success." };
  } catch (e) {
    return { status: false, error: e };
  }
};
export const getBlogService = async (req) => {
  try {
    let id = new ObjectId(req.params.id);
    let data = await BlogModel.findById(id);
    return { status: true, data: data,};
  } catch (e) {
    return { status: false, error: e };
  }
};
export const getAllBlogService = async () => {
  try {
    let data = await BlogModel.find({});
    return { status: true, data: data,};
  } catch (e) {
    return { status: false, error: e };
  }
};
export const updateBlogService = async (req) => {
  try {
    const id = new ObjectId(req.params.id);
    const updateData = req.body; 
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedBlog) {
      return { status: false, error: "Blog post not found" };
    }

    return { status: true, data: updatedBlog, msg: "Blog post updated successfully." };
  } catch (e) {
    return { status: false, error: e.message };
  }
};
export const deleteBlogService = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    let blog = await BlogModel.findById(id);
    
    if (!blog) {
      throw new Error("Blog not found");
    }
      
    if (blog.image) {
      const fileName = blog.image.split("/").pop();
       
      const fileDeletionResult = await deleteFile(fileName);
      if (!fileDeletionResult.status) {
        throw new Error(fileDeletionResult.error);
      }
    }

    let result = await BlogModel.findByIdAndDelete(id);
    return { status: true, data: result, msg: "Blog delete success." };
  } catch (e) {
    return { status: false, error: e };
  }
};