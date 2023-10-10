import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getGigs, getGigById, addGig, updateGig, removeGig } from './gig.controller.js'

export const gigRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

gigRoutes.get('/', log, getGigs)
gigRoutes.get('/:id', getGigById)
gigRoutes.post('/', requireAdmin, addGig)
gigRoutes.put('/:id', requireAdmin, updateGig)
gigRoutes.delete('/:id', requireAdmin, requireAuth, removeGig)