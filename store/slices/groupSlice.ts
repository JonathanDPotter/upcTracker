import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
  }),
  endpoints: (builder) => ({
    getAllGroups: builder.query({ query: () => "api/group/" }),
  }),
});

export const { useGetAllGroupsQuery } = groupApi;
