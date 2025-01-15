import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";

const EmotionsScreen = () => {
  const [emotion, setEmotion] = useState('');
  const [emotionsList, setEmotionsList] = useState([]);

  const addEmotion = () => {
    if (emotion.trim()) {
      setEmotionsList([...emotionsList, { id: Date.now().toString(), emotion }]);
      setEmotion('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Emotion</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your emotion"
        value={emotion}
        onChangeText={setEmotion}
      />
      <TouchableOpacity style={styles.button} onPress={addEmotion}>
        <Text style={styles.buttonText}>Add Emotion</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Emotion History</Text>
      <FlatList
        data={emotionsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.emotionItem}>{item.emotion}</Text>}
      />
    </View>
  );
};

export default EmotionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#edf6f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#264653",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    width: "100%",
  },
  button: {
    height: 50,
    backgroundColor: "#2a9d8f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#264653",
  },
  emotionItem: {
    fontSize: 18,
    color: "#264653",
    marginBottom: 10,
  },
});
