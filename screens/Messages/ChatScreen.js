// ChatScreen.js
import React, { useState, useRef ,useEffect} from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, KeyboardAvoidingView, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config';
const ChatScreen = ({ route }) => {

  const navigation = useNavigation();

  const { userId } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);


  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {

      const response = await axios.get(`${BASE_URL}api/User/${userId}`);
      setName(response.data.name);
      setAvatar(response.data.avatar);
    } catch (error) {
        console.error('Error fetching user - Status:', error);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { text: message, id: messages.length.toString(), timestamp: new Date() };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
      setIsTyping(false); 
      scrollToBottom(); 
    }
  };

  //const { username, avatar } = route.params;

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.id % 2 === 0 ? styles.leftMessage : styles.rightMessage]}>
      {item.avatar && <Image source={require('../../assets/image/profilepic.png')} style={styles.avatar} />}
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {avatar && <Image source={{ uri: `${BASE_URL}` + avatar }} style={styles.userImage}/>}
        <Text style={styles.userName}>{name}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages.reverse()} // Reverse the order of messages
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        inverted // Invert the FlatList to make messages appear from bottom to top
        onContentSizeChange={() => scrollToBottom()}
      />
      <TouchableOpacity style={styles.scrollToBottomButton} onPress={() => scrollToBottom()}>
        <Text style={styles.scrollToBottomText}>Scroll to Bottom</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={text => {
            setMessage(text);
            setIsTyping(text.length > 0); // Show typing indicator if the user is typing
          }}
          placeholder="Type your message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {isTyping && <Text style={styles.typingIndicator}>Typing...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  backButton: {
    marginRight: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageList: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    maxWidth: '80%',
  },
  leftMessage: {
    alignSelf: 'flex-start',
  },
  rightMessage: {
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
  },
  scrollToBottomButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'skyblue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  scrollToBottomText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    color: '#333333',
  },
  sendButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#333333 ',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typingIndicator: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    color: '#333333',
  },
});

export default ChatScreen;
