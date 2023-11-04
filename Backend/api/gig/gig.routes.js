import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
// import { getGigs, getGigById, addGig, updateGig, removeGig } from './gig.controller.js'
import { getGigs, getGigById, addGig, updateGig, removeGig } from './gig.db.controller.js'

export const gigRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

gigRoutes.get('/', log, getGigs)
gigRoutes.get('/:id', getGigById)
gigRoutes.post('/', addGig)
gigRoutes.put('/:id', updateGig)
gigRoutes.delete('/:id', removeGig)