import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Google from 'expo-google-app-auth'
import auth from '@react-native-firebase/auth'

const LoginScreen = ({ navigation }) => {
  const signInWithGoogle = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      })

      if (type === 'success') {
        // Create a Firebase credential with the Google access token
        const credential = auth.GoogleAuthProvider.credential(null, accessToken)

        // Sign in to Firebase with the credential
        await auth().signInWithCredential(credential)

        // Navigate to the Home screen
        navigation.navigate('Home')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FF',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
  googleButtonText: {
    color: '#000000',
    fontSize: 16,
  },
})

export default LoginScreen
