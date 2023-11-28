import { loggerService } from '../../services/logger.service.js'
import { chatService } from '../chat/chat.db.service.js'

export async function getChat(req, res) {
  try {
    const chat = await chatService.getById(req.params.id)
    res.send(chat)
  }
  catch (err) {
    loggerService.error('Failed to get chat', err)
    res.status(500).send({ err: 'Failed to get chat' })
  }
}

export async function getChats(req, res) {
  try {
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
    const chat = { ...req.body, _id: req.params.id }
    const savedChat = await chatService.save(chat)
    res.send(savedChat)
  }
  catch (err) {
    logger.error('Failed to update chat', err)
    res.status(500).send({ err: 'Failed to update chat' })
  }
}