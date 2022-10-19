import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/Login'
import Index from './src/Index'

const Stack = createStackNavigator()

const login = "Login"
const index = "Index"


const Start = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={login} component={Login} />
        <Stack.Screen name={index} component={Index} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Start