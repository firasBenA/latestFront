import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const QuantitySelector = ({ value, onChangeText }) => {

    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../assets/Fonts/Lato/Lato-Black.ttf'),
      });
    
    const [quantity, setQuantity] = useState(value || 1); // Initial quantity

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        onChangeText(quantity + 1); // Update the parent component's value
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            onChangeText(quantity - 1); // Update the parent component's value
        }
    };

    return (
        <View
            style={styles.container}
        >
            <View style={{ flexDirection: "row" }}>
                <Text style={{fontSize:18}}>$</Text>
                <TextInput
                    style={styles.inputText}
                    value={quantity.toString()}
                    onChangeText={text => {
                        setQuantity(parseInt(text) || 0); // Update local state
                        onChangeText(parseInt(text) || 0); // Update the parent component's value
                    }}
                    keyboardType="numeric"
                />
                <Text style={{ fontSize: 18, alignSelf: "center", paddingHorizontal: 5 ,fontFamily:"Lato-Regular"}}> per day</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                    <Image source={require("../assets/icons/plus.png")} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                    <Image source={require("../assets/icons/minus.png")} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 12,
        marginTop: 20,
        borderRadius: 12
    },
    inputText: {
        fontSize: 30,
        fontFamily:"Lato-Bold"

    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QuantitySelector;
