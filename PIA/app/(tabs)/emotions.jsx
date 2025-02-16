import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";

const emojiOptions = ["😀", "😢", "😡", "😱", "😍", "🥰", "🤔", "😴", "😎", "😭"];

const EmotionsScreen = () => {
  const [emotionsList, setEmotionsList] = useState([]);

  const addEmotion = (selectedEmoji) => {
    setEmotionsList([...emotionsList, { id: Date.now().toString(), emotion: selectedEmoji }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você está se sentindo?</Text>

      <View style={styles.emojiContainer}>
        {emojiOptions.map((emoji, index) => (
          <TouchableOpacity key={index} style={styles.emojiButton} onPress={() => addEmotion(emoji)}>
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Histórico de Emoções</Text>
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
    backgroundColor: "#EDEDED",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  emojiButton: {
    backgroundColor: "#FFF",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    elevation: 2,
  },
  emoji: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#666",
  },
  emotionItem: {
    fontSize: 24,
    marginTop: 10,
    textAlign: "center",
  },
});