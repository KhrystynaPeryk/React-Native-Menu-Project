import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from './favourites'

export const store = configureStore({
    // slices of state and actions that can change that data
    reducer: {
        // favouriteMeals - will be used in a callback function for useSelector to fetch this store useSelector((state) => state.favouriteMeals.ids)
        favouriteMeals: favouritesReducer
    }
})