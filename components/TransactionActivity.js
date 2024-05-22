import { View, Text, StyleSheet, Image, } from 'react-native'
import React, { useEffect } from 'react'
import { CheckBox } from 'react-native-elements';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import axios from 'axios';

const TransactionActivity = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [reservation, setReservation] = useState(null);


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                const user = JSON.parse(userData);
                const userId = user.id;
                console.log(userId);
                
                const response = await axios.get(`${BASE_URL}api/Reservation/user/${userId}`);
                setReservation(response.data);
                console.log(response.data); // Log the fetched data
            } catch (error) {
                console.log('Error fetching reservations:', error); // Log the error object for details
            }
        };
        
        fetchReservation(); // Call the function inside useEffect
    }, [userId]); 

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
                checked={isChecked}
                onPress={handleCheckboxChange}
                containerStyle={styles.checkboxContainer}
                checkedIcon={<Icon name="check-square" size={20} color={"black"} />}
                uncheckedIcon={<Icon name="square" size={20} color={"grey"} />}
            />

            <Text style={{ width: 90 }}>1045</Text>
            <Text style={{ width: 120 }}>Sun Mar 11 2024</Text>
            <Text style={{ width: 70 }}>Received</Text>

            <View style={styles.logoContainer}>
                <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={require('../assets/image/profilepic.png')} />

                <Text>name client</Text>
            </View>
            
            <Text style={{ width: 120 }}>Sun Mar 11 2024</Text>
            <Text style={{ width: 70 }}>$229.99</Text>

        </View>

    )
}
const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop: 20,
        flexDirection: "row",
        width: 160
    },

})

export default TransactionActivity