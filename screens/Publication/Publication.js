
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useFonts } from 'expo-font';
import Header from '../../components/Header';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';







const Publication = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [boats, setBoats] = useState(null);
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();
  const { boatId, userId } = useRoute().params;

  const [price, setPrice] = useState('');

  const [showCalendarBegin, setShowCalendarBegin] = useState(false);
  const [showCalendarEnd, setShowCalendarEnd] = useState(false);
  const [selectedDateBegin, setSelectedDateBegin] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');

  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
  });

  const openPhotos = () => {
    navigation.navigate('Photos');
  };

  const openProfile = (userId) => {
    console.log(userId)
    navigation.navigate('ProfileUser', { userId });
  };

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/Boat/boat/${boatId}`);
        setBoats(response.data);
        setPrice(response.data.price);
        setLoading(false)
        console.log('Boat data:', response.data);
      } catch (error) {
        console.error('Error fetching boats:', error);
      }
    };

    const fetchUser = async () => {
      console.log(userId)
      try {
        const response = await axios.get(`${BASE_URL}api/User/${userId}`);
        setUserAvatar(response.data.avatar);
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchBoats();
    fetchUser();
  }, [boatId, userId]);


  if (!boatId) {
    return <Text>No item found</Text>;
  }

  if (loading || !boats) {
    return (
      <View>
        <Header />
        <View style={{ justifyContent: "center", paddingTop: "50%" }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      </View>

    );
  }

  if (!fontsLoaded) {
    return null;
  }




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




  return (

    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View>
          {boats.imageUrl && <Image source={{ uri: `${BASE_URL}` + boats.imageUrl }} style={styles.image} />}
          <TouchableOpacity style={styles.overlay} onPress={openPhotos}>
            <Image source={require("../.././assets/icons/layers.png")} style={{ width: 16, height: 16 }} />
            <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "600" }}>View photos</Text>
          </TouchableOpacity>


        </View>
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.LocationText}>aaaaaa</Text>
            <Image source={require("../.././assets/icons/more.png")} style={{ width: 30, height: 30, marginRight: 15 }} />
          </View>

          <Text style={styles.textName}>{boats.name}</Text>
          <Text style={styles.simpleText}>{boats.capacity} Capacity . {boats.nbrCabins} Cabins . {boats.nbrBedrooms} Baths</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.itemContainer}>
          <Text style={styles.simpleText} >{boats.description}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.titleText}>On Board Equipment</Text>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", marginBottom: 30 }}>
              <View style={{ flexDirection: "row", alignItems: 'center', width: "50%" }}    >
                <Image
                  source={require('../.././assets/icons/pilot.png')} style={(styles.Icon)}></Image>
                <Text style={styles.Icontext}>Automatic Pilot</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row", alignItems: 'center', width: "50%" }} >
                  <Image
                    source={require('../.././assets/icons/shower.png')} style={(styles.Icon)}></Image>
                  <Text style={styles.Icontext}>Deck Shower</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 30 }}>
              <View style={{ flexDirection: "row", alignItems: 'center', width: "50%" }}    >
                <Image
                  source={require('../.././assets/icons/propeller.png')} style={(styles.Icon)}></Image>
                <Text style={styles.Icontext}>Outboard Motor</Text>
              </View>
              <View >
                <View style={{ flexDirection: "row", alignItems: 'center', width: "50%" }} >
                  <Image
                    source={require('../.././assets/icons/television.png')} style={(styles.Icon)}></Image>
                  <Text style={styles.Icontext}>TV</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 30, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: 'center', width: "50%" }}    >
                <Image
                  source={require('../.././assets/icons/location.png')} style={(styles.Icon)}></Image>
                <Text style={styles.Icontext}>GPS</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: 'center', width: "50%" }} >
                <Image source={require('../.././assets/icons/wifi.png')} style={(styles.Icon)}></Image>
                <Text style={styles.Icontext}>WIFI</Text>
              </View>
            </View>
          </View>

        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.titleText}>Specifications</Text>

          <View style={styles.specs}>
            <Text style={styles.simpleText}>Engine Torque</Text>
            <Text style={{ fontSize: 18, paddingTop: 5 }}>111 ft-lb</Text>
          </View>


          <View style={styles.specs}>
            <Text style={styles.simpleText}>Engine Torque</Text>
            <Text style={{ fontSize: 18, paddingTop: 5 }}>111 ft-lb</Text>
          </View>

          <View style={styles.specs}>
            <Text style={styles.simpleText}>Engine Torque</Text>
            <Text style={{ fontSize: 18, paddingTop: 5 }}>111 ft-lb</Text>
          </View>
          <View style={styles.specs}>
            <Text style={styles.simpleText}>Engine Torque</Text>
            <Text style={{ fontSize: 18, paddingTop: 5 }}>111 ft-lb</Text>
          </View>

        </View>

        <View style={styles.itemContainer}>

          <Text style={styles.titleText}>Owner Info</Text>
          <View style={{ flexDirection: "column" }} >
            <View>
              <TouchableOpacity onPress={() => openProfile(boats.userId)} style={{ flexDirection: "row", marginTop: 10, marginBottom: 25 }}>
                {userAvatar && <Image source={{ uri: `${BASE_URL}` + userAvatar }} style={{ width: 70, height: 70, borderRadius: 50 }} />}
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, marginLeft: 15, paddingTop: 12 }}>{userName}</Text>
                  <Text style={{ fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 15, paddingTop: 4 }}>Rating</Text>
                </View>
              </TouchableOpacity>

            </View>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 17, marginLeft: 10, paddingBottom: 20 }}>Member since : Jan 2014</Text>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 17, marginLeft: 10, paddingBottom: 20 }}>Languages spoken: English & Italian</Text>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 17, marginLeft: 10, paddingBottom: 20 }}>Response rate: More than 85%</Text>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 17, marginLeft: 10, paddingBottom: 20 }}>Response time: Within an hour</Text>

            <TouchableOpacity style={styles.btn}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Send a message</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 20, height: 400 }}>
          <Text style={styles.titleText}>Location</Text>
          <Text style={{ fontSize: 18, fontFamily: "Lato-Regular", color: "grey" }}>Santa Maria Maggiore, Milazzo</Text>
          <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.PriceText}>${price} / night</Text>
          <Text style={styles.ReviewText}>4.5 ( 35 reviews )</Text>
        </View>
        <TouchableOpacity style={styles.reserverBtn} onPress={() => setModalVisible(true)}>
          <Text style={{ fontFamily: "Lato-Bold", fontSize: 16, color: "white", alignSelf: "center", paddingVertical: 15 }}>Reserve</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 15, right: 20 }}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', marginTop: 65, opacity: .5 }} />
          </View>
          <View style={{ paddingTop: 60, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Text style={{ fontFamily: 'Lato-Bold', fontSize: 22 }}>${price}</Text>
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18 }}> / night</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Icon name="star" size={22} color="black" style={{ marginRight: 10 }} />
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 16 }}>4.5 </Text>
              <Text style={{ fontFamily: 'Lato-Light', fontSize: 16 }}>( 35 reviews )</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>


                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleDatePressBegin}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, paddingBottom: 10 }}>Trip Start</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18, color: 'grey' }}>{selectedDateBegin || 'Add date'}</Text>
                  </View>
                </TouchableOpacity>

              </View>

              <View style={styles.cell}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleDatePressEnd}>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, paddingBottom: 10 }}>Trip End</Text>
                  <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18, color: 'grey' }}>{selectedDateEnd || 'Add date'}</Text>
                </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1 }]}>
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Option 1" value="option1" ></Picker.Item>
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
                </Picker>
              </View>
            </View>
          </View>

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
      

          <TouchableOpacity style={styles.modalReserverBtn}>
            <Text style={{ fontFamily: "Lato-Black", fontSize: 20, color: "white", alignSelf: "center", paddingVertical: 28 }}>RESERVE</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 100 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>${price} * 3 Nights</Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }}>$762</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>${price} * 3 Nights</Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }}>$762</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>${price} * 3 Nights</Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }}>$762</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', opacity: .8, marginBottom: 20 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>${price} * 3 Nights</Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: 'red' }}>$762</Text>
            </View>
          </View>

        </View>
      </Modal>





    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },


  image: {
    width: "100%",
    height: 250,
    resizeMode: 'cover'
  },

  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    bottom: 0,
    right: 0,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8
  },

  textContainer: {
    marginLeft: 15,
    marginTop: 20,
  },

  itemContainer: {
    marginHorizontal: 15,
    marginBottom: 30
  },
  LocationText: {
    fontSize: 16,
    color: 'black',
    paddingTop: 8,
    fontFamily: 'Lato-Regular'
  },

  textName: {
    fontSize: 28,
    color: 'black',
    fontWeight: "500",
    paddingTop: 8,
    fontFamily: 'Lato-Bold'

  },

  simpleText: {
    fontSize: 18,
    color: 'black',
    paddingTop: 8,
    fontFamily: 'Lato-Regular'
  },

  titleText: {
    fontSize: 18,
    color: 'black',
    paddingTop: 8,
    marginBottom: 20,
    fontFamily: 'Lato-Bold'
  },


  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    width: "95%",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center"
  },

  linetext: {

    fontSize: 25,
    color: 'black',
    marginLeft: 15,
  },

  Icon: {
    width: 35,
    height: 35,
    marginRight: 20
  },

  Icontext: {
    marginRight: 20,
    fontFamily: "Lato-Regular"

  },

  specs: {
    borderBottomWidth: 0.3,
    paddingBottom: 15,
    paddingLeft: 10,
    marginBottom: 15,
    borderColor: "grey"

  },

  smallText: {
    fontWeight: "300",
    fontSize: 16,
    color: "grey"
  },

  btn: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    elevation: 20,
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },

  PriceText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    paddingBottom: 8
  },

  ReviewText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
  },

  reserverBtn: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderRadius: 10,
    height: "60%",
    width: "30%"

  },
  modalReserverBtn: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderRadius: 12,
    height: 90,
    width: "100%"

  },

  table: {
    marginTop: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDD',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDD',
  },
  cell: {
    flex: 1,
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#DDDDD',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 16,
  },




})


export default Publication;