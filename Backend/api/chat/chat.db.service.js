import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

const USERS_COLLECTION = 'chat'

export const chatService = {
  query,
  remove,
  save,
  getById,
  // getByChatname,
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection(USERS_COLLECTION)
    const chats = await collection.find(criteria).toArray()
    // console.log(chats)
    return chats
  } 
  catch (err) {
    loggerService.error('cannot find chats', err)
    throw err
  }
}

// async function getByChatname(chatname) {
//   try {
//     const collection = await dbService.getCollection(USERS_COLLECTION)
//     const chat = await collection.findOne({ chatname })
//     return chat
//   } 
//   catch (err) {
//     logger.error(`while finding chat by chatname: ${chatname}`, err)
//     throw err
//   }
// }

async function getById(chatId) {
  try {
    const collection = await dbService.getCollection(USERS_COLLECTION)
    const chat = collection.findOne({ _id: new ObjectId(chatId) })
    return chat
  } 
  catch (err) {
    loggerService.error(`while finding chat ${chatId}`, err)
    throw err
  }
}

async function remove(chatId) {
  try {
    const collection = await dbService.getCollection(USERS_COLLECTION)
    const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(chatId) })
    if (deletedCount === 0) {
      throw new Error(`Chat with id ${chatId} was not found`)
    }
    return deletedCount
  } 
  catch (err) {
    loggerService.error(`cannot remove chat ${chatId}`, err)
    throw err
  }
}

async function save(chat) {
  const collection = await dbService.getCollection(USERS_COLLECTION)

  if (chat._id) {
    try {
      const chatToSave = { ...chat }
      const id = chat._id
      delete chatToSave._id

      const response = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: chatToSave }
      )
      if (response.matchedCount === 0) {
        throw new Error(`Chat with id ${id} was not found`)
      }
      return { _id: id, ...chatToSave }
    } 
    catch (err) {
      loggerService.error(`cannot update chat ${chat._id}`, err)
      throw err
    }
  }
  else {
    try {
      const response = await collection.insertOne(chat)
      return { ...chat, _id: response.insertedId }
    } 
    catch (err) {
      loggerService.error('cannot insert chat', err)
      throw err
    }
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.chatId) criteria.chatId = filterBy.chatId
  return criteria
}