export const SET_GIGS = 'SET_GIGS'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    gigs: [],
    isLoading: false
}

export function gigReducer(state = initialState, action = {}) {
    let gigs
    switch (action.type) {
        case SET_GIGS:
            return { ...state, gigs: action.gigs }
        case REMOVE_GIG:
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            return { ...state, gigs }
        case ADD_GIG:
            gigs = [...state.gigs, action.gig]
            return { ...state, gigs }
        case UPDATE_GIG:
            gigs = state.gigs.map(gig => gig._id === action.gig._id ? action.gig : gig)
            return { ...state, gigs }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}

// export const UNDO_REMOVE_GIG = 'UNDO_REMOVE_GIG'

// case UNDO_REMOVE_GIG:
//     if (state.lastRemovedGig) {
//         newState = { ...state, gigs: [...state.gigs, state.lastRemovedGig], lastRemovedGig: null }
//     }
//     break