import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const sendMessage = (chatId, message) =>
  API.post(`/messages`, { chatId, text: message });

export const fetchMessages = (chatId) => API.get(`/messages/${chatId}`);

export const createChat = (userId) => API.post(`/chats`, { userId });

export const fetchHistory = () => API.get(`/chats/history`);

export const loginUser = (email, password) =>
  API.post(`/auth/login`, { email, password });

export const registerUser = (name, email, password) =>
  API.post(`/auth/register`, { name, email, password });

export default API;
