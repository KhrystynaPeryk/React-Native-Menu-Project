import { Text, View, StyleSheet, Pressable, Image, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MealInfo from "./MealInfo"
const MealItem = ({title, imageUrl, duration, complexity, affordability, id}) => {

    const navigation = useNavigation()
    const pressHandler = (id) => {
        navigation.navigate('MealDetail', {
            mealId: id
        })
    }
    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{color: '#ccc'}} 
                style={({pressed}) => (pressed ? styles.buttonPressed : null)}
                onPress={() => pressHandler(id)}  
            >
                <View style={styles.innerContainer}>
                    <Image source={{uri: imageUrl}} style={styles.img}/>
                    <Text style={styles.title}>{title}</Text>
                    <MealInfo duration={duration} complexity={complexity} affordability={affordability} textStyle={{color: "black"}}/>
                </View>
            </Pressable>
        </View>
    )
}

export default MealItem

const styles = StyleSheet.create({
    mealItem: {
        flex: 1,
        padding: 16,
        overflow: 'hidden',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    innerContainer: {
        backgroundColor: 'white',
        paddingBottom: 8,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 18
    },
    img: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8, 
    },
    buttonPressed: {
        opacity: 0.5
    },
})