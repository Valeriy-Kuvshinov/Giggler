import { gigService } from './gig.db.service.js'
import { loggerService } from '../../services/logger.service.js'

export async function getGigs(req, res) {
  try {
    console.log(req.query)
    let filterBy = {}
    const { user } = req.query

    if (user) filterBy = { user }

    else {
      const { search, cat, tag, time, level, min, max, page } = req.query
      filterBy = { search, cat, tag, time, level, min, max, page }
    }
    // loggerService.debug('Getting Gigs', filterBy)
    const gigs = await gigService.query(filterBy)
    res.json(gigs)
  }
  catch (err) {
    loggerService.error('Failed to get gigs', err)
    res.status(500).send({ err: 'Failed to get gigs' })
  }
}

export async function getGigById(req, res) {
  try {
    const gigId = req.params.id
    const gig = await gigService.getById(gigId)
    res.json(gig)
  }
  catch (err) {
    loggerService.error('Failed to get gig', err)
    res.status(500).send({ err: 'Failed to get gig' })
  }
}

export async function addGig(req, res) {
  try {
    const gig = req.body
    console.log('creating gig: ', gig)
    const addedGig = await gigService.save(gig)
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
    console.log('updating gig: ',gig)
    const updatedGig = await gigService.save(gig)
    res.send(updatedGig)
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