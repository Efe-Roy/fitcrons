import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  error: "",
  loading: false,
};

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      // console.log("formData", formData)
      const response = await API.post("/api/auth/login/", formData);
      navigate("/dashboard", {state:"Logged in Successful"});
      return response.data;
    } catch (err) {
        console.log("login", err.request.response);
      toast.error("Los datos de acceso no son correctos");
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
    name: "auth",
  initialState: initialState,
    reducers: {
      clearUser: (state) => {
        state.user = null;
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(authLogin.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(authLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            Cookies.set("userDataFit", JSON.stringify({ ...action.payload }));
        })
        .addCase(authLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            // state.errorMessage = `Oops! Something goes wrong!`;
        });
    },
})

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;