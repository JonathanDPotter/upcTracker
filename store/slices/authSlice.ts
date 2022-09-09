import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IauthSliceState {
  token: string | null;
  user: string | null;
}

const initialState = { token: null, user: null } as IauthSliceState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state: IauthSliceState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state: IauthSliceState, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logOut: (state: IauthSliceState) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setToken, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
