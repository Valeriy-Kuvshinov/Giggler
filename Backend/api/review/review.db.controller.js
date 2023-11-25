import { loggerService } from '../../services/logger.service.js'
import { reviewService } from './review.db.service.js'

export async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    }
    catch (err) {
        loggerService.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

export async function getReviewById(req, res) {
    try {
        const review = await reviewService.getById(req.params.id)
        res.send(review)
    }
    catch (err) {
        loggerService.error('Failed to get review', err)
        res.status(500).send({ err: 'Failed to get review' })
    }
}

export async function addReview(req, res) {
    try {
        const review = req.body
        const addedReview = await reviewService.save(review)
        res.json(addedReview)
    }
    catch (err) {
        loggerService.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

export async function removeReview(req, res) {
    try {
        const reviewId = req.params.id
        await reviewService.remove(reviewId)
        res.send()
    }
    catch (err) {
        loggerService.error('Failed to remove review', err)
        res.status(500).send({ err: 'Failed to remove review' })
    }
}