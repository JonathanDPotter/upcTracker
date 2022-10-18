import axios from "axios";
// interfaces
import { IgroupUpload } from "../interfaces/group";
import { InewUser } from "../interfaces/user";
// config
import config from "../config";

const axiosInstance = axios.create({ baseURL: config.baseURL });

const getAllGroups = async (user: string) => {
  try {
    const response = await axiosInstance.get(`/api/group/${user}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createGroup = async (token: string, group: IgroupUpload) => {
  try {
    const response = await axiosInstance.post(`/api/group/`, group, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateGroup = async (_id: string, token: string, group: IgroupUpload) => {
  const response = await axiosInstance.put(`/api/group/${_id}`, group, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

const deleteGroup = async (_id: string, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/group/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const validate = async (token: string | null) => {
  try {
    const response = await axiosInstance.get(`/api/user/validate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const register = async (user: InewUser) => {
  try {
    const response = await axiosInstance.post(`/api/user/register`, user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (user: InewUser) => {
  try {
    const response = await axiosInstance.post(`/api/user/login`, user);
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
