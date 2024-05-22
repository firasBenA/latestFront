import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './Nav';
import { AuthProvider } from './AuthService';

const App = () => {
  useEffect(() => {
    console.log("App component mounted");
    return () => {
      console.log("App component unmounted");
    };
  }, []);

  console.log("Rendering App component");

  return (
    <AuthProvider>
        <Nav/>
    </AuthProvider>
  );
};

export default App;
