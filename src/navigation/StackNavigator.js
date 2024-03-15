import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import DetailScreen from '../screens/DetailScreen'
import ProfileScreen from '../screens/ProfileScreen'
import OrderScreen from '../screens/OrderScreen'
import ProductListScreen from '../screens/ProductListScreen'
import AddProductScreen from '../screens/AddProductScreen'
import KurtaCategory from '../Categories/StylishKurtis'
import CategorySelection from '../Categories/SelectCategory'
import Legis from '../Categories/Legis'
import Jeans from '../Categories/Jeans'
import KurtiSets from '../Categories/KurtiSets'
import Teescombos from '../Categories/Tees&Combos'
import ProductItem from '../components/ProductItem'
import FashionableTops from '../Categories/FashionableTops'
import ProductDetailScreen from '../screens/DetailScreen'

const Stack = createStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="homescreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#91c4f8",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="homescreen" component={HomeScreen} />
      <Stack.Screen name="detailscreen" component={DetailScreen} />
      <Stack.Screen name="productlistscreen" component={ProductListScreen} />
      <Stack.Screen name="addproductscreen" component={AddProductScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="KurtisCategory" component={KurtaCategory} />
      <Stack.Screen name="LegisCategory" component={Legis} />
      <Stack.Screen name="CombosCategory" component={Teescombos} />
      <Stack.Screen name="TopsCategory" component={FashionableTops} />
      <Stack.Screen name="SelectCategory" component={CategorySelection} />
      <Stack.Screen name="JeansCategory" component={Jeans} />
      <Stack.Screen name="KurtiSetsCategory" component={KurtiSets} />
      <Stack.Screen name="ProductItem" component={ProductItem} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}/>
    </Stack.Navigator>
  );
}

const CartStackNavigator = () => {
   return( <Stack.Navigator
    initialRouteName='cart-screen'
    screenOptions={{
        headerStyle:{
            backgroundColor:"#91c4f8"
        },
        headerShown:false
    }}
    >
      <Stack.Screen name='cart-screen' component={CartScreen} />
    </Stack.Navigator>
   )
}

const ProfileStackNavigator = () => {
    return( 
    <Stack.Navigator
     initialRouteName='profile-screen'
     screenOptions={{
         headerStyle:{
             backgroundColor:"#91c4f8"
         },
         headerShown:false
     }}
     >
         <Stack.Screen name='profile-screen' component={ProfileScreen} />
     </Stack.Navigator>
    )
 }
const OrderStackNavigator = () => {
    return( 
    <Stack.Navigator
     initialRouteName='order-screen'
     screenOptions={{
         headerStyle:{
             backgroundColor:"#91c4f8"
         },
         headerShown:false
     }}
     >
         <Stack.Screen name='order-screen' component={OrderScreen} />
     </Stack.Navigator>
    )
 }

export  {MainStackNavigator,CartStackNavigator,ProfileStackNavigator,OrderStackNavigator}
