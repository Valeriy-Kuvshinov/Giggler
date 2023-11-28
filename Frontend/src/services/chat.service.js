import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'chat/'

export const chatService = {
  getChats,
  getById,
  remove,
  update,
}
window.chatService = chatService

async function getChats() {
  return httpService.get(BASE_URL)
}

async function getById(chatId) {
  const chat = await httpService.get(BASE_URL + chatId)
  return chat
}

function remove(chatId) {
  return httpService.delete(BASE_URL, chatId)
}

async function update(chat) {
  const savedChat = await httpService.put(`${BASE_URL}${chat._id}`, chat)
  if (getLoggedinChat()._id === chat._id) setLoggedinChat(chat)
  return savedChat
}
