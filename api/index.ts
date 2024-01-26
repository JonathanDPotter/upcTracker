import axios from "axios";
import config from "../config";
import { Document } from "mongoose";

export interface Group extends Document {
  title: string;
  upcs: number[];
  userId?: string;
}

export interface GroupUpload {
  title: string;
  upcs: number[];
  userId?: string;
}

export interface NewUser {
  username: string;
  password: string;
}

const axiosInstance = axios.create({ baseURL: config.baseURL });

const getAllGroups = async (user: string) => {
  try {
    const response = await axiosInstance.get(`/api/group/${user}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createGroup = async (token: string, group: GroupUpload) => {
  try {
    const response = await axiosInstance.post(`/api/group/`, group, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateGroup = async (_id: string, token: string, group: GroupUpload) => {
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

const register = async (user: NewUser) => {
  try {
    const response = await axiosInstance.post(`/api/user/register`, user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (user: NewUser) => {
  try {
    const response = await axiosInstance.post(`/api/user/login`, user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (_id: string, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/user/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
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
  deleteUser,
};

export default api;
