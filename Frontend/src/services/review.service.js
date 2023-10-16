import { utilService } from "./util.service.js"
import { httpService } from './http.service.js'
const BASE_URL = 'review/'

export const reviewService = {
    query,
    remove,
    save,
    getById,
    addReview
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(reviewId) {
    return httpService.get(BASE_URL + reviewId)
}
function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function save(review) {
    console.log(review)
    if (review._id) {
        console.log('changed review')
        return httpService.put(BASE_URL, review)
    } else {
        console.log('created review')
        return httpService.post(BASE_URL, review)
    }
}

function addReview(review) {
    review.createdAt = Date.now()
    console.log(review)
    save(review)
}
