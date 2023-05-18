import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import placeDetails from './api'
import autoComplete from './autoCompleteReducer'
import tripPlan from './tripPlanReducer'
export const store = configureStore({
    reducer: {
        placeDetails: placeDetails,
        autoComplete: autoComplete,
        tripPlan: tripPlan
    },

})


setupListeners(store.dispatch)