import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo, you can replace with your preferred icon library

const StarRating = ({ rating, onRatingChange }) => {
  const [filledStars, setFilledStars] = useState(rating);

  const handleStarPress = (starPosition) => {
    setFilledStars(starPosition);
    onRatingChange(starPosition);
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((starPosition) => (
        <TouchableOpacity
          key={starPosition}
          onPress={() => handleStarPress(starPosition)}
          activeOpacity={0.7}
        >
          <Image
            source={filledStars >= starPosition ? require('../assets/icons/starFilled.png') : require('../assets/icons/star.png')}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 18,
    height: 18,
    marginHorizontal:3 ,
  },
  
});

export default StarRating;
