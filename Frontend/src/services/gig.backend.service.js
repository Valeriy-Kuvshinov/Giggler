import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
const TODO_KEY = 'gig'
const BASE_URL = 'gig/'
// var gFilterBy = 'all'

export const gigBackendService = {
    query,
    get,
    remove,
    save,
    createGig,
    getById
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
    console.log(gig)
    const savedGig = (gig._id) ? httpService.put(BASE_URL, gig) : httpService.post(BASE_URL, gig);
    console.log('Response from backend:', savedGig)
    return savedGig;
}

function get(gigId) {
    return storageService.get(TODO_KEY, gigId)
        .then((gig) => {
            return gig
        })
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
