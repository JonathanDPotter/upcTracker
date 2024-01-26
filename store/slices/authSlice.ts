import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthSliceState = {
  token: string | null;
  user: string | null;
  _id: string | null;
};

const initialState = { token: null, user: null, _id: null } as AuthSliceState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state: AuthSliceState, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state: AuthSliceState, action: PayloadAction<string | null>) => {
      state.user = action.payload;
    },
    setId: (state: AuthSliceState, action: PayloadAction<string | null>) => {
      state._id = action.payload;
    },
  },
});

export const { setToken, setUser, setId } = authSlice.actions;

export default authSlice.reducer;
