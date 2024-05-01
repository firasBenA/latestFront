import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Image } from 'react-native-elements'
import Card from '../../components/Card'
import { BOATS } from '../../Data'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config';

const SearchScreen = () => {

    const [boats, setBoats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const goToFilter = () => {
        navigation.navigate('Filter');
    };

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
        <ScrollView style={styles.container} stickyHeaderIndices={[0]}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Header />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
            />
            <View style={styles.filterText}>
                <Text style={styles.smallText}>Showing 1 - 20 out of 2356 Products</Text>
                <Image source={require("../../assets/icons/filter.png")} style={styles.icon} onPress={goToFilter} />
            </View>
            {boats.map((boat) => (
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
        </ScrollView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

    filterText: {
        marginVertical: 40,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    smallText: {
        fontSize: 16,
    },

    icon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    filterIcon: {
        width: 20,
        height: 20,
    },
})