import { useSelector } from "react-redux"
import { gigService } from "../services/gig.service.js"
import { store } from '../store/store.js'
import { ADD_GIG, GET_GIG, REMOVE_GIG, SET_GIGS, UPDATE_GIG, SET_IS_LOADING, SET_FILTER } from "./gig.reducer.js"

export async function loadGigs(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const gigs = await gigService.query(filterBy)
        // console.log('filterBy in action: ',filterBy)
        store.dispatch({ type: SET_GIGS, gigs })
    } catch (err) {
        console.log('cannot load gigs, heres why:', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
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
        console.log(gig._id ? 'Updated gig' : 'Added gig', savedGig)
        store.dispatch({ type, gig: savedGig })
        return savedGig
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err
    }
}

export function setFilter(newFilterBy) {
    // if(!newFilterBy){
        store.dispatch({ type: SET_FILTER, filterBy: newFilterBy })
    // }
}
// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemovegigOptimistic(gigId) {
//     store.dispatch({
//         type: REMOVE_GIG,
//         gigId
//     })
//     showSuccessMsg('gig removed')

//     gigService.remove(gigId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove gig')
//             console.log('Cannot load gigs', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_GIG
//             })
//         })
// }