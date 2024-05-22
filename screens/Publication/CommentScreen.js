import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingModal from './RatingModal'; // Import the RatingModal component

const Comment = ({ comment, text, time,rating }) => {

    const { user } = comment;

    if (!user || !user.avatar) {
        return <Text>Error: User data not available</Text>;
    }

    

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                    <Icon
                        name={i <= rating ? 'star' : 'star-o'}
                        size={30}
                        color={i <= rating ? 'black' : 'grey'}
                    />
            );
        }
        return stars;
    };

    return (
        <View style={styles.commentContainer}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: `${BASE_URL}` + user.avatar }} style={styles.profileImage} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.profileName, { marginBottom: 8 }]}>{user.name}</Text>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                        {renderStars()}
                    </View>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, left: 20 }}>San Diago ,CA</Text>
                </View>
            </View>
            <Text style={styles.commentText}>{comment.comment}</Text>
            <Text style={styles.commentTime}>{time}</Text>
        </View>
    );
};

const CommentScreen = ({ boatId }) => {
    const [comments, setComments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [newComment, setNewComment] = useState('');

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleModalSubmit = async (rating, comment) => {
        const userDataString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userDataString);
        const IdUser = user.id;

        try {
            const response = await axios.post(`${BASE_URL}api/Feedback`, {
                rating: rating,
                comment: comment,
                IdUser: IdUser,
                IdBoat: boatId,
            });
            console.log(response.data);
            setRating(0);
            setNewComment('');
            toggleModal(); // Close the modal after submission
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`${BASE_URL}api/Feedback/ByBoatId/${boatId}`);
                setComments(response.data);

                // Fetch user data for each comment's userId
                const userIds = response.data.map(comment => comment.idUser);
                const uniqueUserIds = [...new Set(userIds)]; // Get unique userIds

                const usersPromises = uniqueUserIds.map(async (userId) => {
                    const userResponse = await axios.get(`${BASE_URL}api/User/${userId}`);
                    return userResponse.data;
                });

                const usersData = await Promise.all(usersPromises);
                const usersMap = Object.fromEntries(usersData.map(user => [user.id, user]));

                // Update comments with user data
                const updatedComments = response.data.map(comment => ({
                    ...comment,
                    user: usersMap[comment.idUser],
                }));

                setComments(updatedComments);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, [boatId]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ScrollView style={styles.scrollView}>
                    {comments.map((comment, index) => (
                        <Comment key={index} comment={comment} text={comment.text} time={comment.time} rating={comment.rating}/>
                    ))}
                </ScrollView>

                {/* Button to open the modal */}
                <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                    <Text style={styles.modalButtonText}>Rate and Comment</Text>
                </TouchableOpacity>

                {/* Rating and comment modal */}
                <RatingModal
                    visible={isModalVisible}
                    onClose={toggleModal}
                    onSubmit={handleModalSubmit}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        height: '100%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 20,
    },
    scrollView: {
        flex: 1,
        marginBottom: 10,
    },
    commentContainer: {
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth: .5,
        color: "#DDDDD"
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
    },
    profileName: {
        fontFamily: 'Lato-Bold'
    },
    commentText: {
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'Lato-Regular'

    },
    time: {
        fontSize: 16,
        fontFamily: 'Lato-Regular'

    },
    commentTime: {
        alignSelf: 'flex-end',
        color: '#999',
    },
    modalButton: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
        alignSelf: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CommentScreen;
