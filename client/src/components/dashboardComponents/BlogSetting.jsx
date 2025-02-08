import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaFileImport } from "react-icons/fa";
import {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
  fileUpload,
  getBlogByID,
} from "../../apiRequest/api.js";
import { ErrorToast, SuccessToast, IsEmpty } from "../../helper/helper.js";

// Reusable FileUpload Component
const FileUpload = ({ onFileUpload, label }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      ErrorToast("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await fileUpload(formData);
      onFileUpload(result?.data?.file?.[0]?.filename);
      SuccessToast("Image uploaded successfully!");
    } catch (error) {
      ErrorToast("Image upload failed");
    }
  };

  return (
    <div>
      <label className="text-sm font-bold">{label}</label>
      <form onSubmit={handleUpload}>
        <div className="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
          <div className="absolute">
            <div className="flex flex-col items-center">
              <FaFileImport className="size-14 text-blue-600" />
              <span className="block text-gray-400 font-normal">
                Attach your files here
              </span>
            </div>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="h-full w-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="p-1 bg-blue-600 mt-2 text-white w-full rounded-lg"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable BlogForm Component
const BlogForm = ({
  data,
  setData,
  onSubmit,
  isUpdateMode,
  onCancel,
  onFileUpload,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isUpdateMode ? "Update Blog" : "Add New Blog"}
      </h2>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <label className="text-sm font-bold">Title:</label>
          <input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full rounded-lg border border-gray-600 p-4 text-sm shadow-sm"
            type="text"
            placeholder="Enter blog title"
          />
        </div>
        <div className="col-span-4">
          <label className="text-sm font-bold">Content:</label>
          <textarea
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            className="block w-full rounded-lg border border-gray-600 shadow-sm h-32"
            placeholder="Enter blog content"
          />
        </div>
        <div className="col-span-4">
          <label className="text-sm font-bold">Author:</label>
          <input
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
            className="w-full rounded-lg border border-gray-600 p-4 text-sm shadow-sm"
            type="text"
            placeholder="Enter author name"
          />
        </div>
        <div className="col-span-4">
          <FileUpload
            onFileUpload={(image) => setData({ ...data, image })}
            label="Image:"
          />
          {data.image && (
            <img
              src={`http://localhost:5000/upload-file/${data.image}`}
              alt="blog"
              className="mt-2 w-16 h-16 object-cover"
            />
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={onSubmit}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          {isUpdateMode ? "Update Blog" : "Add Blog"}
        </button>
        {isUpdateMode && (
          <button
            onClick={onCancel}
            className="rounded-lg bg-gray-400 px-5 py-3 text-sm font-medium text-white ml-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

// Main BlogSetting Component
const BlogSetting = () => {
  const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const result = await getAllBlog();
      setBlogs(result);
    } catch (error) {
      ErrorToast("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (IsEmpty(data.title) || IsEmpty(data.content) || IsEmpty(data.author) || IsEmpty(data.image)) {
      ErrorToast("All fields are required");
      return;
    }
    try {
      if (isUpdateMode) {
        await updateBlog(selectedBlogId, data);
        SuccessToast("Blog updated successfully!");
      } else {
        await createBlog(data);
        SuccessToast("Blog created successfully!");
      }
      fetchBlogs();
      setData({ title: "", content: "", author: "", image: "" });
      setIsUpdateMode(false);
    } catch (error) {
      ErrorToast("Failed to save blog");
    }
  };

  // Handle blog edit
  const handleEdit = async (id) => {
    try {
      const result = await getBlogByID(id);
      setData(result);
      setSelectedBlogId(id);
      setIsUpdateMode(true);
    } catch (error) {
      ErrorToast("Failed to load blog details");
    }
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      SuccessToast("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      ErrorToast("Failed to delete blog");
    }
  };

  // Cancel update mode
  const handleCancel = () => {
    setData({ title: "", content: "", author: "", image: "" });
    setIsUpdateMode(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <Tabs>
        <TabList>
          <Tab>All Blogs</Tab>
          <Tab>{isUpdateMode ? "Update Blog" : "Add Blog"}</Tab>
        </TabList>

        {/* All Blogs Tab */}
        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((blog) => (
                  <tr key={blog._id} className="bg-white border-b dark:hover:bg-gray-100">
                    <td className="p-4">
                      <img
                        src={`http://localhost:5000/upload-file/${blog.image}`}
                        alt="blog"
                        className="w-[80px] h-[80px] object-cover"
                      />
                    </td>
                    <td className="p-4">{blog.title}</td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => handleEdit(blog._id)}
                        className="font-medium text-red-600 dark:text-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-white py-2 px-3 rounded-md mr-5"
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => handleDelete(blog._id)}
                        className="font-medium text-red-600 dark:text-red-500 cursor-pointer hover:bg-red-600 hover:text-white py-2 px-1 rounded-md"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>

        {/* Add/Update Blog Tab */}
        <TabPanel>
          <BlogForm
            data={data}
            setData={setData}
            onSubmit={handleSubmit}
            isUpdateMode={isUpdateMode}
            onCancel={handleCancel}
            onFileUpload={(image) => setData({ ...data, image })}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BlogSetting;