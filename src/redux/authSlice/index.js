import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "~/api/authApi";

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const login = createAsyncThunk("auth/login", async (data) => {
  
    const res = await authApi.login(data);
    return res.element;
 
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
