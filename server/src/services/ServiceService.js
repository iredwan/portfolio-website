import ServiceModel from "../model/ServiceModel.js";
import mongoose from "mongoose";
import { deleteFile } from '../utility/fileUtils.js';
const ObjectId = mongoose.Types.ObjectId;

export const getAllServices = async () => {
  try {
    let data = await ServiceModel.find({});
    return { status: true, data: data,};
  } catch (e) {
    return { status: false, error: e };
  }
};


export const addService = async (req) => {
  try {
    const reqBody = req.body;
    let data = await ServiceModel.create(reqBody);
        return { status: true, data: data, msg: "Service add successful." };
  } catch (error) {
    throw new Error("Failed to add service");
  }
};


export const updateService = async (req) => {
  try {
    const id = new ObjectId(req.params.id);
    const updates = req.body;
    const service = await ServiceModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, 
    });
    if (!service) throw new Error("Service not found");
    return { status: true, data: service, msg: "Service update success." };
  } catch (error) {
    throw new Error("Failed to update service");
  }
};


export const deleteService = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const service = await ServiceModel.findById(id);

    if (!service) {
      throw new Error("Team Member not found");
    }

    if (service.icon) {
      const fileName = service.icon.split("/").pop();
       
      const fileDeletionResult = await deleteFile(fileName);
      if (!fileDeletionResult.status) {
        throw new Error(fileDeletionResult.error);
      }
    }

    let result = await ServiceModel.findByIdAndDelete(id);
    return { status: true, data: result, msg: "Service Delete success." };
  } catch (error) {
    throw new Error("Failed to delete service");
  }
};
