import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
const BASE_URL = 'gig/'
// var gFilterBy = 'all'

export const gigService = {
    query,
    remove,
    save,
    addReview,
    createGig,
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
function createGig(buyerId = '', buyerName = '', sellerId = '', gigId = '', price = 99) {
    return {
        buyerId: buyerId,
        buyerName: buyerName,
        sellerId: sellerId,
        gigedGigId: gigId,
        price: price,
        createdAt: Date.now(),
        gigState: 'pending'
    }
}

function getDefaultFilter() {
    return { 
        search: '', 
        cat: '', 
        tag: '',
        level: '', 
        minPrice: undefined, 
        maxPrice: undefined, 
        deliveryTime: '', 
        pageIdx: 0 }
}
