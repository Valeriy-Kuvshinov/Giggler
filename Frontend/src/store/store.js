import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { gigReducer } from './gig.reducer'
import { userReducer } from './user.reducer'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'
import { orderReducer } from './order.reducer'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
    orderModule: orderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
)

// Create the store with the rootReducer and the enhancer
export const store = createStore(rootReducer, enhancer)

store.subscribe(() => {
    store.getState()
})