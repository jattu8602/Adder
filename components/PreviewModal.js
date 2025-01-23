import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

const PreviewModal = ({ visible, imageUri, onSave, onCancel }) => {
  if (!visible) return null

  return (
    <View style={styles.previewContainer}>
      <Image source={{ uri: imageUri }} style={styles.previewImage} />
      <View style={styles.previewButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default PreviewModal
