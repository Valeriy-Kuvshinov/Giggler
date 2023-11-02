import {dbService} from '../../services/db.service.js'
import {loggerService} from '../../services/logger.service.js'
import {asyncLocalStorage} from '../../services/als.service.js'

import mongodb from 'mongodb'
const {ObjectId} = mongodb

export const reviewService = {
    query,
    remove,
    add
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('review')
        // const reviews = await collection.find(criteria).toArray()
        // console.log(reviews)
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'userId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, username: review.byUser.username
                , country: review.byUser.country, imgUrl: review.byUser.imgUrl }
            return review
        })

        return reviews
    } catch (err) {
        loggerService.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        const reviewToAdd = {
            userId: new ObjectId(review.userId),
            gigId: new ObjectId(review.gigId),
            sellerId: new ObjectId(review.sellerId),
            rating: review.rating,
            text: review.text,
            createdAt: review.createdAt
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd
    } catch (err) {
        loggerService.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.userId) criteria.userId = filterBy.userId
    return criteria
}



