import { store } from './store.js'
import {
  ADD_CHAT,
  GET_CHAT,
  REMOVE_CHAT,
  SET_CHATS,
  UPDATE_CHAT,
  SET_IS_LOADING,
  SET_FILTER,
  GET_CHAT_BY_USERS,
  SET_EMPTY_CHAT,
  SET_NEW_MSG,
  SET_IS_TYPING,
  REMOVE_IS_TYPING,
  EMBED_CHAT_USERS,
  UPDATE_CURR_CHAT,
} from './chat.reducer.js'
import { chatService } from '../services/chat.service.js'

export async function loadChats(user) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const chats = await chatService.query(user)
    store.dispatch({ type: SET_CHATS, chats: chats })
  } catch (err) {
    console.log('cannot load chats, heres why:', err)
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function getChat(chatId) {
  try {
    await chatService.getById(chatId)
    store.dispatch({ type: GET_CHAT, chatId: chatId })
  } catch (err) {
    console.log('Cannot remove chat', err)
    throw err
  }
}

export async function getChatByUsers(usersId) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const theChat = await chatService.getByUsersId(usersId)
    if (theChat !== undefined)
      store.dispatch({ type: GET_CHAT_BY_USERS, theChat })
    return theChat
  } catch (err) {
    console.log('Cannot get chat by users: ', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function embedUsersOnChat(chatToEmbed) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  if (chatToEmbed !== undefined)
    store.dispatch({ type: EMBED_CHAT_USERS, chatToEmbed })
  store.dispatch({ type: SET_IS_LOADING, isLoading: false })
}

export function loadEmptyChat(emptyChat) {
  store.dispatch({ type: SET_EMPTY_CHAT, emptyChat })
}

export function loadNewMsg(message) {
  store.dispatch({ type: SET_NEW_MSG, message })
}
export function loadIsTyping(isTyping) {
  store.dispatch({ type: SET_IS_TYPING, isTyping })
}
export function removeIsTyping(isTyping) {
  store.dispatch({ type: REMOVE_IS_TYPING, isTyping })
}

export async function removeChat(chatId) {
  try {
    await chatService.remove(chatId)
    store.dispatch({ type: REMOVE_CHAT, chatId })
  } catch (err) {
    console.log('Cannot remove chat', err)
    throw err
  }
}

export async function saveChat(chat) {
  const type = chat._id ? UPDATE_CHAT : ADD_CHAT
  try {
    const savedChat = await chatService.save(chat)
    store.dispatch({ type, chat: savedChat })
    store.dispatch({ type: UPDATE_CURR_CHAT, chat: savedChat })
    return savedChat
  } catch (err) {
    console.log('Cannot save chat', err)
    throw err
  }
}

export function setFilter(newFilterBy) {
  store.dispatch({ type: SET_FILTER, filterBy: newFilterBy })
}
