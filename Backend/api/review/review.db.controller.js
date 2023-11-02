import { loggerService } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'
import { userService } from '../user/user.db.service.js'
import { authService } from '../auth/auth.service.js'
import { reviewService } from './review.db.service.js'

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
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        loggerService.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

export async function deleteReview(req, res) {
    var { loggedinUser } = req

    try {
        const deletedCount = await reviewService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
            socketService.broadcast({ type: 'review-removed', data: req.params.id, userId: loggedinUser._id })
        } else {
            res.status(500).send({ err: 'Cannot remove review' })
        }
    } catch (err) {
        loggerService.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}


export async function addReview(req, res) {

    let { loggedinUser } = req

    try {
        console.log(req.body)
        var review = req.body
        review.userId = loggedinUser._id
        review = await reviewService.add(review)

        // prepare the updated review for sending out

        // Give the user credit for adding a review
        const fullUser = await userService.getById(review.userId)

        loggedinUser = await userService.update(fullUser)

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete review.userId

        // socketService.broadcast({ type: 'review-added', data: review, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'review-about-you', data: review, userId: review.aboutUser._id })
        
        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(review)

    } catch (err) {
        loggerService.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

