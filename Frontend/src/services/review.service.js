import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
const TODO_KEY = 'reviewDB'
const BASE_URL = 'review/'
// var gFilterBy = 'all'
// _createReviews()

export const reviewService = {
    query,
    get,
    remove,
    save,
    getById,
    createReview,
    addReview
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function get(reviewId) {
    return storageService.get(TODO_KEY, reviewId)
        .then((review) => {
            return review
        })
}

function getById(reviewId) {
    return httpService.get(BASE_URL + reviewId)
}
function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function save(review) {
    // console.log(review._id)
    if (review._id) {
        console.log('changed review')
        return httpService.put(BASE_URL, review)
    } else {
        console.log('created review')
        return httpService.post(BASE_URL, review)
    }
}

function createReview(userId='',gigId='',username='',imgUrl='',rating='2 days',text='good service') {
    return {
        userId: userId,
        gigId: gigId,
        userName:  username,
        imgUrl: imgUrl,
        rating: rating,
        reviewedGigId: gigId,
        text:text,
        createdAt: Date.now()
    }
}

function addReview(review){
  review.createdAt= Date.now()
  console.log(review)
  save(review)
}
