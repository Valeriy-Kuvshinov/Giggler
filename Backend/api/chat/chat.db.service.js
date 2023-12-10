import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

const CHATS_COLLECTION = 'chat'

export const chatService = {
  query,
  remove,
  save,
  getByUsersId,
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection(CHATS_COLLECTION)
    const chats = await collection.find(criteria).toArray()
    console.log(chats)
    return chats
  } catch (err) {
    loggerService.error('cannot find chats', err)
    throw err
  }
}

async function getByUsersId(filterBy) {
  const { buyerId, sellerId } = filterBy
  try {
    const criteria = _buildCriteriaCurrChat(filterBy)
    const collection = await dbService.getCollection(CHATS_COLLECTION)
    const chat = await collection.findOne(criteria)
    if (!chat) {
      loggerService.error(`Chat not found with sellerId: ${sellerId} buyerId: ${buyerId}`)
      throw new Error(`Chat not found with sellerId: ${sellerId} buyerId: ${buyerId}`)
    }
    return chat
  } catch (err) {
    loggerService.error(`while finding Chat ${usersId}`, err)
    throw err
  }
}

async function remove(chatId) {
  try {
    const collection = await dbService.getCollection(CHATS_COLLECTION)
    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(chatId),
    })
    if (deletedCount === 0) {
      throw new Error(`Chat with id ${chatId} was not found`)
    }
    return deletedCount
  } catch (err) {
    loggerService.error(`cannot remove chat ${chatId}`, err)
    throw err
  }
}

async function save(chat) {
  const collection = await dbService.getCollection(CHATS_COLLECTION)

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
    } catch (err) {
      loggerService.error(`cannot update chat ${chat._id}`, err)
      throw err
    }
  } else {
    try {
      const response = await collection.insertOne(chat)
      return { ...chat, _id: response.insertedId }
    } catch (err) {
      loggerService.error('cannot insert chat', err)
      throw err
    }
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  const { userId } = filterBy

  if (userId) {
    criteria.$or = [
      { 'buyer._id': userId },
      { 'seller._id': userId },
    ]
  }

  return criteria
}


function _buildCriteriaCurrChat(filterBy) {
  const criteria = {}
  const { buyerId, sellerId } = filterBy

  if (filterBy) {
    criteria.$and = [
      { 'buyer._id': buyerId },
      { 'seller._id': sellerId },
    ]
  }

  return criteria
}
