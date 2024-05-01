import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import TransactionActivity from "../../components/TransactionActivity"
import TransactionActivity1 from '../../components/TransactionActivity1';
import { useFonts } from 'expo-font';







const Transaction = () => {

    let [fontsLoaded] = useFonts({
        
        'Lato-Regular': require('../../assets/Fonts/Lato-Regular.ttf'),
        'Lato-Bold': require('../../assets/Fonts//Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts//Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts//Lato/Lato-Black.ttf'),
    
      });
    
      if (!fontsLoaded) {
        return null;
      }


    return (

        <ScrollView style={styles.feedcontainer}>

            <Header />

            <View style={styles.line} />
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <View >
                    <Text style={styles.feedtitre}>
                        Hello Anis
                    </Text>
                    <Text style={styles.simpleText}>@anisgh</Text>
                </View>
                <TouchableOpacity style={styles.userContainer} >
                    <View style={styles.userBorder}>
                        <Icon name="plus" size={30} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:"center"}}>
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardtext1}>New Orders</Text>
                    <Text style={styles.cardtext2}> 157 </Text>
                    <Text style={styles.cardtext1}>vs. 178 last period</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardtext1}>New Orders Revenue</Text>
                    <Text style={styles.cardtext2}> $1576.65 </Text>
                    <Text style={styles.cardtext1}>vs. 12 last period</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardtext1}>Avg. Orders Revenue</Text>
                    <Text style={styles.cardtext2}> $789.99 </Text>
                    <Text style={styles.cardtext1}>vs. 12 last period</Text>
                </TouchableOpacity>
            </View>


            <View style={{ paddingTop: 40 }}>
                <Text style={styles.feedtitre}>
                    Transaction Activity
                </Text>
            </View>
            <View style={{ paddingTop: 15 }}>
                <View style={styles.inputContainer}>

                    <TouchableOpacity style={styles.input}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >

                            <Image
                                source={require('../../assets/icons/search.png')}
                                style={{ width: 20, height: 20, marginLeft: 40, marginTop: 10 }} />
                            <TextInput style={styles.inputactivity}
                                placeholder="Search by name">
                            </TextInput>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal>
                <View style={{ flexDirection: "column" }}>

                    <TransactionActivity1 />
                    <TransactionActivity />
                    <TransactionActivity />
                    <TransactionActivity />
                    <TransactionActivity />
                    <TransactionActivity />
                    <TransactionActivity />
                    <TransactionActivity />
                    <TransactionActivity />
                    <TransactionActivity />

                </View>



            </ScrollView>

        </ScrollView >








    )
}
const styles = StyleSheet.create({

    feedcontainer: {
        flex: 1,
        backgroundColor: "white"
    },

    feedtitre: {

        fontSize: 30,
        color: 'black',
        paddingTop: 5,
        marginLeft: 15,
        fontFamily:'Lato-Regular'


    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: "100%",
        marginBottom: 15,
        alignSelf: "center"
    },
    simpleText: {

        fontSize: 17,
        color: 'black',
        marginLeft: 15,
        marginTop: 5,
        fontFamily:'Lato-Regular'

    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },

    userContainer: {
        paddingRight: 15,
        paddingTop: 15,

    },
    userBorder: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 60,
        padding: 4,

    },

    card: {
        height: 170,
        width: 380,
        elevation: 2, // Adjust the elevation value as needed
        backgroundColor: '#FFFFFF', // Set a background color if needed
        marginTop: 25,
        borderRadius: 15,
        justifyContent:'center',
        paddingHorizontal:20
    },
    cardtext2: {
        fontSize: 24,
        color: 'black',
        margin: 10,
        fontFamily:'Lato-Regular'

    },

    cardtext1: {
        fontSize: 18,
        color: 'black',
        margin: 10,
        fontFamily:'Lato-Regular'

    },
    inputContainer:{
        alignItems:"center"
    },
    input: {
        height: 40,
        width: "95%",
        elevation: 2,
        backgroundColor: '#FFFFFF',
        marginTop: 25,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: 'center'
    },
    inputactivity: {
        paddingLeft: 20,
        borderRadius: 4,
        width: "100%",
        height: 40,

    },



});

export default Transaction;