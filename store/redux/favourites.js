import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        ids: []
    },
    reducers: {
        // without redux tool kit (with just redux), you should do it in an immutable way, but using a toolkit, you can change the state in a mutable way, redux-toolkit will take care of it
        addFavourite: (state, action) => {
            state.ids.push(action.payload.id)
        },
        removeFavourite: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1)
        }
    }
})

// we need to export the actions
export const addFavourite = favouritesSlice.actions.addFavourite
export const removeFavourite = favouritesSlice.actions.removeFavourite

// we need to export the above reducer to be able to merge it in the store.js
export default favouritesSlice.reducer

