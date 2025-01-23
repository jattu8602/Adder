import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/logo.png')} // Path to your animation JSON
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FF', // Blue background
  },
  animation: {
    width: 200,
    height: 200,
  },
})

export default LoadingScreen
