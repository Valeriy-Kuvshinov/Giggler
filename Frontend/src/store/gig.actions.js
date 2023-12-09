import { gigService } from "../services/gig.service.js"
import { store } from '../store/store.js'
import { ADD_GIG, GET_GIG, REMOVE_GIG, SET_GIGS, UPDATE_GIG, SET_IS_LOADING, SET_FILTER } from "./gig.reducer.js"

export async function loadGigs(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const gigs = await gigService.query(filterBy)
        store.dispatch({ type: SET_GIGS, gigs })
    } catch (err) {
        console.log('cannot load gigs, heres why:', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export function turnOffLoader() {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
}

export async function getGig(gigId) {
    try {
        await gigService.getById(gigId)
        store.dispatch({ type: GET_GIG, gigId })
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}

export async function removeGig(gigId) {
    try {
        await gigService.remove(gigId)
        store.dispatch({ type: REMOVE_GIG, gigId })
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}

export async function saveGig(gig) {
    const type = gig._id ? UPDATE_GIG : ADD_GIG
    try {
        const savedGig = await gigService.save(gig)
        store.dispatch({ type, gig: savedGig })
        return savedGig
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err
    }
}

export function setFilter(newFilterBy) {
    store.dispatch({ type: SET_FILTER, filterBy: newFilterBy })
}