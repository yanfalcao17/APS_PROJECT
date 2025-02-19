import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { createEmotion, getEmotion, updateEmotion, deleteEmotion } from "../(services)/api/api";

const emojiOptions = ["😀", "😢", "😡", "😱", "😍", "🥰", "🤔", "😴", "😎", "😭"];

const EmotionsScreen = () => {
  const [emotionsList, setEmotionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const emotions = await getEmotion();
        setEmotionsList(emotions);
      } catch (error) {
        console.error("Erro ao buscar emoções:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmotions();
  }, []);

  const addEmotion = async (selectedEmoji) => {
    try {
      const newEmotion = await createEmotion({ emotion: selectedEmoji });
      setEmotionsList((prevList) => [...prevList, newEmotion]);
    } catch (error) {
      console.error("Erro ao adicionar emoção:", error);
    }
  };

  const editEmotion = async (id, newEmoji) => {
    try {
      const updatedEmotion = await updateEmotion({ id, emotion: newEmoji });
      setEmotionsList((prevList) => prevList.map((item) => (item.id === id ? updatedEmotion : item)));
    } catch (error) {
      console.error("Erro ao editar emoção:", error);
    }
  };

  const removeEmotion = async (id) => {
    try {
      await deleteEmotion(id);
      setEmotionsList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir emoção:", error);
    }
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
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <FlatList
          data={emotionsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.emotionItemContainer}>
              <Text style={styles.emotionItem}>{item.emotion}</Text>
              <TouchableOpacity onPress={() => editEmotion(item.id, "😀")} style={styles.actionButton}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeEmotion(item.id)} style={styles.actionButtonDelete}>
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
  emotionItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "90%",
  },
  emotionItem: {
    fontSize: 24,
    textAlign: "center",
    flex: 1,
  },
  actionButton: {
    backgroundColor: "#4A90E2",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  actionButtonDelete: {
    backgroundColor: "#E24A4A",
    padding: 5,
    borderRadius: 5,
  },
  actionText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
