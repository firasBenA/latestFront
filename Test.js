import React, { useState } from 'react';
import { View, Button, Image, Alert, TextInput } from 'react-native'; // Import TextInput
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { launchImageLibraryAsync } from 'expo-image-picker';

const BASE_URL = 'https://b5c7-197-0-153-150.ngrok-free.app/';

export default function App() {
  const [ImageUrl, setImageUrl] = useState(null);
  const [Name, setName] = useState('');

  const selectImage = async () => {
    const options = {
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    };
    const result = await launchImageLibraryAsync(options);

    if (!result.cancelled) {
      setImageUrl(result.assets[0].uri); // Set the selected image data
      console.log(result.assets[0].uri)
    }

  };

  const uploadImage = async () => {
    // Check if an image is selected
    if (!ImageUrl) {
      Alert.alert('Error', 'Please select an image before uploading.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: ImageUrl,
        name: 'boatImage.jpg',
        type: 'image/jpeg',
      });

      const boatResponse = await axios.post(`${BASE_URL}uploadImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded:', boatResponse.data);
      Alert.alert('Success', 'Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Code to display UI elements like buttons, image picker, etc. */}
      <Button title="Select Image" onPress={selectImage} />
      {/* Code to display selected image if needed */}
      {ImageUrl && <Image source={{ uri: ImageUrl }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      {/* TextInput for entering boat name */}
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: 20 }}
        onChangeText={(text) => setName(text)}
        placeholder="Enter boat name"
        value={Name}
      />
      {/* Button to trigger image upload */}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}