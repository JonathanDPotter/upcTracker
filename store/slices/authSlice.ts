import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IauthSliceState {
  token: string | null;
  user: string | null;
  id: string | null;
}

const initialState = { token: null, user: null, id: null } as IauthSliceState;

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
    setId: (state: IauthSliceState, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    logOut: (state: IauthSliceState) => {
      state = initialState;
    },
  },
});

export const { setToken, setUser, setId, logOut } = authSlice.actions;

export default authSlice.reducer;
