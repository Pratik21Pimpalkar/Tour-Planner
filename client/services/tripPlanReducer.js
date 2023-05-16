import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = 'http://127.0.0.1:8000/'

const tripPlan = createSlice({
    name: "tripPlan",
    initialState: {
        data: null,
        isLoading: false,
        isError: null,
        isSuccess: null,
    },
    reducers: {
        fetchDataStart(state) {
            state.isLoading = true;
        },
        fetchDataSuccess(state, action) {
            state.isLoading = false;
            state.data = state.data ? [...state.data, ...action.payload] : action.payload;
            state.isSuccess = true;
            state.isError = null;
        },
        fetchDataFailure(state, action) {
            state.isLoading = false;
            state.isSuccess = false;
            state.data = null;
            state.isError = action.payload;
        },
    }
})

const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = tripPlan.actions;
export const generateTrip = (data) => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const response = await axios.post(`${baseURL}api/travel/`, data);
        dispatch(fetchDataSuccess(response.data));
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
    }
};

export default tripPlan.reducer;