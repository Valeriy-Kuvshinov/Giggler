import fs from 'fs'
import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'

const reviews = utilService.readJsonFile('data/review.json')

export const reviewService = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
    let reviewsToDisplay = [...reviews]
    return Promise.resolve(reviewsToDisplay)
}

function getById(reviewId) {
    const review = reviews.find(r => r._id === reviewId)
    if (!review) {
        loggerService.error(`No review found with id ${reviewId}`)
        throw new Error(`No review found with id ${reviewId}`)
    }
    return Promise.resolve(review)
}

function remove(reviewId) {
    const idx = reviews.findIndex(review => review._id === reviewId)
    if (idx === -1) return Promise.reject('No Such Review')
    reviews.splice(idx, 1)
    return _saveReviewsToFile()
}

function save(review) {
    if (review._id) {
        const reviewToUpdate = reviews.find(currReview => currReview._id === review._id)
        Object.assign(reviewToUpdate, review)
    }
    else {
        review._id = utilService.makeId()
        reviews.push({ _id: review._id, ...review })
    }
    return _saveReviewsToFile().then(() => review)
}

function _saveReviewsToFile() {
    return new Promise((resolve, reject) => {
        const reviewsStr = JSON.stringify(reviews, null, 4)
        fs.writeFile('data/review.json', reviewsStr, (err) => {
            if (err) {
                loggerService.error('Failed to write to file', err)
                reject(err)
                return
            }
            console.log('The file was saved!')
            resolve()
        })
    })
}