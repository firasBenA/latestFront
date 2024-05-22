import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons from Expo

const Favorite = ({onSave}) => {
    const [heartColor, setHeartColor] = useState('#F5F5F5');
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleHeartColor = () => {
        const newColor = heartColor === '#F5F5F5' ? 'red' : '#F5F5F5';
        setHeartColor(newColor);
    };

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
        onSave(isFavorited); // Notify parent component about the change in favorite status
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleFavorite}>
                <FontAwesome name="heart" size={28} color={isFavorited ? 'red' : '#F5F5F5'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Favorite;