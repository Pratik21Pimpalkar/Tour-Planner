import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { travelApi } from './api'
import placeDetails from './api'
export const store = configureStore({
    reducer: {
        [travelApi.reducerPath]: travelApi.reducer,
        placeDetails: placeDetails
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(travelApi.middleware),
})


setupListeners(store.dispatch)