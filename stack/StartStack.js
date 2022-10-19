import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../login'
import Home from '../home'

const Stack = createStackNavigator()

const login = "Login"
const home = "Home"


const Start = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={home} component={Home} />
        <Stack.Screen name={login} component={Login} />
        
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Start