export const SET_GIGS = 'SET_GIGS'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const GET_GIG = 'GET_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER = 'SET_FILTER'
export const SET_PAGE_IDX = 'SET_PAGE_IDX'
import { gigService } from '../services/gig.service.js'

const initialState = {
  gigs: [],
  isLoading: false,
  filterBy: gigService.getFilterFromParams(new URLSearchParams(window.location.search)),
}

export function gigReducer(state = initialState, action = {}) {
  let gigs
  switch (action.type) {
    case SET_GIGS:
      return { ...state, gigs: action.gigs }
    case GET_GIG:
      const currentGig = state.gigs.find((gig) => gig._id === action.gigId)
      return { ...state, currentGig }
    case REMOVE_GIG:
      gigs = state.gigs.filter((gig) => gig._id !== action.gigId)
      return { ...state, gigs }
    case ADD_GIG:
      gigs = [...state.gigs, action.gig]
      return { ...state, gigs }
    case UPDATE_GIG:
      gigs = state.gigs.map((gig) =>
        gig._id === action.gig._id ? action.gig : gig
      )
      return { ...state, gigs }

    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
      
    //Filter
    case SET_FILTER:
      return { ...state, filterBy: action.filterBy }
    case SET_PAGE_IDX:
      return {
        ...state,
        filterBy: { ...state.filterBy, pageIdx: action.pageIdx },
      }

    default:
      return state
  }
}