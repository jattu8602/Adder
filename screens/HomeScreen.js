import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swiper from 'react-native-swiper' // Use react-native-swiper instead

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const HomeScreen = () => {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Request media library permissions
  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Sorry, we need media library permissions to make this work!'
        )
      }
    })()
  }, [])

  // Load images from local storage when the app starts
  useEffect(() => {
    loadImages()
  }, [])

  // Load images from local storage
  const loadImages = async () => {
    const storedImages = await AsyncStorage.getItem('images')
    if (storedImages) setImages(JSON.parse(storedImages))
  }

  // Save images to local storage
  const saveImages = async (newImages) => {
    await AsyncStorage.setItem('images', JSON.stringify(newImages))
  }

  // Open image picker and allow user to select a full photo
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      })

      console.log('ImagePicker result:', result)

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri)
        setShowPreview(true)
      } else {
        console.log('Image selection canceled or no assets found.')
      }
    } catch (error) {
      console.error('Error picking image:', error)
    }
  }

  // Save the selected image to local storage
  const handleSave = async () => {
    if (selectedImage) {
      const newImage = {
        uri: selectedImage,
        date: new Date().toLocaleDateString(),
      }
      const updatedImages = [newImage, ...images]
      setImages(updatedImages)
      await saveImages(updatedImages)
      setSelectedImage(null)
      setShowPreview(false)
    }
  }

  // Cancel the preview and clear the selected image
  const handleCancel = () => {
    setSelectedImage(null)
    setShowPreview(false)
  }

  // Open full-screen image viewer
  const openFullScreen = (index) => {
    setCurrentIndex(index)
    setShowFullScreen(true)
  }

  // Close full-screen image viewer
  const closeFullScreen = () => {
    setShowFullScreen(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Guest User</Text>
      </View>

      {/* + Button to upload image */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>

      {/* Preview Section */}
      {showPreview && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          <View style={styles.previewButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* List of uploaded images */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openFullScreen(index)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.image} />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Full-screen image viewer */}
      <Modal visible={showFullScreen} transparent={true}>
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
                <Image
                  source={{ uri: item.uri }}
                  style={styles.fullScreenImage}
                />
              </View>
            ))}
          </Swiper>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFullScreen}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
  uploadButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0000FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  plusSign: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  previewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  previewImage: {
    width: '90%',
    height: '70%',
    borderRadius: 8,
  },
  previewButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  imageContainer: {
    margin: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  dateText: {
    marginTop: 8,
    color: '#000000',
    fontSize: 14,
  },
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

export default HomeScreen
