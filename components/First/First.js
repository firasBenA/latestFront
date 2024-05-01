import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Modal, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { Calendar } from 'react-native-calendars';

const HomeScreen = () => {
    const [showCalendarBegin, setShowCalendarBegin] = useState(false);
    const [showCalendarEnd, setShowCalendarEnd] = useState(false);
    const [selectedDateBegin, setSelectedDateBegin] = useState('');
    const [selectedDateEnd, setSelectedDateEnd] = useState('');

    const handleDatePressBegin = () => {
        setShowCalendarBegin(true);
    };

    const handleDatePressEnd = () => {
        setShowCalendarEnd(true);
    };

    const handleDayPressBegin = (day) => {
        setSelectedDateBegin(day.dateString);
        setShowCalendarBegin(false);
    };

    const handleDayPressEnd = (day) => {
        setSelectedDateEnd(day.dateString);
        setShowCalendarEnd(false);
    };

    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'), // Corrected file path
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'), // Corrected file path
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'), // Corrected file path
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    source={require('../../assets/image/backImg.jpeg')}
                    style={styles.backgroundImage}
                >
                    <View style={styles.whiteContainer}>
                        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Text style={styles.topText}>DISCOVER THE NEW WORLD</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.inputContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="map-pin" size={22} color="black" style={styles.icon} />
                                    <TextInput placeholder="Location" placeholderTextColor="black" style={{ paddingTop: 5, paddingHorizontal: 18, fontSize: 16, fontFamily: 'Lato-Regular' }} />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleDatePressBegin}>
                                    <Icon name="calendar" size={22} color="black" style={styles.icon} />
                                    <View style={{ flexDirection: "column" }}>
                                        <Text style={{ marginLeft: 22, fontSize: 14, fontFamily: 'Lato-Regular' }}>Departure</Text>
                                        <Text style={{ marginLeft: 22, fontSize: 16 , fontFamily: 'Lato-Bold'}}>{selectedDateBegin || 'Debarture'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleDatePressEnd}>
                                    <Icon name="calendar" size={22} color="black" style={styles.icon} />
                                    <View style={{ flexDirection: "column" }}>
                                        <Text style={{ marginLeft: 22, fontSize: 14, fontFamily: 'Lato-Regular' }}>Arrival</Text>
                                        <Text style={{ marginLeft: 22, fontSize: 16 , fontFamily: 'Lato-Bold'}}>{selectedDateEnd || 'Select End Date'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text style={styles.buttontext}>SUBMIT </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                {showCalendarBegin && (
                    <Calendar
                        // Set initial date
                        current={'2024-04-29'}
                        // Handler which gets executed on day press
                        onDayPress={handleDayPressBegin}
                    />
                )}

                {showCalendarEnd && (
                    <Calendar
                        // Set initial date
                        current={'2024-04-29'}
                        // Handler which gets executed on day press
                        onDayPress={handleDayPressEnd}
                    />
                )}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: "100%",
        height: 650,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: 'cover',
    },
    whiteContainer: {
        marginTop: 40,
        backgroundColor: "white",
        width: "89%",
        height: 380,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    topText: {
        fontSize: 20,
        color: '#333',
        paddingTop: 8,
        textAlign: "center",
        fontFamily: 'Lato-Black',
        lineHeight: 20 * 1.5,
    },
    inputContainer: {
        marginBottom: 12,
        borderWidth: .5,
        borderColor: 'grey',
        borderRadius: 12,
        width: "87%",
        height: 60,
        padding: 10,
    },
    icon: {
        marginLeft: 10,
        marginTop: 10
    },
    buttonContainer: {
        backgroundColor: 'black',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5,
        width: "87%",
        height: 60
    },
    buttontext: {
        color: "white",
        fontFamily: "Lato-Bold"
    },
    centredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'grey',
        width: '90%',
        padding: 15,
        justifyContent: "center",
        alignItems: 'center',
        shadowColor: '#000',
    }
});

export default HomeScreen;
