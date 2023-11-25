import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

const REVIEWS_COLLECTION = 'review'

export const reviewService = {
    query,
    remove,
    save,
    getById
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection(REVIEWS_COLLECTION)
        const reviews = await collection.find(criteria).toArray()

        return reviews
    }
    catch (err) {
        loggerService.error('cannot find reviews', err)
        throw err
    }
}

async function getById(reviewId) {
    try {
        const collection = await dbService.getCollection(REVIEWS_COLLECTION)
        const review = collection.findOne({ _id: new ObjectId(reviewId) })
        return review
    } catch (err) {
        loggerService.error(`while finding review ${reviewId}`, err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        const collection = await dbService.getCollection(REVIEWS_COLLECTION)
        const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(reviewId) })
        if (deletedCount === 0) {
            throw new Error(`Review with id ${reviewId} was not found`)
        }
        return deletedCount
    }
    catch (err) {
        loggerService.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}

async function save(review) {
    const collection = await dbService.getCollection(REVIEWS_COLLECTION)

    try {
        const reviewToSave = { ...review }
        _convertIdsToObjectIds(reviewToSave)

        const response = await collection.insertOne(reviewToSave)
        return { ...reviewToSave, _id: response.insertedId }
    }
    catch (err) {
        loggerService.error('cannot insert review', err)
        throw err
    }
}

function _convertIdsToObjectIds(reviewData) {
    ['userId', 'gigId', 'sellerId'].forEach(field => {
        if (reviewData[field] && typeof reviewData[field] === 'string') {
            reviewData[field] = new ObjectId(reviewData[field])
        }
    })
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy._id) criteria._id = filterBy._id
    return criteria
}