import { Document } from "mongoose";

export interface Igroup extends Document {
  title: string;
  upcs: number[];
  userId?: string;
}

export interface IgroupUpload {
  title: string;
  upcs: number[];
  userId?: string;
}
