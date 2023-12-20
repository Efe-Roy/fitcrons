import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

const initialState = {
  data: null,
  error: "",
  loading: false,
};

export const weekDayDelete = createAsyncThunk("weekDay/delete", async (id) => {
  let response = await API.delete(`/api/fitness/weekdays/${id}/delete/`);
  return response.data;
});

export const gymActivitiesDelete = createAsyncThunk("gymactivities/delete", async (id) => {
  let response = await API.delete(`/api/fitness/gymactivities/${id}/delete/`);
  return response.data;
});

export const exercisesDelete = createAsyncThunk("exercises/delete", async (id) => {
  let response = await API.delete(`/api/fitness/exercises/${id}/delete/`);
  return response.data;
});


const fitnessSlice = createSlice({
    name: "fitness",
  initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(weekDayDelete.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(weekDayDelete.fulfilled, (state, action) => {
            state.loading = false;
            // state.user = action.payload;
        })
        .addCase(weekDayDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            // state.errorMessage = `Oops! Something goes wrong!`;
        });
    },
})

export default fitnessSlice.reducer;