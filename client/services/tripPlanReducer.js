import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = 'https://tour-planner-backend.vercel.app/'
// const baseURL = 'http://127.0.0.1:8000/'

const addUniqueIdsToData = (data) => {
    return data.map((item, index) => ({ ...item, id: index }));
};
const tripPlan = createSlice({
    name: "tripPlan",
    initialState: {
        data: [],
        isLoading: false,
        isError: null,
        isSuccess: false,
    },
    reducers: {
        fetchDataStart(state) {
            state.isLoading = true;
        },
        fetchDataSuccess(state, action) {
            state.isLoading = false;
            state.data = addUniqueIdsToData(action.payload.optimal_tour_plan)
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
        const response = await axios.post(`${baseURL}calculate-tour-plan/`, data);
        dispatch(fetchDataSuccess(response.data));
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
    }
};
// export const generateTrip = (data) => async (dispatch) => {
//     dispatch(fetchDataStart());
//     try {
//         const response = await axios.post(`${baseURL}api/travel/`, data);
//         dispatch(fetchDataSuccess(response.data));
//     } catch (error) {
//         dispatch(fetchDataFailure(error.message));
//     }
// };

export default tripPlan.reducer;