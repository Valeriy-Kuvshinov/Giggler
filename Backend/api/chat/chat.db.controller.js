import { loggerService } from '../../services/logger.service.js'
import { chatService } from '../chat/chat.db.service.js'

export async function getChat(req, res) {
  try {
    // loggerService.debug('Getting chat by users',req.query)
    const chat = await chatService.getByUsersId(req.query)
    res.send(chat)
  }
  catch (err) {
    loggerService.error('Failed to get chat', err)
    res.status(500).send({ err: 'Failed to get chat' })
  }
}

export async function getChats(req, res) {
  try {
    // loggerService.debug('Getting chats for user:', req.query)
    const chats = await chatService.query(req.query)
    res.send(chats)
  }
  catch (err) {
    loggerService.error('Cannot get chats', err)
    res.status(500).send({ err: 'Failed to get chats' })
  }
}

export async function removeChat(req, res) {
  try {
    await chatService.remove(req.params.id)
    res.send({ msg: 'Deleted successfully' })
  }
  catch (err) {
    logger.error('Failed to delete chat', err)
    res.status(400).send({ err: 'Failed to delete chat' })
  }
}

export async function addChat(req, res) {
  try {
    const chat = req.body
    const addedChat = await chatService.save(chat)
    res.send(addedChat)
  }
  catch (err) {
    loggerService.error('Failed to add chat', err)
    res.status(500).send({ err: 'Failed to add chat' })
  }
}

export async function updateChat(req, res) {
  try {
    // loggerService.debug('Updating chat :', req.body._id)
    const chat = { ...req.body, _id: req.params.id }
    const savedChat = await chatService.save(chat)
    res.send(savedChat)
  }
  catch (err) {
    loggerService.error('Failed to update chat', err)
    res.status(500).send({ err: 'Failed to update chat' })
  }
}