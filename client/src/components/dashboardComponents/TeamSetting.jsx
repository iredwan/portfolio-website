import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaFileImport } from "react-icons/fa";
import {
  createTeamMember,
  getAllTeamMembers,
  updateTeamMember,
  deleteTeamMember,
  fileUpload,
  getTeamMemberById,
} from "../../apiRequest/api.js";
import { ErrorToast, SuccessToast, IsEmpty } from "../../helper/helper.js";

const TeamSetting = () => {
  const baseURL = "http://localhost:5000/upload-file/";
  const [file, setFile] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [data, setData] = useState({
    name: "",
    role: "",
    image: "",
  });
  const [updataData, setUpdataData] = useState({
    _id: "",
    name: "",
    role: "",
    image: "",
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      ErrorToast("Please select a file");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    try {
      const result = await fileUpload(data);
      if (isUpdateMode) {
        setUpdataData(prev => ({ ...prev, image: result?.data?.file?.[0]?.filename }));
      } else {
        setData(prev => ({ ...prev, image: result?.data?.file?.[0]?.filename }));
      }
    } catch (error) {
      ErrorToast("Image upload failed");
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await getAllTeamMembers();
      if (response) {
        setTeamMembers(response);
      }
    } catch (error) {
      ErrorToast("Failed to load team members");
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      if (IsEmpty(updataData.name) || IsEmpty(updataData.role) || IsEmpty(updataData.image)) {
        ErrorToast("All fields are required, including an image upload");
        return;
      }
      try {
        await updateTeamMember(updataData._id, updataData);
        SuccessToast("Team member updated successfully!");
        fetchTeamMembers();
        setIsUpdateMode(false);
      } catch (error) {
        ErrorToast("Failed to update team member");
      }
    } else {
      if (IsEmpty(data.name) || IsEmpty(data.role) || IsEmpty(data.image)) {
        ErrorToast("All fields are required");
        return;
      }
      try {
        await createTeamMember(data);
        fetchTeamMembers();
        setData({ name: "", role: "", image: "" });
      } catch (error) {
        ErrorToast("Failed to create team member");
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await getTeamMemberById(id);
      setUpdataData(response);
      setIsUpdateMode(true);
    } catch (error) {
      ErrorToast("Failed to load team member details");
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id);
      fetchTeamMembers();
    } catch (error) {
      ErrorToast("Failed to delete team member");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Tabs>
        <TabList>
          <Tab>All Team Members</Tab>
          <Tab>Add Team</Tab>
              {isUpdateMode && <Tab>Update members info</Tab>}
        </TabList>

        {/* All Team Members Tab */}
        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">All Team Members</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers?.map((item, index) => (
                  <tr key={index} className='bg-white border-b dark:hover:bg-gray-100'>
                    <td className='p-4'>
                      <img
                        src={baseURL + item?.image}
                        alt=''
                        className='w-[80px] h-[80px] object-cover'
                      />
                    </td>
                    <td className='p-4'>{item?.name}</td>
                    <td className='p-4'>{item?.role}</td>
                    <td className='px-6 py-4'>
                      <span
                        onClick={() => handleEdit(item?._id)}
                        className='font-medium text-red-600 dark:text-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-white py-2 px-3 rounded-md mr-5'
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => handleDelete(item?._id)}
                        className='font-medium text-red-600 dark:text-red-500 cursor-pointer hover:bg-red-600 hover:text-white py-2 px-1 rounded-md'
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

        {/* Add*/}
        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">
            Add New Team Member
          </h2>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <label className="text-sm font-bold">Name:</label>
              <input
                onChange={(e) => setData({...data, name: e.target.value})}
                className="w-full rounded-lg border border-gray-600 p-4 text-sm shadow-sm"
                type="text"
                placeholder="Enter team member name"
              />
            </div>

            <div className="col-span-4">
              <label className="text-sm font-bold">Role:</label>
              <input
                onChange={(e) => setData({...data, role: e.target.value})}
                className="w-full rounded-lg border border-gray-600 p-4 text-sm shadow-sm"
                type="text"
                placeholder="Enter team member role"
              />
            </div>

            <div className="col-span-4">
              <label className="text-sm font-bold">Image:</label>
              <form >
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
                    onChange={(e) => setFile(e.target.files[0])}
                    className="h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                  onClick={handleFileUpload}
                    className="p-1 bg-blue-600 mt-2 text-white w-full rounded-lg"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </form>
              {data.image && (
                  <img src={baseURL + data.image} alt="icon" className="mt-2 w-16 h-16 object-cover" />
                )}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
            >
              Add Team Member
            </button>
          </div>
        </TabPanel>

        {/* Update*/}
        {isUpdateMode && (
        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">
            Update Team Member
          </h2>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <label className="text-sm font-bold">Name:</label>
              <input
                value={isUpdateMode ? updataData.name : data.name}
                onChange={(e) => isUpdateMode 
                  ? setUpdataData({...updataData, name: e.target.value})
                  : setData({...data, name: e.target.value})}
                className="w-full rounded-lg border border-gray-600 p-4 text-sm shadow-sm"
                type="text"
                placeholder="Enter team member name"
              />
            </div>

            <div className="col-span-4">
              <label className="text-sm font-bold">Role:</label>
              <input
                value={isUpdateMode ? updataData.role : data.role}
                onChange={(e) => isUpdateMode 
                  ? setUpdataData({...updataData, role: e.target.value})
                  : setData({...data, role: e.target.value})}
                className="w-full rounded-lg border border-gray-600 p-4 text-sm shadow-sm"
                type="text"
                placeholder="Enter team member role"
              />
            </div>

            <div className="col-span-4">
              <label className="text-sm font-bold">Old Image:</label>
                  <img src={baseURL + updataData.image} alt="icon" className="object-cover" />

                  <form >
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
                    onChange={(e) => setFile(e.target.files[0])}
                    className="h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                  onClick={handleFileUpload}
                    className="p-1 bg-blue-600 mt-2 text-white w-full rounded-lg"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
            >
              Update Team Member
            </button>
            
              <button
                onClick={() => setIsUpdateMode(false)}
                className="rounded-lg bg-gray-400 px-5 py-3 text-sm font-medium text-white ml-2"
              >
                Cancel
              </button>
          </div>
        </TabPanel>
        )}

      </Tabs>
    </div>
  );
};

export default TeamSetting;