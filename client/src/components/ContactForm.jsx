import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ErrorToast, SuccessToast, IsEmpty } from "../helper/helper.js";
import {
  createContact,
  getAllContact,
} from "../apiRequest/api.js";

const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle form submission (create or update)
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (IsEmpty(formData.name) || IsEmpty(formData.email) || IsEmpty(formData.message)) {
          ErrorToast("All fields are required");
          return;
        }
    
        try {
            
            let result = await createContact(formData);
               if (result) {
                 let result = await getAllContact();
               }
          resetForm();
        } catch (error) {
          ErrorToast("Failed to create contact submission");
        }
      };

     const resetForm = () => {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      };
  return (
    <div className="container mx-auto px-7">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mt-12">Contact Form</h2>
    <div className="flex items-center my-16">
    <form onSubmit={handleSubmit} className="w-full md:bg-gray-200 md:py-32 md:px-20 rounded-md">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            placeholder="Enter name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 h-32"
            placeholder="Enter message"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Contact
        </button>
      </div>
    </form>
    </div>
  </div>
  )
}

export default ContactForm