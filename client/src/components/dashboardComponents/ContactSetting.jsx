import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ErrorToast, } from "../../helper/helper.js";
import {
  getAllContact,
  deleteContact,
} from "../../apiRequest/api.js";

const ContactSetting = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    (async () => {
      let result = await getAllContact();
      setContacts(result);
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
     let result = await deleteContact(id);
           if (result) {
             let result = await getAllContact();
             setContacts(result);
           }
    } catch (error) {
      ErrorToast("Failed to delete contact submission");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Tabs>
        <TabList>
          <Tab>All Contacts</Tab>
        </TabList>
        <TabPanel>
          <h2 className="text-xl font-semibold mb-4">All Contacts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="font-medium text-red-600 hover:bg-red-600 hover:text-white py-2 px-3 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ContactSetting;