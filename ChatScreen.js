import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { BASE_URL } from './config';

const ChatScreen = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {

    try {
      await axios.post(`${BASE_URL}/chat`, { message });
      setMessage('-');
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter your message"
        value={message}
        onChangeText={setMessage}
      />
      <Button
        title="Send"
        onPress={sendMessage}
      />
    </View>
  );
};

export default ChatScreen;
