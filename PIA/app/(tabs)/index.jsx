import React from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";
import { useState } from "react";


const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
    { text: "I need some advice on managing stress.", sender: "user" },
    { text: "Sure, let's talk about that.", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim().length > 0) {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <Text key={index} style={msg.sender === "user" ? styles.messageRight : styles.message}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={sendMessage} color="#4A90E2" />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#EDEDED",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4A90E2",
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    backgroundColor: "#B8E1C8",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  messageRight: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "flex-end",
    maxWidth: "70%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "#B8E1C8",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },
});
