import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Slider } from 'react-native'
import { Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import { useFonts } from 'expo-font';
import { SliderBox } from 'react-native-image-slider-box';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import Favorite from './Favorite';
import Icon from 'react-native-vector-icons/Feather';


//////
const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 10;
const CARD_HEIGHT = 300;
///////


const Card = ({ title, imageUrl, description, city, capacity, nbrCabins, nbrBedrooms, boatId, country, price, showIcon }) => {

  /*const [boats, setBoats] = useState([]);

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
  }, []);*/

  const [isCardFavorited, setIsCardFavorited] = useState(false);
  const handleSaveCard = (isFavorited) => {
    setIsCardFavorited(isFavorited);
    // Here you can save the card data or perform any other action based on favorite status
  };

  let [fontsLoaded] = useFonts({

    'Lato-Bold': require('../assets/Fonts//Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../assets/Fonts//Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../assets/Fonts//Lato/Lato-Black.ttf'),


  });


  /////


  const [rating, setRating] = useState(4);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  if (!fontsLoaded) {
    return null;
  }

  /*<SliderBox
                        images={item.images} // Pass the array of images directly to SliderBox
                        autoplay={false}
                        circleLoop={true}
                        sliderBoxHeight={250}
                        style={styles.image}
                      />*/
  const navigation = useNavigation();

  const goToSetting = () => {
    navigation.navigate('EditBoat',{boatId});
  };
  return (

    <View style={styles.containerCard}>
      <View style={styles.card}>
        <View style={styles.imageBox}>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
          <View style={styles.overlay}>
            <TouchableOpacity onPress={goToSetting} style={[styles.touchable, { zIndex: 999999 }]}>
              {showIcon && (
                <Icon name="settings" size={30} style={styles.Editicon} />
              )}
            </TouchableOpacity>
            <Favorite style={styles.heartIcon} onSave={handleSaveCard} />
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>{description}</Text>
          <Text style={styles.place}>{city}, {country}</Text>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.avg}>A partire de </Text>
              <Text style={styles.price}>{price}$</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <StarRating rating={rating} onRatingChange={handleRatingChange} style={styles.starIcon} />
              <Text style={{ marginRight: 10, paddingLeft: 5, fontSize: 16, fontWeight: "400" }}>(12)</Text>
            </View>
          </View>
        </View>
      </View>
    </View>

    /* <View style={styles.container}>

        <FlatList
          data={list}
          decelerationRate="fast"
          keyExtractor={i => i.id}
          renderItem={({ item, index }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <View style={styles.containerCard}>

                  <TouchableOpacity onPress={() => goTo(item)} >
                    <View style={[styles.card]}>

                      <View style={styles.imageBox}>
                        <Image source={item.images} style={styles.image} />

                        <View style={styles.overlay}>
                          <Favorite style={styles.heartIcon} />
                        </View>
                      </View>
                      <View style={styles.titleBox}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
                        <Text style={styles.place}>{item.location.ville},{item.location.pays}</Text>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: 10 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.price}>$</Text><Text style={styles.price}>{item.price}</Text><Text style={styles.avg}>avg/Day</Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <StarRating rating={rating} onRatingChange={handleRatingChange} style={styles.starIcon} />
                            <Text style={{ marginRight: 10, paddingLeft: 5, fontSize: 16, fontWeight: "400" }}>(12)</Text>
                          </View>
                        </View>
                      </View>

                    </View>
                  </TouchableOpacity>

                </View>
              </View>


            )
          }
          }
        />

      </View>
      */

    /*<View style={styles.container}>

        <FlatList
          data={boats}
          decelerationRate="fast"
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBoatItem}
        />

      </View>*/


  );

}



const styles = StyleSheet.create({
  container: {
  },

  containerCard: {
    paddingBottom: 20,
    alignItems: 'center',
    width: "100%"
  },
  card: {
    height: 420,
    width: CARD_WIDTH,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15
  },
  imageBox: {
    width: '100%',
    height: 250, // Adjust the height as needed
    borderRadius: 16,
    position: 'relative',

  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    resizeMode: 'cover', // Ensure the image fills its container entirely while maintaining its aspect ratio
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    padding: 15
  },
  heartIcon: {
    color: 'red',
    zIndex: 999,
  },
  Editicon: {
    
    color: 'white',
    margin: 5
  },
  touchable: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 999,
    margin:5
  },
  titleBox: {
    left: 8,
    paddingTop: 12
  },

  title: {
    fontSize: 16,
    color: "black",
    paddingVertical: 10,
    fontFamily: "Lato-Bold"


  },
  description: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
    paddingBottom: 4,
    fontFamily: 'Lato-Regular'
  },
  place: {
    fontSize: 16,
    color: "grey",
    fontWeight: "300",
    paddingBottom: 13,
    fontFamily: 'Lato-Regular'


  },
  price: {
    fontSize: 18,
    color: "black",
    fontFamily: 'Lato-Regular'


  },
  avg: {
    fontSize: 17,
    paddingLeft: 5,
    fontWeight: "300",
    color: "grey",
  },



});

export default Card