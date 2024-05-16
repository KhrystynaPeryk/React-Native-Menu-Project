import { FlatList } from 'react-native'
import {CATEGORIES} from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import { useNavigation } from '@react-navigation/native'

// components in Stack.Screen gets a special prop navigation and route
function CategoriesScreen({navigation}) {
    // const navigation = useNavigation()   --- this hook is an alternative to a navigation prop
    const pressHandler = (id) => {
        navigation.navigate('MealsOverview', {
            categoryId: id
        })
    }
    return <FlatList 
        data={CATEGORIES} 
        keyExtractor={(item) => item.id} 
        renderItem={({item}) => <CategoryGridTile title={item.title} color={item.color} onPressAction={() => pressHandler(item.id)}/>}
        numColumns={2}
    />
}

export default CategoriesScreen