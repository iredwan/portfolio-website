import { addService, deleteService, getAllServices, updateService } from './../services/ServiceService.js';


export const addAService = async (req, res) => {
    let result = await addService(req);
    return res.json(result);
  };
export const getAllService = async (req, res) => {
    let result = await getAllServices();
    return res.json(result);
  };
export const updateAService = async (req, res) => {
    let result = await updateService(req);
    return res.json(result);
  };
export const deleteAService = async (req, res) => {
    let result = await deleteService(req);
    return res.json(result);
  };