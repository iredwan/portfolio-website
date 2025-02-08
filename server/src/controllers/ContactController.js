import { 
    createContactService,
    getAllContactService,
    deleteContactService
  } from "../services/ContactService.js";
  

  export const submitContactForm = async (req, res) => {
    const result = await createContactService(req);
    res.status(result.status ? 201 : 400).json(result);
  };
  
  export const getAllContacts = async (req, res) => {
    const result = await getAllContactService();
    res.status(result.status ? 200 : 500).json(result);
  };
  
  
  export const deleteContact = async (req, res) => {
    const result = await deleteContactService(req);
    res.status(result.status ? 200 : 404).json(result);
  };