import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'gig'
_createGigs()

export const gigService = {
  query,
  getById,
  save,
  remove
}
// debug trick
window.bs = gigService

async function query(filterBy = { txt: '', price: 0 }) {
  var gigs = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    gigs = gigs.filter(
      (gig) => regex.test(gig.title) || regex.test(gig.description)
    )
  }
  if (filterBy.price) {
    gigs = gigs.filter((gig) => gig.price <= filterBy.price)
  }
  return gigs
}

function getById(gigId) {
  return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
  await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
  var savedGig
  if (gig._id) {
    savedGig = await storageService.put(STORAGE_KEY, gig)
  } else {
    // gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(STORAGE_KEY, gig)
  }
  return savedGig
}

// async function addGigMsg(gigId, txt) {
//   // Later, this is all done by the backend
//   const gig = await getById(gigId)
//   if (!gig.msgs) gig.msgs = []

//   const msg = {
//     id: utilService.makeId(),
//     by: userService.getLoggedinUser(),
//     txt,
//   }
//   gig.msgs.push(msg)
//   await storageService.put(STORAGE_KEY, gig)

//   return msg
// }

function _createGigs() {
  let gigs = utilService.loadFromStorage(STORAGE_KEY)
  if (!gigs || !gigs.length) {
    gigs = [
      {
        _id: 'g101',
        title: 'I will take unique photos of Spiderman',
        price: 99,
        owner: {
          _id: 'u101',
          fullName: 'Peter Parker',
          imgUrl:
            'https://qph.cf2.quoracdn.net/main-qimg-9fde28d147c243b690bdf975f8474145-lq',
          level: 'level 2',
          rate: 4.9,
        },
        daysToMake: 3,
        description: 'I am actually the real Spiderman...',
        imgUrls: [
          'https://cdn.britannica.com/54/93454-050-5AC49E5E/Spider-Man-Tobey-Maguire-2.jpg',
          'https://i.insider.com/5d5d70df4afbf9310528d139?width=750&format=jpeg&auto=webp',
          'https://assets-prd.ignimgs.com/2022/03/18/spidermannowayhomeexclusivefirst10minutesignblogroll-1647047297213-1647633871978.jpeg',
          'https://www.gamespot.com/a/uploads/scale_medium/1582/15828986/3552444-spider%20train%202.jpg',
          'https://www.gamespot.com/a/uploads/screen_kubrick/1582/15828986/3552441-hed.jpg',
        ],
        tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
        likedByUsers: ['mini-user'],
      },
      {
        _id: 'g102',
        title: 'I will design your logo',
        price: 49,
        owner: {
          _id: 'u102',
          fullName: 'Jane Doe',
          imgUrl:
            'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000',
          level: 'level 1',
          rate: 4.9,
        },
        daysToMake: 1,
        description: 'I will design your robot logo in 24 hours or less...',
        imgUrls: [
          'https://img.freepik.com/premium-vector/cute-robot-mascot-logo-cartoon-character-illustration_8169-227.jpg',
          'https://img.freepik.com/premium-vector/cute-robot-logo-vector-design-template_612390-492.jpg',
          'https://img.freepik.com/free-vector/hand-drawn-data-logo-template_23-2149203374.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
          'https://img.freepik.com/free-vector/cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
          'https://img.freepik.com/free-vector/cute-robot-holding-clipboard-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5184.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
        ],
        tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
        likedByUsers: ['mini-user'],
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, gigs)
  }
}