import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

async function query(filterBy = {}) {
  const page = filterBy.page || 1
  const itemsPerPage = 12
  const skipCount = (page - 1) * itemsPerPage

  const criteria = []

  try {
    if (filterBy.user) {
      return await getGigsByOwner(filterBy.user)
    }
    if (filterBy.search) {
      criteria.push({
        $or: [
          { title: { $regex: filterBy.search, $options: 'i' } },
          { description: { $regex: filterBy.search, $options: 'i' } },
        ],
      })
    }
    if (filterBy.cat) {
      criteria.push({ cat: { $in: filterBy.cat } })
    }
    if (filterBy.tag) {
      criteria.push({ tag: { $in: filterBy.tag } })
    }
    if (filterBy.time) {
      criteria.push({ time: { $in: filterBy.time } })
    }
    if (filterBy.level) {
      const matchingUsers = await findUsersWithLevel(filterBy.level)
      criteria.push({ ownerId: { $in: matchingUsers } })
    }

    const collection = await dbService.getCollection('gig')
    const gigs = await collection
      .aggregate([
        { $match: { $and: criteria } },
        { $skip: skipCount },
        { $limit: itemsPerPage },
      ])
      .toArray()

    return gigs
  } catch (err) {
    logger.error('cannot find gigs', err)
    throw err
  }
}

async function getGigsByOwner(ownerId) {
  const criteria = { ownerId: { $in: ownerId } }
  const collection = await dbService.getCollection('gig')
  const gigs = await collection.find(criteria).toArray()

  return gigs
}

async function findUsersWithLevel(level) {
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
    logger.error(`while finding gig ${gigId}`, err)
    throw err
  }
}

async function remove(gigId) {
  try {
    const collection = await dbService.getCollection('gig')
    await collection.deleteOne({ _id: ObjectId(gigId) })
  } catch (err) {
    logger.error(`cannot remove gig ${gigId}`, err)
    throw err
  }
}

async function add(gig) {
  try {
    const collection = await dbService.getCollection('gig')
    await collection.insertOne(gig)
    return gig
  } catch (err) {
    logger.error('cannot insert gig', err)
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
    logger.error(`cannot update gig ${gig}`, err)
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
