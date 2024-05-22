import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView ,StatusBar} from 'react-native';
import Header from '../components/Header';

const UserProfile = ({ user, onBlock, onConfirm }) => {
    return (


        <View style={styles.profileContainer}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userInfo}>
                <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={onBlock}>
                    <Text style={styles.buttonText}>Bloquer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                    <Text style={[styles.buttonText, styles.confirmButtonText]}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const GestionUtilisateur = () => {
    const users = [
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', avatar: require('../assets/Logo.png') },
        { id: '2', firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', avatar: require('../assets/icon.png') },
        { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', avatar: require('../assets/icons/facebook.png') },
        { id: '4', firstName: 'kesy', lastName: 'bar', email: 'kesy@example.com', avatar: require('../assets/icons/google.png') },
        { id: '5', firstName: 'top', lastName: 'gess', email: 'top@example.com', avatar: require('../assets/icons/dollar.png') },
        { id: '6', firstName: 'filip', lastName: 'moris', email: 'filip@example.com', avatar: require('../assets/icons/pilot.png') },
        { id: '7', firstName: 'barak', lastName: 'kiev', email: 'barak@example.com', avatar: require('../assets/icons/profile.png') },
        { id: '8', firstName: 'douce', lastName: 'ka', email: 'douce@example.com', avatar: require('../assets/icons/wifi.png') },
        { id: '9', firstName: 'bouuu', lastName: 'ouuub', email: 'bouuu@example.com', avatar: require('../assets/splash.png') },
        // Ajoutez les autres utilisateurs avec leurs données ici
    ];

    const handleBlock = (userId) => {
        console.log(`Utilisateur ${userId} bloqué`);
    };

    const handleConfirm = (userId) => {
        console.log(`Utilisateur ${userId} confirmé`);
    };

    const renderUserProfile = ({ item }) => (
        <UserProfile
            user={item}
            onBlock={() => handleBlock(item.id)}
            onConfirm={() => handleConfirm(item.id)}
        />
    );

    return (

        <View style={styles.containerS}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden />

            <Header />

            <FlatList
                data={users}
                renderItem={renderUserProfile}
                keyExtractor={item => item.id}
                style={{marginTop:20}}
            />
        </View>);
};

const styles = StyleSheet.create({
    containerS: {
        flex: 1,
        backgroundColor: "white"
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 12,
        color: '#888888',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    buttonText: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
    },
    confirmButtonText: {
        color: '#ffffff',
    },
    

});

export default GestionUtilisateur;