import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { travelApi } from './api'
import placeDetails from './api'
import autoComplete from './autoCompleteReducer'
export const store = configureStore({
    reducer: {
        [travelApi.reducerPath]: travelApi.reducer,
        placeDetails: placeDetails,
        autoComplete: autoComplete
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(travelApi.middleware),
})


setupListeners(store.dispatch)