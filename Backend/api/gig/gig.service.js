import fs from 'fs'
import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'

const GIGS_PATH = 'data/gig.json'

export const gigService = {
  remove,
  query,
  getById,
  save,
}

function query(filterBy) {
  let gigsToDisplay = [...utilService.readJsonFile(GIGS_PATH)]
  // if (filterBy.search) {
  //   const regex = new RegExp(filterBy.search, 'i')
  //   gigsToDisplay = gigsToDisplay.filter(
  //     (gig) => regex.test(gig.title) || regex.test(gig.description)
  //   )
  // }
  return Promise.resolve(gigsToDisplay)
}

function getById(gigId) {
  let gigs = utilService.readJsonFile(GIGS_PATH)
  const gig = gigs.find((g) => g._id === gigId)

  if (!gig) {
    loggerService.error(`No gig found with id ${gigId}`)
    throw new Error(`No gig found with id ${gigId}`)
  }
  return Promise.resolve(gig)
}

function remove(gigId) {
  let gigs = utilService.readJsonFile(GIGS_PATH)
  const idx = gigs.findIndex((g) => g._id === gigId)

  if (idx === -1) {
    loggerService.error(`Failed to remove gig with id ${gigId}`)
    throw new Error(`No gig found with id ${gigId}`)
  }
  gigs.splice(idx, 1)
  _saveGigs(gigs)
  loggerService.info(`Gig with id ${gigId} removed successfully`)
  return Promise.resolve()
}

function save(gig) {
  console.log('received gig', gig)
  let gigs = utilService.readJsonFile(GIGS_PATH)

  if (gig._id) {
    const idx = gigs.findIndex((g) => g._id === gig._id)
    if (idx === -1) {
      loggerService.error(`Failed to update gig with id ${gig._id}`)
      throw new Error(`No gig found with id ${gig._id}`)
    }
    gigs[idx] = { _id: gig._id, ...gig }
  } else {
    gig._id = utilService.makeId()
    gigs.push({ _id: gig._id, ...gig })
  }
  _saveGigs(gigs)
  return Promise.resolve(gig)
}

function _saveGigs(gigs) {
  try {
    console.log('Gigs before saving: ', gigs)
    fs.writeFileSync(GIGS_PATH, JSON.stringify(gigs, null, 2))
    loggerService.info('Gigs saved successfully')
  } catch (err) {
    loggerService.error('Failed to save gigs', err)
  }
}
