import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ErrorToast, SuccessToast, IsEmpty } from "../../helper/helper.js";
import {
  createService,
  getAllService,
  updateService,
  deleteService,
  fileUpload,
} from "../../apiRequest/api.js";
import { FaFileImport } from "react-icons/fa";

const ServiceSetting = () => {
  const baseURL = "http://localhost:5000/upload-file/";
  const [services, setServices] = useState([]);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    (async () => {
      let result = await getAllService();
      setServices(result);
    })();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      ErrorToast("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await fileUpload(formData);
      setData((prev) => ({ ...prev, icon: result?.data?.file?.[0]?.filename }));
    } catch (error) {
      ErrorToast("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (IsEmpty(data.title) || IsEmpty(data.description) || IsEmpty(data.icon)) {
      ErrorToast("All fields are required");
      return;
    }
    try {
      if (isUpdateMode) {
        let result = await updateService(selectedServiceId, data);
        if (result) {
          let result = await getAllService();
          setServices(result);
        }
      } else {
       let result = await createService(data);
        if (result) {
                let result = await getAllService();
                setServices(result);
              }
      }
      setData({ title: "", description: "", icon: "" });
      setIsUpdateMode(false);
    } catch (error) {
      ErrorToast(isUpdateMode ? "Failed to update service" : "Failed to create service");
    }
  };

  const handleEdit = (service) => {
    setData({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
    setSelectedServiceId(service._id);
    setIsUpdateMode(true);
  };


  const handleDelete = async (id) => {
    try {
      let result = await deleteService(id);
      if (result) {
        let result = await getAllService();
        setServices(result);
      }
    } catch (error) {
      ErrorToast("Failed to delete service");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Tabs>
        <TabList>
          <Tab>All Services</Tab>
          <Tab>Add Service</Tab>
          {isUpdateMode && <Tab>Update Services</Tab>}
        </TabList>

        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">All Services</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border">
                  <td><img src={baseURL + service.icon} alt="" className="w-16 h-16 object-cover" /></td>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                  <td>
                    <button onClick={() => handleEdit(service)} className="font-medium text-red-600 dark:text-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-white py-2 px-3 rounded-md mr-5">Edit</button>
                    <button 
                    onClick={() => handleDelete(service._id)} className="font-medium text-red-600 dark:text-red-500 cursor-pointer hover:bg-red-600 hover:text-white py-2 px-1 rounded-md">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">
            {isUpdateMode ? "Update Service" : "Add New Service"}
          </h2>
          <form>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm p-2"
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm p-2 h-32"
                  placeholder="Enter service description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Icon (Image Upload)</label>
                <form>
                  <div className="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center ">
                    <div class="absolute">
                      <div class="flex flex-col items-center">
                        <FaFileImport className="size-14 text-blue-600" />
                        <span class="block text-gray-400 font-normal">
                          Attach you files here
                        </span>
                      </div>
                    </div>

                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      class="h-full w-full opacity-0 cursor-pointer"
                      name=""
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
                  {/* <div className='relative'>
                      <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type='file'
                      />
                      <button type='submit'>Upload</button>
                    </div> */}
                </form>
                {data.icon && (
                  <img src={baseURL + data.icon} alt="icon" className="mt-2 w-16 h-16 object-cover" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md"
              >
                {isUpdateMode ? "Update Service" : "Add Service"}
              </button>
            {isUpdateMode && (
              <button
                onClick={() => setIsUpdateMode(false)}
                className="rounded-lg bg-gray-400 px-5 py-3 text-sm font-medium text-white ml-2"
              >
                Cancel
              </button>
            )}

            </div>
          </form>
        </TabPanel>

        {isUpdateMode && (
        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">
            Update Service
          </h2>
          <form>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm p-2"
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm p-2 h-32"
                  placeholder="Enter service description"
                  required
                />
              </div>

              <div className="col-span-4">
              <label className="text-sm font-bold">Image:</label>
                  <img src={baseURL + data.image} alt="icon" className="object-cover" />
            </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md"
              >
                Update Service
              </button>
            {isUpdateMode && (
              <button
                onClick={() => setIsUpdateMode(false)}
                className="rounded-lg bg-gray-400 px-5 py-3 text-sm font-medium text-white ml-2"
              >
                Cancel
              </button>
            )}

            </div>
          </form>
        </TabPanel>
        )}

        
      </Tabs>
    </div>
  );
};

export default ServiceSetting;
