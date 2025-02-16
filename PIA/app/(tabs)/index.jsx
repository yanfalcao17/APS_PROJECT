import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";
import OpenAI from "openai";
import emotionObserver from "../../observer/emotionObserver"; 

const API_KEY = "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";

const openai = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const handleNewEmotion = (emotions) => {
      if (emotions.length > 0) {
        const lastEmotion = emotions[emotions.length - 1];
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `I see you're feeling: ${lastEmotion}`, sender: "bot" },
        ]);
      }
    };

    emotionObserver.subscribe(handleNewEmotion);
    
    return () => {
      emotionObserver.unsubscribe(handleNewEmotion);
    };
  }, []);

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const newMessages = [...messages, { text: inputText, sender: "user" }];
    setMessages(newMessages);
    setInputText("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: newMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      });

      console.log("Resposta da OpenAI:", response);
      const botResponse = response.choices?.[0]?.message?.content || "I'm sorry, I didn't understand that.";

      setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Erro ao obter resposta do ChatGPT:", error);
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
        <TextInput style={styles.input} placeholder="Type your message..." value={inputText} onChangeText={setInputText} />
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
