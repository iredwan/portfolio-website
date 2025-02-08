import { createBlogService, deleteBlogService, getAllBlogService, getBlogService, updateBlogService } from "../services/BlogService.js";


export const createBlog = async (req, res) => {
    let result = await createBlogService(req);
    return res.json(result);
  };
export const getBlog = async (req, res) => {
    let result = await getBlogService(req);
    return res.json(result);
  };
export const getAllBlog = async (req, res) => {
    let result = await getAllBlogService(req);
    return res.json(result);
  };
  
  export const updateBlog = async (req, res) => {
    let result = await updateBlogService(req);
    return res.status(200).json(result);
  };
  export const deleteBlog = async (req, res) => {
    let result = await deleteBlogService(req);
    return res.status(200).json(result);
  };
  
