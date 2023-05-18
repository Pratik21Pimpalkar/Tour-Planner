import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseURL = 'https://tour-planner-backend.vercel.app/'

const initialState = {
    data: null,
    isLoading: false,
    isError: null,
    isSuccess: null,
};

const mySlice = createSlice({
    name: 'mySlice',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.isLoading = true;
        },
        fetchDataSuccess(state, action) {
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
            state.isError = null;
        },
        fetchDataFailure(state, action) {
            state.isLoading = false;
            state.isSuccess = false;
            state.data = null;
            state.isError = action.payload;
        },
    },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = mySlice.actions;

export const fetchApiData = (data) => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const response = await axios.post(`${baseURL}api/get-place-details/`, data);
        dispatch(fetchDataSuccess(response.data));
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
    }
};

export default mySlice.reducer;
