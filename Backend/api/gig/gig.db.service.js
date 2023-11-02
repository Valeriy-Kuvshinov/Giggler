import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

async function query(filterBy = {}) {
  console.log('filterBy in dbgig service: ', filterBy)
  const page = filterBy.page || 1
  const itemsPerPage = 12
  const skipCount = (page - 1) * itemsPerPage

  const criteria = {}

  try {
    if (filterBy.user) {
      return await _getGigsByOwner(filterBy.user)
    }
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
      criteria.price = { $gte: parseInt(filterBy.min) }
    }
    if (filterBy.max) {
      criteria.price = { $lte: parseInt(filterBy.max) }
    }

    // if (filterBy.level) {
    //   const matchingUsers = await _findUsersWithLevel(filterBy.level)
    //   criteria.push({ ownerId: { $in: matchingUsers } })
    // }

    const collection = await dbService.getCollection('gig')
    const gigs = await collection.find(criteria).toArray()
    // .aggregate([
    //   { $match: { $and: criteria } },
    //   { $skip: skipCount },
    //   { $limit: itemsPerPage },
    // ])

    console.log('gigs : ', gigs)
    return gigs
  } catch (err) {
    loggerService.error('cannot find gigs', err)
    throw err
  }
}

async function _getGigsByOwner(ownerId) {
  const criteria = { ownerId: { $in: ownerId } }
  const collection = await dbService.getCollection('gig')
  const gigs = await collection.find(criteria).toArray()

  return gigs
}

async function _findUsersWithLevel(level) {
  const userCollection = await dbService.getCollection('user')
  const matchingUsers = await userCollection.find({ level: level }).toArray()
  return matchingUsers.map((user) => user._id)
}

async function getById(gigId) {
  try {
    const collection = await dbService.getCollection('gig')
    const gig = collection.findOne({ _id: new ObjectId(gigId) })
    return gig
  } catch (err) {
    loggerService.error(`while finding gig ${gigId}`, err)
    throw err
  }
}

async function remove(gigId) {
  try {
    const collection = await dbService.getCollection('gig')
    await collection.deleteOne({ _id: ObjectId(gigId) })
  } catch (err) {
    loggerService.error(`cannot remove gig ${gigId}`, err)
    throw err
  }
}

async function add(gig) {
  try {
    const collection = await dbService.getCollection('gig')
    await collection.insertOne(gig)
    return gig
  } catch (err) {
    loggerService.error('cannot insert gig', err)
    throw err
  }
}

async function update(gig) {
  try {
    const gigToSave = {
      name: gig.name,
      price: gig.price,
      inStock: gig.inStock,
      review: gig.review,
    }
    const collection = await dbService.getCollection('gig')
    await collection.updateOne({ _id: ObjectId(gig._id) }, { $set: gigToSave })
    return gig
  } catch (err) {
    loggerService.error(`cannot update gig ${gig}`, err)
    throw err
  }
}

export const gigService = {
  remove,
  query,
  getById,
  add,
  update,
}
