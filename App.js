import React from 'react';
import Nav from './Nav';
import {AuthProvider} from './AuthService';
import { StatusBar } from 'react-native';
import Modification from './Modification';
import ChatScreen from './ChatScreen';

const App = () => {
  return (

   /*<AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden />
      <Nav />
    </AuthProvider>*/
    
    < ChatScreen/>
  );
};

export default App;
