import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import First from '../../components/First/First';
import DestinationContainer from '../../components/DestinationContainer';
import Card from '../../components/Card';
import ViewBoats from '../../components/ViewBoats';
import axios from 'axios'; // Assuming you're using axios for API requests
import { BASE_URL } from '../../config';
import { BOATS } from '../../Data/index';
import { useFonts } from 'expo-font';
import Commentaire from '../../components/Commentaire';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [boats, setBoats] = useState([]);

  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing to true
    await fetchBoats(); // Fetch boats again
    setRefreshing(false); // Set refreshing to false when done
  };

  const fetchBoats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/Boat`);
      setBoats(response.data);
    } catch (error) {
      console.error('Error fetching boats:', error);
    }
  };

  useEffect(() => {
    fetchBoats();
  }, []);


  const handleCardPress = async (boat) => {

    const { id: boatId, userId } = boat;
    navigation.navigate('Publication', { boatId, userId });

  };


  return (
    <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "white" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <Header />
      <First />
      <DestinationContainer />
      <View style={{ marginTop: 70 }}>
        <Text style={styles.bigText}>Top Boat Rentals</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.smallText}>Unsatiable It Considered Invitation He Traveling</Text>
          <Text style={{ fontSize: 14, fontWeight: 'normal', marginTop: 10, textDecorationLine: 'underline', color: "grey", width: "30%", paddingLeft: 20 }}>See More</Text>
        </View>
      </View>
      {boats.slice(0, 5).map((boat) => (
        <TouchableOpacity onPress={() => handleCardPress(boat)}>

          <Card
            key={boat.id}
            boatId={boat.id}
            title="3 - 8 hours * No Captain"
            imageUrl={`${BASE_URL}${boat.imageUrl}`}
            description={boat.description}
            userId={boat.userId}
            capacity={boat.capacity}
            nbrCabins={boat.nbrCabins}
            nbrBedrooms={boat.nbrBedrooms}
            price={boat.price}

          />
        </TouchableOpacity>

      ))}

      <ViewBoats />
      <Commentaire />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
    marginLeft: 12,
    marginBottom: 5,
    fontFamily: 'Lato-Bold'
  },
  smallText: {
    fontSize: 14,
    paddingBottom: 5,
    marginLeft: 12,
    marginBottom: 20,
    opacity: .8,
    width: "70%",
    fontFamily: "Lato-Regular"
  },
});
