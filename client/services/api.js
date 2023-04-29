import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/'
export const travelApi = createApi({
    reducerPath: 'travelApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        autoCompleteSearch: builder.mutation({
            reducerPath: "autoCompleteSearch",
            query: ({ query }) => {
                console.log(query);
                return {
                    url: `api/search-place/`,
                    body: {
                        query: query
                    }
                    ,
                    method: 'POST',
                }
            }
        }),

        getPlaceDetails: builder.mutation({
            reducerPath: "getPlaceDetails",
            query: ({ place_id }) => {
                console.log(place_id);
                return {
                    url: `api/get-place-details/`,
                    body: {
                        place_id: place_id
                    },
                    method: 'POST'
                }
            },
        })
    }),
})


export const { useAutoCompleteSearchMutation, useGetPlaceDetailsMutation } = travelApi





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
