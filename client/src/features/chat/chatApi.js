import axiosClient from "../../shared/api/axiosClient"

export const getConversations = () =>
  axiosClient.get("/chat/history").then(r => r.data)

export const getMessages = (conversationId) =>
  axiosClient.get(`/chat/${conversationId}/messages`).then(r => r.data)

export const sendMessage = (conversationId, prompt) =>
  axiosClient.post(`/chat/${conversationId}/message`, { prompt }).then(r => r.data)

export const createConversation = (title) =>
  axiosClient.post("/chat/conversation", { title }).then(r => r.data)