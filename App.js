import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import 'react-native-reanimated';
import { StatusBar } from "expo-status-bar";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetail from "./screens/MealDetail";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavouritesScreen from './screens/FavouritesScreen';
import {Ionicons} from '@expo/vector-icons'
//import FavouritesContextProvider from './store/context/favourites-context';  ---useContext is an alternative to Redux below
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

enableScreens();

const Stack = createNativeStackNavigator()
// nested navigation with Drawer
const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return <Drawer.Navigator screenOptions={{
    headerStyle: { backgroundColor: '#351401'}, 
    headerTintColor: 'white', 
    // contentStyle in Drawer is called sceneContainerStyle
    sceneContainerStyle: {backgroundColor: '#3f2f25'},
    drawerContentStyle: {backgroundColor: '#351401'},
    drawerInactiveTintColor: 'white',
    drawerActiveTintColor: '#351401',
    drawerActiveBackgroundColor: '#e4baa1'
  }}>
    <Drawer.Screen name='Categories' component={CategoriesScreen} options={{ title: 'All Categories',
      drawerIcon: ({color, size}) => <Ionicons name='list' color={color} size={size}/>
    }} />
    <Drawer.Screen name='Favourites' component={FavouritesScreen} options={{
      drawerIcon: ({color, size}) => <Ionicons name='star' color={color} size={size}/>
    }} />
  </Drawer.Navigator>
  }

export default function App() {
  // the top screen in Stack.Navigator will be initial screen for the app
  // Alternatively, there also is an initialRouteName prop that can be set on the navigator component 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Provider store={store}>
      {/* <FavouritesContextProvider> */}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#351401'}, 
            headerTintColor: 'white', 
            contentStyle: {backgroundColor: '#3f2f25'} 
          }}>
            <Stack.Screen name='MealsCategories' component={DrawerNavigator} options={{ headerShown: false}}/>
            <Stack.Screen name='MealsOverview' component={MealsOverviewScreen} 
              // options={({route, navigation}) => {
              //   const catId = route.params.categoryId
              //   return {
              //     title: catId
              //   }
              // }}  --- alternative is to use navigation prop on a component MealsOverview
            />
            <Stack.Screen name='MealDetail' component={MealDetail} options={{
              title: 'About the Meal',
              // BELOW APPROACH ADDS A BUTTON TO THE HEADER, but it is not a good way if you want to communicate with this component
              // headerRight: () => {
              //   return <Button title='Tap me' onPress={do something onpress}/>
              // }
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      {/* </FavouritesContextProvider> */}
      </Provider>
    </GestureHandlerRootView>
  );
}