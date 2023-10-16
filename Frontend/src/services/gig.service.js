import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
const BASE_URL = 'gig/'
// var gFilterBy = 'all'

export const gigService = {
    query,
    remove,
    save,
    addReview,
    getById,
    getDefaultFilter
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(gigId) {
    return httpService.get(BASE_URL + gigId)
}

function remove(gigId) {
    return httpService.delete(BASE_URL + gigId)
}

function save(gig) {
    const savedGig = (gig._id) ? httpService.put(`${BASE_URL}${gig._id}`, gig) : httpService.post(BASE_URL, gig)
    console.log('Response from backend:', savedGig)
    return savedGig
}

function addReview(gig , review){
    review.id=utilService.makeId()
    gig.reviews.unshift(review)
    save(gig)
}

function getDefaultFilter() {
    return { 
        search: '', 
        cat: '', 
        tag: '',
        level: '', 
        min: undefined, 
        max: undefined, 
        time: '', 
        pageIdx: 0 }
}