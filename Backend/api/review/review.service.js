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
    // console.log('check',filterBy.userId!=='')
    let reviewsToDisplay = [...reviews]
    // if(filterBy.userId!=='') {
    //     reviewsToDisplay=reviewsToDisplay.filter((review)=>
    //     review.userId===filterBy.userId)
    // }
    // if(filterBy.gigId!=='') {
    //     reviewsToDisplay=reviewsToDisplay.filter((review)=>
    //     review.gigId===filterBy.gigId)
    // }
    // if(filterBy.sellerId!=='') {
    //     reviewsToDisplay=reviewsToDisplay.filter((review)=>
    //     review.sellerId===filterBy.sellerId)
    // }
    // console.log(reviewsToDisplay)
    return Promise.resolve(reviewsToDisplay)
}

function getById(reviewId) {
    var reviews = [...reviews]
    // console.log('reviews',reviews)
    console.log('reviewId',reviewId)
    reviews = reviews.filter((review) => {
        console.log( review.sellerId.localeCompare(reviewId))
        if(review.sellerId.localeCompare(reviewId)===0) {
            return true 
        }
        return false
    })
    console.log('reviews',reviews)
    if (!reviews) {
        loggerService.error(`No review found with id ${reviewId}`)
        throw new Error(`No review found with id ${reviewId}`)
    }
    return Promise.resolve(reviews)
}

function remove(reviewId) {
    const idx = reviews.findIndex(review => review._id === reviewId)
    if (idx === -1) return Promise.reject('No Such Review')
    // const review = reviews[idx]
    // if (review.owner._id !== loggedinUser._id) return Promise.reject('Not your review')
    reviews.splice(idx, 1)
    return _saveReviewsToFile()
}

function save(review) {
    if (review._id) {
        const newReview = reviews.find(currReview => currReview._id === review._id)
        // if (reviewToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your review')
        newReview.buyerId=review.buyerId
        newReview.buyerName=review.buyerName
        newReview.sellerId=review.sellerId
        newReview.reviewedGigId=review.reviewedGigId
        newReview.price=review.price
        newReview.reviewState=review.reviewState
    } else {
        review._id = _makeId()
        // review.owner = loggedinUser
        reviews.push(review)
    }

    return _saveReviewsToFile().then(() => review)
    // return Promise.resolve(review)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveReviewsToFile() {
    return new Promise((resolve, reject) => {

        const reviewsStr = JSON.stringify(reviews, null, 4)
        fs.writeFile('data/review.json', reviewsStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}
