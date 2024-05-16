import { Text, View, Button, Image, StyleSheet, ScrollView } from "react-native"
import { MEALS } from "../data/dummy-data"
import MealInfo from "../components/MealInfo"
import MealDetailList from "../components/MealDetailList"
import { useEffect, useContext } from "react"
import IconButton from "../components/IconButton"
//import { FavouritesContext } from "../store/context/favourites-context" ----with context api
import { useDispatch, useSelector } from "react-redux" // useSelector - special REDUX hook to get the data from the store,  useDispatch - to dispatch ACTIONS
import { addFavourite, removeFavourite } from "../store/redux/favourites"

const MealDetail = ({route, navigation}) => {
    //const favouriteMealsCtx = useContext(FavouritesContext) ----with context api
    const favMealIds =  useSelector((state) => state.favouriteMeals.ids)
    const dispatch = useDispatch()

    const mealId = route.params.mealId
    const meal = MEALS.find(item => item.id === mealId)

    //const mealIsFavourite = favouriteMealsCtx.ids.includes(mealId)  ----with context api
    const mealIsFavourite = favMealIds.includes(mealId)

    const changeFavouriteStatusHandler = () => {
        if (mealIsFavourite) {
            // favouriteMealsCtx.removeFavourite(mealId) ----with context api
            dispatch(removeFavourite({id: mealId}))
        } else {
            // favouriteMealsCtx.addFavourite(mealId) ----with context api
            dispatch(addFavourite({id: mealId}))
        }
    }

    useEffect(() => {
        // useEffect or useLayoutEffect 
        // below navigation from props pass the jsx element to the header of a navigation
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon={mealIsFavourite ? 'star' : 'star-outline'} color={'white'} onPressIcon={changeFavouriteStatusHandler}/>
            }
        })
    }, [navigation, changeFavouriteStatusHandler])

    return (
        <ScrollView style={styles.container}>
            <Image source={{uri: meal.imageUrl}} style={styles.img} />
            <Text style={styles.title}>{meal.title}</Text>
            <MealInfo duration={meal.duration} complexity={meal.complexity} affordability={meal.affordability} textStyle={{color: "white"}}/>
            <View style={styles.listContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.subtitle}>Ingredients:</Text>
                    <MealDetailList data={meal.ingredients} />
                    <Text style={styles.subtitle}>Steps:</Text>
                    <MealDetailList data={meal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        paddingBottom: 8,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 8,
        fontSize: 24,
        color: 'white'
    },
    info: {
        textAlign: 'center',
        fontSize: 12,
        color: '#808080',
        paddingVertical: 3,
        fontWeight: 'bold',
    },
    img: {
        width: '100%',
        height: 350
    },
    subtitle: {
        color: "#e2b497",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 6,
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2,
        marginHorizontal: 24,
        marginVertical: 4
    },
    innerContainer: {
        width: '80%'
    },
    listContainer: {
        alignItems: 'center'
    }
})