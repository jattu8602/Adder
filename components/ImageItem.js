import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ImageItem = ({
  item,
  index,
  onStarPress,
  onDeletePress,
  onImagePress,
}) => {
  console.log('Image URI:', item.uri) // Debugging

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => onImagePress(index)}>
        <Image source={{ uri: item.uri }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.imageActions}>
        <TouchableOpacity onPress={() => onStarPress(index)}>
          <Ionicons
            name={item.starred ? 'star' : 'star-outline'}
            size={24}
            color={item.starred ? '#FFD700' : '#000000'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeletePress(index)}>
          <Ionicons name="trash-outline" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: 8,
    width: '45%', // Fixed width for 2-column grid
    aspectRatio: 1, // Ensure square containers
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover', // Ensure the image fits within the container
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  dateText: {
    marginTop: 8,
    color: '#000000',
    fontSize: 14,
  },
})

export default ImageItem
