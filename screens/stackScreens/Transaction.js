import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { useFonts } from 'expo-font';
import Header from '../../components/Header';

const TransactionActivity = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [boats, setBoats] = useState({});
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts//Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts//Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts//Lato/Lato-Black.ttf'),

    });
    if (!fontsLoaded) {
        return null;
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {


        const fetchBoats = async (boatId) => {
            try {
                const response = await axios.get(`${BASE_URL}api/Boat/boat/${boatId}`);
                setBoats({ ...boats, [boatId]: response.data });
            } catch (error) {
                console.error('Error fetching boats:', error);
            }
        };

        const fetchReservation = async () => {
            try {

                const userData = await AsyncStorage.getItem('user');
                const user = JSON.parse(userData);
                setUserId(user.id);

                const response = await axios.get(`${BASE_URL}api/Reservation/user/${user.id}`);
                setReservations(response.data);
                response.data.forEach((reservation) => fetchBoats(reservation.idBoat));
                console.log(response.data)
            } catch (error) {
                console.log('Error fetching reservations:', error);
            }
        };

        fetchReservation();
    }, []);

    return (
        <ScrollView style={styles.scrollView} >
            <Header/>
            <View style={styles.container}>
                <Text style={[styles.id, { fontFamily: 'Lato-Bold' }]}>ID</Text>

                <View style={{ flexDirection: 'column', width: "50%" }}>
                    <Text style={[styles.date, { fontFamily: 'Lato-Bold' }]}>DATE</Text>
                </View>

                <Text style={[styles.boatName, { fontFamily: 'Lato-Bold' }]}>BOAT</Text>
                <Text style={[styles.price, { fontFamily: 'Lato-Bold' }]}>PRICE</Text>
            </View>
            {reservations.map((reservation) => (
                <View key={reservation.id} style={styles.container}>
                    <Text style={styles.id}>{reservation.id}</Text>

                    <View style={{ flexDirection: 'column', width: "50%" }}>
                        <Text style={styles.date}>date Debut : {reservation.dateDebut}</Text>
                        <Text style={styles.date}>date Fin :{reservation.dateFin}</Text>
                    </View>

                    <Text style={styles.boatName}>{boats[reservation.idBoat]?.name}</Text>
                    <Text style={styles.price}>${reservation.prixTotale}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor:"white"
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    checkboxContainer: {
        marginRight: 10,
    },
    id: {
        width: "8%",
        marginRight: 10,
        fontFamily: 'Lato-Regular'

    },
    name: {
        width: "10%",
        fontFamily: 'Lato-Regular'

    },
    date: {
        fontFamily: 'Lato-Regular'
    },
    boatName: {
        fontFamily: 'Lato-Regular',
        width: "20%",
    },
    price: {
        width: "14%",
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 10,
    },
});

export default TransactionActivity;
