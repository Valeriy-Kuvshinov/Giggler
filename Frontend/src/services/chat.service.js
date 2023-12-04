import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'chat/'

export const chatService = {
  query,
  getById,
  remove,
  save,
  getByUsersId,
  getDefaultFilter,
  getEmptyChat,
}

async function query(user) {
  try {
    return await httpService.get(BASE_URL, user)
  } catch (error) {
    console.error('Error querying chats:', error)
    throw error
  }
}

async function getByUsersId(usersId) {
  const chat = await httpService.get(BASE_URL + usersId.buyerId, usersId)
  return chat
}

async function save(chat) {
  const savedChat = chat._id
    ? await httpService.put(`${BASE_URL}${chat._id}`, chat)
    : await httpService.post(BASE_URL, chat)
  return savedChat
}

async function getById(chatId) {
  const chat = await httpService.get(BASE_URL + chatId)
  return chat
}

async function remove(chatId) {
  return httpService.delete(BASE_URL, chatId)
}

function getDefaultFilter() {
  return {
    userId: '',
    // gigId: ''
  }
}

function getEmptyChat() {
  return {
    buyerId: '',
    sellerId: '',
    messages: [],
    gig: null,
  }
}
