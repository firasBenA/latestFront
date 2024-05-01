import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BASE_URL } from './config';

const UploadImageExample = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUrl(result.uri); // Set the selected image URI
        }
    };

    const uploadImage = async () => {
        if (!imageUrl) {
            Alert.alert('Error', 'Please select an image before uploading.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUrl,
                name: 'boatImage.jpg',
                type: 'image/jpeg',
            });

            const response = await axios.post(`${BASE_URL}uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Success', 'Image uploaded successfully.');
            console.log('Image uploaded:', response.data.imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Select Image" onPress={selectImage} />
            {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, marginTop: 20 }} />}
            {imageUrl && <Button title="Upload Image" onPress={uploadImage} />}
        </View>
    );
};

export default UploadImageExample;
