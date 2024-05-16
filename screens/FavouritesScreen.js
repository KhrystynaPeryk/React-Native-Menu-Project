import { View, FlatList, StyleSheet, Text} from "react-native"
// import { useContext } from "react" ----with context api
// import { FavouritesContext } from "../store/context/favourites-context"  ----with context api
import { MEALS } from "../data/dummy-data"
import MealItem from "../components/MealItem"
import { useSelector } from "react-redux" // special REDUX hook to get the data from the store


const FavouritesScreen = () => {
    // const favouriteMealsCtx = useContext(FavouritesContext) ----with context api
    //const favouriteMeals = MEALS.filter((meal) => favouriteMealsCtx.ids.includes(meal.id)) ----with context api
    const favouriteMealIds =  useSelector((state) => state.favouriteMeals.ids)
    const favouriteMeals = MEALS.filter((meal) => favouriteMealIds.includes(meal.id))

    if (favouriteMeals.length === 0) {
        return <View style={styles.container}>
            <Text style={styles.text}>You do not have your favourite meals yet!</Text>
        </View>
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={favouriteMeals}
                keyExtractor={(item) => item.id} 
                renderItem={({item}) => <MealItem title={item.title} imageUrl={item.imageUrl} duration={item.duration} complexity={item.complexity} affordability={item.affordability} id={item.id}/>}
            />
        </View>
    )
}

export default FavouritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingVertical: 20
    }
})