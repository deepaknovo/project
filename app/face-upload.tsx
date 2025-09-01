import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

interface SelectedImage {
  uri: string;
  fileName: string;
  size: number;
}

interface StoredImage {
  id: string;
  uri: string;
  fileName: string;
  uploadDate: string;
  size: number;
}

export default function FaceUploadScreen() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant photo library access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setSelectedImage({
        uri: asset.uri,
        fileName: asset.fileName || 'face-image.jpg',
        size: asset.fileSize || 0,
      });
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera access');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setSelectedImage({
        uri: asset.uri,
        fileName: asset.fileName || 'selfie.jpg',
        size: asset.fileSize || 0,
      });
    }
  };

  const simulateUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);
    setUploadProgress(0);

    // Start button scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Reset and start progress animation
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Simulate realistic upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5 + 1;
      });
    }, 100);

    // Complete upload after 3 seconds
    setTimeout(() => {
      setUploading(false);
      clearInterval(interval);
      setUploadProgress(100);
      
      // Save image to gallery
      saveImageToGallery();
      
      // Navigate to success screen
      router.push('/success');
    }, 3000);
  };

  const saveImageToGallery = async () => {
    if (!selectedImage) return;

    try {
      const newImage: StoredImage = {
        id: Date.now().toString(),
        uri: selectedImage.uri,
        fileName: selectedImage.fileName,
        uploadDate: new Date().toISOString(),
        size: selectedImage.size,
      };

      const existingImages = await AsyncStorage.getItem('uploadedImages');
      const images = existingImages ? JSON.parse(existingImages) : [];
      images.push(newImage);
      
      await AsyncStorage.setItem('uploadedImages', JSON.stringify(images));
    } catch (error) {
      console.error('Error saving image to gallery:', error);
    }
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setUploading(false);
    setUploadProgress(0);
    progressAnim.setValue(0);
    scaleAnim.setValue(1);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Let's add a Photo</Text>
        {selectedImage && (
          <TouchableOpacity style={styles.closeButton} onPress={resetUpload}>
            <X size={24} color="#000000" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {!selectedImage ? (
          <View style={styles.uploadArea}>
            <View style={styles.uploadOptions}>
              <TouchableOpacity 
                style={styles.uploadButton} 
                onPress={pickImageFromGallery}>
                <View style={styles.buttonIcon}>
                  <ImageIcon size={32} color="#000000" />
                </View>
                <Text style={styles.buttonText}>From Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={takePhotoWithCamera}>
                <View style={styles.buttonIcon}>
                  <Camera size={32} color="#000000" />
                </View>
                <Text style={styles.buttonText}>Take a selfie</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <View style={styles.imagePreview}>
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.previewImage}
              />
            </View>

            {/* <View style={styles.imageInfo}>
              <Text style={styles.fileName}>{selectedImage.fileName}</Text>
              <Text style={styles.fileSize}>
                {formatFileSize(selectedImage.size)}
              </Text>
            </View> */}

            {uploading && (
              <View style={styles.progressContainer}>
                <Text style={styles.progressTitle}>Uploading your photo...</Text>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <Animated.View
                      style={[
                        styles.progressFill,
                        {
                          width: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          }),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressPercentage}>
                    {Math.min(Math.round(uploadProgress), 100)}%
                  </Text>
                </View>
                <View style={styles.progressSteps}>
                  <View style={styles.progressStep}>
                    <View style={[styles.stepDot, styles.activeStep]} />
                    <Text style={styles.stepText}>Processing</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={styles.progressStep}>
                    <View style={[
                      styles.stepDot, 
                      uploadProgress > 50 && styles.activeStep
                    ]} />
                    <Text style={styles.stepText}>Analyzing</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={styles.progressStep}>
                    <View style={[
                      styles.stepDot, 
                      uploadProgress >= 100 && styles.activeStep
                    ]} />
                    <Text style={styles.stepText}>Complete</Text>
                  </View>
                </View>
              </View>
            )}

            
          </View>
        )} 
        {!uploading && selectedImage && (
              <Animated.View style={[styles.uploadButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
                <TouchableOpacity
                  style={styles.uploadActionButton}
                  onPress={simulateUpload}>
                  <Text style={styles.uploadActionText}>UPLOAD</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadArea: {
    alignItems: 'center',
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  uploadButton: {
    alignItems: 'center',
    gap: 16,
  },
  buttonIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor:'GREEN',
    borderWidth:2,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    width: screenWidth - 80,
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 24,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: '#8B5CF6',
  },
  stepText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  uploadButtonContainer: {
    position: 'absolute',
    bottom: "5%",
    alignSelf:"center",
    width:"90%"
  },
  uploadActionButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  uploadActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    textAlign: 'center',
  },
});