import { createContext, useState } from "react";

export const FavouritesContext = createContext({
    // initial/default state object (not necessary)
    ids: [],
    addFavourite: (id) => {},
    removeFavourite: (id) => {}
})

const FavouritesContextProvider = ({children}) => {
    const [favouriteMealsIds, setFavouriteMealsIds] = useState([])

    const addFavourite = (id) => {
        setFavouriteMealsIds((prevState) => [...prevState, id])
    }

    const removeFavourite = (id) => {
        setFavouriteMealsIds((prevState) => prevState.filter((itemId) => itemId !== id))
    }

    // to pass the above data, we need to construct and pass a value object into provider
    const value = {
        ids: favouriteMealsIds,
        addFavourite,
        removeFavourite
    }
    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
} 

export default FavouritesContextProvider