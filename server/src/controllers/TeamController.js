import { addTeamMember, deleteTeamMember, getAllTeamMembers,  getTeamMember,  updateTeamMember} from './../services/TeamService.js';


export const addMember = async (req, res) => {
    let result = await addTeamMember(req);
    return res.json(result);
  };
export const getAllMember = async (req, res) => {
    let result = await getAllTeamMembers();
    return res.json(result);
  };
export const updateMember = async (req, res) => {
    let result = await updateTeamMember(req);
    return res.json(result);
  };
export const deleteMember = async (req, res) => {
    let result = await deleteTeamMember(req);
    return res.json(result);
  };
export const getAMember = async (req, res) => {
    let result = await getTeamMember(req);
    return res.json(result);
  };