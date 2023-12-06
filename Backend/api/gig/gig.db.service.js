import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import { cloudinaryService } from '../../services/cloudinary.service.js'

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

    const pipeline = _buildPipeline(filterBy)
    // console.log('Filter Criteria:', criteria)
    const collection = await dbService.getCollection(GIGS_COLLECTION)
    let gigs = await collection.aggregate(pipeline).toArray()

    return gigs
  } catch (err) {
    loggerService.error('cannot find gigs', err)
    throw err
  }
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
  } catch (err) {
    loggerService.error(`while finding gig ${gigId}`, err)
    throw err
  }
}

async function remove(gigId) {
  try {
    const collection = await dbService.getCollection(GIGS_COLLECTION)
    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(gigId),
    })
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

  try {
    const gigToSave = { ...gig }

    if (gig._id) {
      const id = new ObjectId(gig._id)
      delete gigToSave._id

      _convertIdsToObjectIds(gigToSave)

      const response = await collection.updateOne({ _id: id }, { $set: gigToSave })
      if (response.matchedCount === 0) {
        throw new Error(`Gig with id ${id.toHexString()} was not found`)
      }
      _checkRedundantGigImages()

      return { _id: id, ...gigToSave }
    } else {
      _convertIdsToObjectIds(gigToSave)

      const response = await collection.insertOne(gigToSave)
      _checkRedundantGigImages()

      return { ...gigToSave, _id: response.insertedId }
    }
  } catch (err) {
    loggerService.error(`cannot save gig ${gig._id}`, err)
    throw err
  }
}

function _convertIdsToObjectIds(gigData) {
  const fieldsToConvert = ['ownerId', 'likedByUsers', 'reviews']
  fieldsToConvert.forEach(field => {
    if (Array.isArray(gigData[field])) {
      gigData[field] = gigData[field].map(id => new ObjectId(id))
    } else if (gigData[field] && typeof gigData[field] === 'string') {
      gigData[field] = new ObjectId(gigData[field])
    }
  })
}

function _buildPipeline(filterBy) {
  const pipeline = []

  const criteria = {
    $match: {},
  }
  console.log('FILTERBY: ', filterBy)
  const { search, cat, level, min, max, tag, time } = filterBy

  if (search) {
    criteria.$match.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ]
  }

  if (cat) {
    criteria.$match.category = { $regex: cat, $options: 'i' }
  }

  criteria.$match.price = {}

  if (min) {
    criteria.$match.price.$gte = parseInt(min)
  } else criteria.$match.price.$gte = parseInt(0)

  if (max) {
    criteria.$match.price.$lte = parseInt(max)
  } else criteria.$match.price.$lte = parseInt(10000)

  if (tag) {
    criteria.$match.tags = { $regex: tag, $options: 'i' }
  }

  if (time) {
    criteria.$match.daysToMake = { $regex: time, $options: 'i' }
  }

  if (level) {
    pipeline.push({
      $lookup: {
        from: 'user',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'userDetails',
      },
    })
    pipeline.push({
      $match: {
        'userDetails.level': { $regex: level, $options: 'i' },
      },
    })
  }

  if (Object.keys(criteria.$match).length > 0) {
    pipeline.push(criteria)
  }
  return pipeline
}

async function _checkRedundantGigImages() {
  try {
    const gigImagePublicIds = await _getAllGigImages()
    const cloudinaryImagePublicIds = await cloudinaryService.getAllCloudinaryImages('gig-images')

    const orphanedImages = cloudinaryImagePublicIds.filter
      (publicId => !gigImagePublicIds.includes(publicId))

    if (orphanedImages.length === 0) {
      console.log('No orphaned images found')
    } else {
      console.log('Total orphaned images found: ', orphanedImages.length)
      for (const publicId of orphanedImages) {
        await cloudinaryService.deleteImageFromCloudinary(publicId)
      }
      console.log('Deletion of orphaned images completed, no more left')
    }
  } catch (err) {
    loggerService.error('Error checking for redundant images', err)
    throw err
  }
}

async function _getAllGigImages() {
  try {
    const collection = await dbService.getCollection(GIGS_COLLECTION)
    const gigs = await collection.find({}, { projection: { imgUrls: 1 } }).toArray()
    // Extract public IDs from gig image URLs
    const gigImagePublicIds = gigs.flatMap(gig => gig.imgUrls.map
      (url => cloudinaryService.extractPublicIdFromUrl(url)))

    return gigImagePublicIds
  } catch (err) {
    loggerService.error('Failed to get all gig images', err)
    throw err
  }
}