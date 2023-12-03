import { store } from './store.js'
import { ADD_CHAT, GET_CHAT, REMOVE_CHAT, SET_CHATS, UPDATE_CHAT, SET_IS_LOADING, SET_FILTER } from "./chat.reducer.js"
import { chatService } from "../services/chat.service.js"

export async function loadChats(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const chats = await chatService.query(filterBy)
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
    try {
        await chatService.getById(usersId)
        store.dispatch({ type: GET_CHAT, usersId: usersId })
    } catch (err) {
        console.log('Cannot remove chat', err)
        throw err
    }
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
        console.log(chat._id ? 'Updated chat' : 'Added chat', savedChat)
        store.dispatch({ type, chat: savedChat })
        return savedChat
    } catch (err) {
        console.log('Cannot save chat', err)
        throw err
    }
}

export function setFilter(newFilterBy) {
    store.dispatch({ type: SET_FILTER, filterBy: newFilterBy })
}