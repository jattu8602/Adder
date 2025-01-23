import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ImageItem from './ImageItem'

const ImageGrid = ({ images, onStarPress, onDeletePress, onImagePress }) => {
  console.log('Images in ImageGrid:', images) // Debugging

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ImageItem
          item={item}
          index={index}
          onStarPress={onStarPress}
          onDeletePress={onDeletePress}
          onImagePress={onImagePress}
        />
      )}
      numColumns={2} // Display images in 2 columns
      contentContainerStyle={styles.flatListContent} // Add this style
    />
  )
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 8, // Add padding to the sides
  },
})

export default ImageGrid
