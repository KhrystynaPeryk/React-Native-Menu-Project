import { Text, View, FlatList, StyleSheet } from "react-native"
import { MEALS, CATEGORIES } from "../data/dummy-data"
import { useEffect } from "react"
import MealItem from "../components/MealItem"

// components in Stack.Screen gets a special prop navigation and route
const MealsOverviewScreen = ({route, navigation}) => {
    const catId = route.params.categoryId // alternative to route prop, you can use a hook useRoute()

    const displayedMeals = MEALS.filter((meal) => {
        if (meal.categoryIds.includes(catId)) {
            return meal
        }
    })

    // we need to use useEffect hook to set navigation options that dynamically update the title of a screen
    // in this case it might be better to use USELAYOUTEFFECT 
    //So it's only set after the screen has been loaded. It's not set whilst the animation is in progress. Now this happens because useEffect actually executes this effect function after the component function was executed for the first time. That's why it's looking that ugly. This can be fixed by using the useLayoutEffect hook instead. 
    //when you typically have some kind of ongoing animation and you wanna set or execute some side effect whilst this is still happening, and before the component has been rendered. Or to be precise, you wanna run this effect simultaneously with the component function execution. Then we use, useLayoutEffect instead


    useEffect(() => {
        const catTitle = CATEGORIES.find((category) => category.id === catId ).title
        navigation.setOptions({title: catTitle})
    }, [catId, navigation])
    
    return (
        <View style={styles.container}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item) => item.id} 
                renderItem={({item}) => <MealItem title={item.title} imageUrl={item.imageUrl} duration={item.duration} complexity={item.complexity} affordability={item.affordability} id={item.id}/>}
            />
        </View>
    )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
})