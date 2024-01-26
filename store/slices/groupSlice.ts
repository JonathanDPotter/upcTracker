import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";

export const groupApi = createApi({
  reducerPath: "groupApi",

  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
  }),

  endpoints: (builder) => ({
    getGroups: builder.query({
      query: (_id: string) => `api/group/user/${_id}`,
    }),
  }),
});

export const { useGetGroupsQuery } = groupApi;
