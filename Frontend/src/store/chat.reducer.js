export const SET_CHATS = 'SET_CHATS'
export const REMOVE_CHAT = 'REMOVE_CHAT'
export const ADD_CHAT = 'ADD_CHAT'
export const GET_CHAT = 'GET_CHAT'
export const UPDATE_CHAT = 'UPDATE_CHAT'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER = 'SET_FILTER'
import { chatService } from '../services/chat.service.js'

const initialState = {
  chats: [],
  isLoading: false,
  filterBy: chatService.getDefaultFilter(),
}

export function chatReducer(state = initialState, action = {}) {
  let chats
  switch (action.type) {
    case SET_CHATS:
      return { ...state, chats: action.chats }
    case GET_CHAT:
      const currentChat = state.chats.find((chats) => chats._id === action.chatId)
      return { ...state, currentChat: currentChat }
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