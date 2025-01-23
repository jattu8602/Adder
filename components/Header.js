import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Guest User</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0000FF',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
})

export default Header
