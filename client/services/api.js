import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const travelApi = createApi({
    reducerPath: 'travelApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    endpoints: (builder) => ({
        autoCompleteSearch: builder.mutation({
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
    }),
})


export const { useAutoCompleteSearchMutation } = travelApi