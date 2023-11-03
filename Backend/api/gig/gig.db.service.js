import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

const GIGS_COLLECTION = 'gig'

export const gigService = {
  query,
  getById,
  remove,
  save,
}

async function query(filterBy = {}) {
  try {
    const page = filterBy.page || 1
    const itemsPerPage = 12
    const skipCount = (page - 1) * itemsPerPage

    const criteria = _buildCriteria(filterBy)

    const collection = await dbService.getCollection(GIGS_COLLECTION)
    let gigs = await collection.find(criteria)
      .toArray()

    return gigs
  }
  catch (err) {
    loggerService.error('cannot find gigs', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.search) {
    criteria.$or = [
      { title: { $regex: filterBy.search, $options: 'i' } },
      { description: { $regex: filterBy.search, $options: 'i' } },
    ]
  }
  if (filterBy.cat) {
    criteria.category = { $regex: filterBy.cat, $options: 'i' }
  }
  if (filterBy.tag) {
    criteria.tags = { $regex: filterBy.tag, $options: 'i' }
  }
  if (filterBy.time) {
    criteria.daysToMake = { $regex: filterBy.time, $options: 'i' }
  }
  if (filterBy.min) {
    criteria.price = { ...criteria.price, $gte: parseInt(filterBy.min) }
  }
  if (filterBy.max) {
    criteria.price = { ...criteria.price, $lte: parseInt(filterBy.max) }
  }
  if (filterBy.min && filterBy.max) {
    criteria.price = {
      $gte: parseInt(filterBy.min),
      $lte: parseInt(filterBy.max)
    }
  }
  // Uncomment and implement the logic for 'level' if needed
  // if (filterBy.level) {
  //   // You will need to ensure that _findUsersWithLevel is defined and available to use here.
  //   // This function must return an array of user IDs that match the level.
  //   const matchingUsers = await _findUsersWithLevel(filterBy.level)
  //   criteria.ownerId = { $in: matchingUsers }
  // }
  return criteria
}

async function getById(gigId) {
  try {
    const collection = await dbService.getCollection(GIGS_COLLECTION)
    const gig = await collection.findOne({ _id: new ObjectId(gigId) })
    if (!gig) {
      loggerService.error(`Gig not found with id: ${gigId}`)
      throw new Error(`Gig not found with id: ${gigId}`)
    }
    return gig
  } 
  catch (err) {
    loggerService.error(`while finding gig ${gigId}`, err)
    throw err
  }
}

async function remove(gigId) {
  try {
    const collection = await dbService.getCollection(GIGS_COLLECTION)
    const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(gigId) })
    if (deletedCount === 0) {
      throw new Error(`Gig with id ${gigId} was not found`)
    }
    return deletedCount
  } catch (err) {
    loggerService.error(`cannot remove gig ${gigId}`, err)
    throw err
  }
}

async function save(gig) {
  const collection = await dbService.getCollection(GIGS_COLLECTION)

  if (gig._id) {
    try {
      const gigToSave = { ...gig }
      const id = gig._id
      delete gigToSave._id

      const response = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: gigToSave }
      )
      if (response.matchedCount === 0) {
        throw new Error(`Gig with id ${id} was not found`)
      }
      return { _id: id, ...gigToSave }
    } catch (err) {
      loggerService.error(`cannot update gig ${gig._id}`, err)
      throw err
    }
  }
  else {
    try {
      const response = await collection.insertOne(gig)
      return { ...gig, _id: response.insertedId }
    } catch (err) {
      loggerService.error('cannot insert gig', err)
      throw err
    }
  }
}