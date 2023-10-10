import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const gigService = {
    remove,
    query,
    getById,
    add,
    update
}

async function query(filterBy = {}, sortBy = {}) {
    try {
        const collection = await dbService.getCollection('gig')
        const criteria = _buildCriteria(filterBy)

        const gigs = await collection.find(criteria).sort(sortBy).toArray()
        return gigs
    }
    catch (err) {
        console.error('cannot find gigs', err)
        throw err
    }
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        const gig = await collection.findOne({ _id: new ObjectId(gigId) })
        return gig
    }
    catch (err) {
        loggerService.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ _id: new ObjectId(gigId) })
    }
    catch (err) {
        loggerService.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        const collection = await dbService.getCollection('gig')
        const { insertedId } = await collection.insertOne(gig)
        gig._id = insertedId
        return gig
    }
    catch (err) {
        loggerService.error('cannot insert gig', err)
        throw err
    }
}

async function update(gig) {
    try {
        const gigToSave = {
            title: gig.title,
            price: gig.price,
            owner: gig.owner,
            category: gig.category,
            deliveryTime: gig.deliveryTime,
            description: gig.description,
            imgUrls: gig.imgUrls,
            tags: gig.tags
        }
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ _id: new ObjectId(gig._id) }, { $set: gigToSave })
        return gig
    }
    catch (err) {
        loggerService.error(`cannot update gig ${gig._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title) criteria.title = { $regex: new RegExp(filterBy.title, 'i') }
    if (filterBy.category) criteria.category = filterBy.category
    if (filterBy.tags && filterBy.tags.length) criteria.tags = { $in: filterBy.tags }
    if (filterBy.minPrice !== undefined && filterBy.minPrice !== null) criteria.price = { $gte: +filterBy.minPrice }
    if (filterBy.maxPrice !== undefined && filterBy.maxPrice !== null) criteria.price = { ...criteria.price, $lte: +filterBy.maxPrice }
    return criteria
}