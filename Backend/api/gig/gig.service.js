import fs from 'fs'
import { utilService } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const gigs = utilService.readJsonFile('data/gig.json')

export const gigService = {
    remove,
    query,
    getById,
    get,
    add,
    update,
    save
}

// async function query(filterBy = {}, sortBy = {}) {
//     try {
//         const collection = await dbService.getCollection('gig')
//         const criteria = _buildCriteria(filterBy)

//         const gigs = await collection.find(criteria).sort(sortBy).toArray()
//         return gigs
//     }
//     catch (err) {
//         console.error('cannot find gigs', err)
//         throw err
//     }
// }

function query() {
    let gigsToDisplay = [...gigs]
    return Promise.resolve(gigsToDisplay)
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

function get(gigId) {
    const gig = gigs.find(gig => gig._id === gigId)
    if (!gig) return Promise.reject('Order not found!')
    return Promise.resolve(gig)
}

// async function remove(gigId) {
//     try {
//         const collection = await dbService.getCollection('gig')
//         await collection.deleteOne({ _id: new ObjectId(gigId) })
//     }
//     catch (err) {
//         loggerService.error(`cannot remove gig ${gigId}`, err)
//         throw err
//     }
// }

function remove(gigId) {
    const idx = gigs.findIndex(gig => gig._id === gigId)
    if (idx === -1) return Promise.reject('No Such Order')
    // const gig = gigs[idx]
    // if (gig.owner._id !== loggedinUser._id) return Promise.reject('Not your gig')
    gigs.splice(idx, 1)
    return _saveOrdersToFile()

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

function save(order) {
    if (order._id) {
        const newOrder = orders.find(currOrder => currOrder._id === order._id)
        // if (orderToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your order')
        newOrder.buyerId=order.buyerId
        newOrder.buyerName=order.buyerName
        newOrder.sellerId=order.sellerId
        newOrder.orderedGigId=order.gigId
        newOrder.price=order.price
    } else {
        order._id = _makeId()
        // order.owner = loggedinUser
        orders.push(order)
    }

    return _saveOrdersToFile().then(() => order)
    // return Promise.resolve(order)
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