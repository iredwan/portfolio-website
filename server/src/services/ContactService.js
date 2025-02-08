import ContactModel from "../model/ContactModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


export const createContactService = async (req) => {
  try {
    const reqBody = req.body;
    const data = await ContactModel.create(reqBody);
    return { 
      status: true, 
      data: data, 
      msg: "Complain received successfully." 
    };
  } catch (error) {
    return { 
      status: false, 
      error: error.message 
    };
  }
};


export const getAllContactService = async () => {
  try {
    const data = await ContactModel.find().sort({ createdAt: -1 });
    return { 
      status: true, 
      data: data, 
      msg: "Complain submissions fetched successfully." 
    };
  } catch (error) {
    return { 
      status: false, 
      error: error.message 
    };
  }
};


export const deleteContactService = async (req) => {
  try {
    const id = new ObjectId(req.params.id);
    const contact = await ContactModel.findByIdAndDelete(id);
    
    if (!contact) {
      throw new Error("Complain not found");
    }
    
    return { 
      status: true, 
      data: contact, 
      msg: "Complain deleted successfully." 
    };
  } catch (error) {
    return { 
      status: false, 
      error: error.message 
    };
  }
};