import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';


export const AuthService = createContext();
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null); // Added state for user ID

    useEffect(() => {
        const checkLoginStatus = async () => {
            const { isLoggedIn } = await isLoggedIn(); 
            setIsAuthenticated(isLoggedIn);
            setToken(token); // Set token state

        };

        checkLoginStatus();
    }, []);


    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}api/login`, {
                email,
                password,
            });

            const { token, user } = response.data;

            if (token) {

                await AsyncStorage.setItem('token', token);
                const userString = JSON.stringify(user);
                await AsyncStorage.setItem('user', userString);
                const id = response.data.id; // Assuming ID is returned in the response data

                setIsAuthenticated(true);
                setUserId(id); // Set user ID state

                return true;

            } else {
                console.error('Token is null or undefined. Login failed.');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setIsAuthenticated(false); // Update isAuthenticated after logout
            return true; // Logout successful
        } catch (error) {
            console.error('Logout error:', error);
            return false; // Logout failed
        }
    };

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                console.log('Token:', token);
                setIsAuthenticated(true);
                return { isLoggedIn: true, token }; // Return an object with isLoggedIn and token
            } else {
                setIsAuthenticated(false);
                return { isLoggedIn: false, token: null }; // Return false and null token if token doesn't exist
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            setIsAuthenticated(false);
            return { isLoggedIn: false, token: null }; // Return false and null token on error
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post(`${BASE_URL}api/user`, {
                name,
                email,
                password,
            });

            setIsAuthenticated(true);

            return true; // Registration successful
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const authContext = {
        userInfo,
        isAuthenticated,
        login,
        logout,
        isLoggedIn,
        register,
        userId, // Include userId in the context

    };

    return (
        <AuthService.Provider value={authContext}>
            {children}
        </AuthService.Provider>
    );
};

export default AuthService;
