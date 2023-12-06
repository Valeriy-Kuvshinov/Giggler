export const SET_CHATS = 'SET_CHATS'
export const REMOVE_CHAT = 'REMOVE_CHAT'
export const ADD_CHAT = 'ADD_CHAT'
export const GET_CHAT = 'GET_CHAT'
export const GET_CHAT_BY_USERS = 'GET_CHAT_BY_USERS'
export const UPDATE_CHAT = 'UPDATE_CHAT'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER = 'SET_FILTER'
export const SET_EMPTY_CHAT = 'SET_EMPTY_CHAT'
export const SET_NEW_MSG = 'SET_NEW_MSG'
export const REMOVE_IS_TYPING = 'REMOVE_IS_TYPING'
export const SET_IS_TYPING = 'SET_IS_TYPING'
export const EMBED_CHAT_USERS = 'EMBED_CHAT_USERS'
export const UPDATE_CURR_CHAT = 'UPDATE_CURR_CHAT'

import { chatService } from '../services/chat.service.js'

const initialState = {
  chats: [],
  isLoading: false,
  filterBy: chatService.getDefaultFilter(),
  currentChat: {},
  isTyping: [],
}

export function chatReducer(state = initialState, action = {}) {
  let chats
  switch (action.type) {
    case SET_CHATS:
      return { ...state, chats: action.chats }

    case GET_CHAT:
      const currentChat = state.chats.find((chat) => chat._id === action.chatId)
      return { ...state, currentChat: currentChat }

    case GET_CHAT_BY_USERS:
      return { ...state, currentChat: action.theChat }

    case EMBED_CHAT_USERS:
      chats = state.chats.map((chat) =>
        chat._id === action.chatToEmbed._id ? action.chatToEmbed : chat
      )
      return { ...state, chats: chats }

    case SET_EMPTY_CHAT:
      return { ...state, currentChat: action.emptyChat }

    case UPDATE_CURR_CHAT:
      return { ...state, currentChat: action.chat }

    case SET_NEW_MSG:
      const updatedMessages = [...state.currentChat.messages, action.message]
      const updatedCurrentChat = {
        ...state.currentChat,
        messages: updatedMessages,
      }
      return { ...state, currentChat: updatedCurrentChat }

    case SET_IS_TYPING:
      return { ...state, isTyping: [...state.isTyping, action.isTyping] }

    case REMOVE_IS_TYPING:
      const updatedTyping = state.isTyping.filter(
        (user) => user._id !== action.isTyping._id
      )
      return { ...state, isTyping: updatedTyping }

    case REMOVE_CHAT:
      chats = state.chats.filter((chat) => chat._id !== action.chatId)
      return { ...state, chats: chats }

    case ADD_CHAT:
      chats = [...state.chats, action.chat]
      return { ...state, chats: chats }

    case UPDATE_CHAT:
      chats = state.chats.map((chat) =>
        chat._id === action.chat._id ? action.chat : chat
      )
      return { ...state, chats: chats }

    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    case SET_FILTER:
      return { ...state, filterBy: action.filterBy }

    default:
      return state
  }
}
