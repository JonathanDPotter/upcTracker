import axios from "axios";
// interfaces
import { IgroupUpload } from "../interfaces/group";
import { InewUser } from "../interfaces/user";

const baseUrl = "https://upc-tracker.herokuapp.com";

const getAllGroups = async () => {
  try {
    const response = await axios.get(baseUrl + "/api/group/");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createGroup = async (token: string, group: IgroupUpload) => {
  try {
    const response = await axios.post(`${baseUrl}/api/group/`, group, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateGroup = async (_id: string, token: string, group: IgroupUpload) => {
  const response = await axios.put(`${baseUrl}/api/group/${_id}`, group, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

const deleteGroup = async (_id: string, token: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/group/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const validate = async (token: string | null) => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/validate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const register = async (user: InewUser) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/register`, user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (user: InewUser) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/login`, user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const api = {
  getAllGroups,
  updateGroup,
  createGroup,
  register,
  login,
  deleteGroup,
  validate,
};

export default api;
