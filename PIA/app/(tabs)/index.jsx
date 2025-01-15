import React from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <ScrollView style={styles.chatContainer}>
        <Text style={styles.message}>Hello! How can I help you today?</Text>
        <Text style={styles.messageRight}>I need some advice on managing stress.</Text>
        <Text style={styles.message}>Sure, let's talk about that.</Text>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={() => {}} color="#4A90E2" />
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
