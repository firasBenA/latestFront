import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for this project
import axios from 'axios';
import { BASE_URL } from './config';

const FeedbackComponent = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    
    useEffect(() => {
        fetchAverageRating();
    }, []);

    const fetchAverageRating = async () => {
        try {
            const response = await axios.get(`${BASE_URL}api/Feedback/average`);
            setAverageRating(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleRating = (value) => {
        setRating(value);
    };

    const submitFeedback = async () => {
        try {
            const response = await axios.post(`${BASE_URL}api/Feedback`, {
                rating: rating,
                comment: comment
            });
            console.log(response.data);
            setRating(0);
            setComment('');
            fetchAverageRating(); // Update average rating after submission
        } catch (error) {
            console.error(error);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => handleRating(i)}>
                    <Ionicons
                        name={i <= rating ? 'star' : 'star-outline'}
                        size={30}
                        color={i <= rating ? 'gold' : 'grey'}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }}>
                Average Rating: {averageRating ? averageRating.toFixed(1) : 'N/A'}
            </Text>
            <Text>Select a Rating:</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {renderStars()}
            </View>
            <Text style={{ marginTop: 20 }}>Enter Comment:</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: 'grey', padding: 10, marginTop: 10 }}
                placeholder="Enter Comment"
                value={comment}
                onChangeText={setComment}
                multiline
            />
            <Button title="Submit Feedback" onPress={submitFeedback} />
        </View>
    );
};

export default FeedbackComponent;
