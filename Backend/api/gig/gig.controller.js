import { gigService } from './gig.service.js'
import { loggerService } from '../../services/logger.service.js'

export async function getGigs(req, res) {
    try {
        const filterBy = req.query.filterBy || {}
        const sort = req.query.sort || {}

        const sortDirection = sort.asc === 'true' ? 1 : -1
        const sortBy = { [sort.by || 'name']: sortDirection }

        const gigs = await gigService.query(filterBy, sortBy)
        res.json(gigs)
    }
    catch (err) {
        console.error('Failed to get gigs', err)
        res.status(500).send({ err: 'Failed to get gigs' })
    }
}

export async function getGigById(req, res) {
    try {
        const gigId = req.params.id
        var gig = await gigService.getById(gigId)
        console.log('gig to show: ', JSON.stringify(gig, null, 2))
        res.json(gig)
    }
    catch (err) {
        loggerService.error('Failed to get gig', err)
        res.status(500).send({ err: 'Failed to get gig' })
    }
}

export async function addGig(req, res) {
    const { loggedinUser } = req

    try {
        const gig = req.body
        gig.owner = loggedinUser
        const addedGig = await gigService.add(gig)
        res.json(addedGig)
    }
    catch (err) {
        loggerService.error('Failed to add gig', err)
        res.status(500).send({ err: 'Failed to add gig' })
    }
}

export async function updateGig(req, res) {
    try {
        const gig = req.body
        const updatedGig = await gigService.update(gig)
        res.json(updatedGig)
    }
    catch (err) {
        loggerService.error('Failed to update gig', err)
        res.status(500).send({ err: 'Failed to update gig' })
    }
}

export async function removeGig(req, res) {
    try {
        const gigId = req.params.id
        await gigService.remove(gigId)
        res.send()
    }
    catch (err) {
        loggerService.error('Failed to remove gig', err)
        res.status(500).send({ err: 'Failed to remove gig' })
    }
}