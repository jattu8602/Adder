import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Swiper from 'react-native-swiper'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const FullScreenView = ({ visible, images, currentIndex, onClose }) => {
  if (!visible) return null

  return (
    <View style={styles.fullScreenContainer}>
      <Swiper
        index={currentIndex}
        loop={false}
        showsPagination={true}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {images.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.uri }} style={styles.fullScreenImage} />
          </View>
        ))}
      </Swiper>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#0000FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
})

export default FullScreenView
