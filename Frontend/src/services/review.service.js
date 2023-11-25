import { httpService } from './http.service.js'
const BASE_URL = 'review/'

export const reviewService = {
    query,
    remove,
    save,
    getById
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
    if (review._id) {
        console.log('changed review')
        return httpService.put(BASE_URL, review)
    } else {
        console.log('created review')
        return httpService.post(BASE_URL, review)
    }
}