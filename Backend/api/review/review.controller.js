import { reviewService } from './review.service.js'
import { loggerService } from '../../services/logger.service.js'

export async function getReview(req, res) {
    try {
        const review = await reviewService.getById(req.params.id)
        res.send(review)
    }
    catch (err) {
        loggerService.error('Failed to get review', err)
        res.status(500).send({ err: 'Failed to get review' })
    }
}

export async function getReviews(req, res) {
    try {
        const filterBy = {}
        const reviews = await reviewService.query(filterBy)
        
        res.send(reviews)
    }
    catch (err) {
        loggerService.error('Failed to get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
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

export async function updateReview(req, res) {
    try {
        const review = req.body
        const savedReview = await reviewService.save(review)
        res.send(savedReview)
    }
    catch (err) {
        loggerService.error('Failed to update review', err)
        res.status(500).send({ err: 'Failed to update review' })
    }
}

export async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    }
    catch (err) {
        loggerService.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}
