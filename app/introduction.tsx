import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';


export default function IntroductionScreen() {
  const handleGetStarted = () => {
    router.push('/face-upload');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
          <Image
            resizeMode='stretch'
            source={require('../assets/images/introduction.png')}
            style={styles.fashionImage}
            
          />
        
        
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Hi, I am your fashion advisor. Let's get you started with creating your mix & match fashion avatar.
          </Text>
          
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Image 
              source={require('../assets/images/Arrow right-circle.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  fashionImage: {
    
    width: 280,
    height: '60%',
    borderRadius: 20,
    alignSelf:"center",
    marginLeft:"5%"
  },
  textContainer: {
        paddingBottom: 10,
    borderWidth:1
  },
  welcomeText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#374151',
  
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  getStartedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    
  },
  arrowIcon: {
    width: 50,
    height: 50,
  },
});