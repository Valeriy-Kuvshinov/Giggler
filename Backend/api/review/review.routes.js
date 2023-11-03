import express from 'express'

import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
// import { getReview, getReviews, deleteReview, updateReview, addReview } from './review.controller.js'
import { getReviewById, getReviews, removeReview, addReview } from './review.db.controller.js'

export const reviewRoutes = express.Router()

// middleware that is specific to this router
// reviewRoutes.use(requireAuth)

reviewRoutes.get('/', getReviews)
reviewRoutes.get('/:id', getReviewById)
reviewRoutes.post('/', addReview)

// reviewRoutes.put('/:id',  requireAuth, updateReview)
reviewRoutes.delete('/:id',  requireAuth, requireAdmin, removeReview)