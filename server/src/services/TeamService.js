import TeamModel from "../model/TeamModel.js";
import mongoose from "mongoose";
import { deleteFile } from '../utility/fileUtils.js';
const ObjectId = mongoose.Types.ObjectId;



export const addTeamMember = async (req) => {
    try {
        let reqBody = req.body;
        let data = await TeamModel.create(reqBody);
        return { status: true, data: data, msg: "Add team member success." };
      } catch (e) {
        return { status: false, error: e };
      }
};

export const getAllTeamMembers = async () => {
    try {
      const data = await TeamModel.find();
      return { status: true, data: data};
    } catch (e) {
      return { status: false, error: e };
    }
  };
  

  export const getTeamMember = async (req) => {
    try {
      let id = new ObjectId(req.params.id);
      let data = await TeamModel.findOne({_id: id });
      return { status: true, data: data,};
    } catch (e) {
      return { status: false, error: e };
    }
  };


export const updateTeamMember = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const updates = req.body;
    const teamMember = await TeamModel.findByIdAndUpdate(id, updates, {
      new: true, 
      runValidators: true,
    });
    if (!teamMember) throw new Error("Team member not found");
    return { status: true, data: teamMember, msg: "Update success." };
  } catch (error) {
    throw new Error("Failed to update team member");
  }
};


export const deleteTeamMember = async (req) => {
  try {
    let id = new ObjectId(req.params.id);
    let teamMember = await TeamModel.findById(id);
    
    if (!teamMember) {
      throw new Error("Team Member not found");
    }
      
    if (teamMember.image) {
      const fileName = teamMember.image.split("/").pop();
       
      const fileDeletionResult = await deleteFile(fileName);
      if (!fileDeletionResult.status) {
        throw new Error(fileDeletionResult.error);
      }
    }

    let result = await TeamModel.findByIdAndDelete(id);
    return { status: true, data: result, msg: "Blog delete success." };
  } catch (error) {
    throw new Error("Failed to delete team member");
  }
};
