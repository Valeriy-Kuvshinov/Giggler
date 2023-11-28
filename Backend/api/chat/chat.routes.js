import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
// import { getChats, getChatById, removeChat, updateChat, addChat } from './chat.controller.js'
import { getChats, getChat, removeChat, updateChat, addChat } from './chat.db.controller.js'

export const chatRoutes = express.Router()

// middleware that is specific to this router
// chatRoutes.use(requireAuth) // Uncomment if you want to require auth for all chat routes

chatRoutes.get('/', log, getChats)
chatRoutes.get('/:id', getChat)
chatRoutes.put('/:id', updateChat)
chatRoutes.post('/', addChat)
chatRoutes.delete('/:id', removeChat)