import axios from "axios";
import emotionObserver from "../../../observer/emotionObserver";

const API_BASE_URL = "http://localhost:8000/api";

// 📌 Função auxiliar para requisições com tratamento de erro
const apiRequest = async (method, url, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro na requisição ${method.toUpperCase()} ${url}:`, error);
    throw error;
  }
};

export const registerUser = async (user) => {
  console.log("Registrando usuário:", user);
  return apiRequest("post", "/users/register", user);
};

export const loginUser = async (user) => {
  return apiRequest("post", "/users/login", user);
};

export const getUser = async (user) => {
  return apiRequest("post", "/users/profile", user);
};

export const createEmotion = async (emotion) => {
  const response = await apiRequest("post", "/emotions/add", emotion);
  
  // Notificar observadores APÓS sucesso na requisição
  emotionObserver.notify([response]);
  
  return response;
};

export const updateEmotion = async (emotion) => {
  const response = await apiRequest("post", "/emotions/update", emotion);
  
  // Notificar observadores APÓS sucesso na requisição
  emotionObserver.notify([response]);
  
  return response;
};

export const getEmotion = async () => {
  return apiRequest("get", "/emotions/history");
};

export const deleteEmotion = async (emotionId) => {
  return apiRequest("delete", `/emotions/delete/${emotionId}`);
};
