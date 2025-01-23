import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './components/LoadingScreen'

const Stack = createStackNavigator()

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 3000) // 3 seconds
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
