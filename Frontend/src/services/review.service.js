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
    // console.log(review._id)
    if (review._id) {
        console.log('changed review')
        return httpService.put(BASE_URL, review)
    } else {
        console.log('created review')
        return httpService.post(BASE_URL, review)
    }
}

<<<<<<< HEAD
function addReview(review) {
    review._id = utilService.makeId()
    review.createdAt = Date.now()
    console.log(review)
    save(review)
}
=======
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
>>>>>>> 60c45f50375981ffb39379abc9e94c90710977ad
