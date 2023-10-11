import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
const TODO_KEY = 'gig'
const BASE_URL = 'gig/'
// var gFilterBy = 'all'
// _createGigs()

export const gigBackendService = {
    query,
    get,
    remove,
    save,
    createGig,
    getById,
    addLabel
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}


function get(gigId) {
    return storageService.get(TODO_KEY, gigId)
        .then((gig) => {
            return gig
        })
}

function getById(gigId) {
    return httpService.get(BASE_URL + gigId)
}
function remove(gigId) {
    return httpService.delete(BASE_URL + gigId)
}

function save(gig) {
    console.log(gig._id)
    if (gig._id) {
        console.log('changed gig')
        return httpService.put(BASE_URL, gig)
    } else {
        console.log('created gig')
        return httpService.post(BASE_URL, gig)
    }
}

function addLabel(){
    
}

// function getDefaultFilter() {
//     return { title: '', subject: '' }
// }

function _createGig(name, price, labels, inStock) {
    const gig = createGig( name, price, labels, inStock )
    gig._id = utilService.makeId()
    return gig
}

function createGig(buyerId='',buyerName='',sellerId='',gigId='',price=99) {
    return {
        buyerId: buyerId,
        buyerName:  buyerName,
        sellerId: sellerId,
        gigedGigId: gigId,
        price:price,
        createdAt: Date.now(),
        gigState: 'pending'
    }
}
