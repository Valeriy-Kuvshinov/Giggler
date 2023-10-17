import { httpService } from './http.service.js'
const BASE_URL = 'gig/'
// var gFilterBy = 'all'

export const gigService = {
  query,
  remove,
  save,
  getById,
  getDefaultFilter,
}

// let gigsToDisplay = [...utilService.readJsonFile(GIGS_PATH)]
// if (filterBy.search) {
//   const regex = new RegExp(filterBy.search, 'i')
//   gigsToDisplay = gigsToDisplay.filter(
//     (gig) => regex.test(gig.title) || regex.test(gig.description)
//   )
// }
async function query(filterBy = {}) {
  try {
    let gigsToDisplay = await httpService.get(BASE_URL, filterBy)
    if (filterBy.search) {
      const escapedSearch = escapeRegExp(filterBy.search)
      const regex = new RegExp(escapedSearch, 'i')

      gigsToDisplay = gigsToDisplay.filter((gig) => {
        return regex.test(gig.title) || regex.test(gig.description)
      })
    }
    if (filterBy.cat) {
      gigsToDisplay = gigsToDisplay.filter((gig) => {
        return gig.category === filterBy.cat
      })
    }
    
    if (filterBy.tag) {
      gigsToDisplay = gigsToDisplay.filter((gig) => {
        return gig.tags.includes(filterBy.tag)
      })
    }
    
    if (filterBy.time) {
      gigsToDisplay = gigsToDisplay.filter((gig) => {
        return gig.daysToMake === filterBy.time
      })
    }

    if (filterBy.level) {
      gigsToDisplay = gigsToDisplay.filter((gig) => {
        return gig.level === filterBy.level
      })
    }

    if (filterBy.min || filterBy.max) {
      gigsToDisplay = gigsToDisplay.filter((gig) => {
        return (
          (!filterBy.min || gig.price >= filterBy.min) &&
          (!filterBy.max || gig.price <= filterBy.max)
        )
      })
    }

    console.log(gigsToDisplay)
    return gigsToDisplay
  } catch (error) {
    console.error('Error querying gigs:', error)
    throw error // Rethrow the error for handling at a higher level
  }
}

function getById(gigId) {
  return httpService.get(BASE_URL + gigId)
}

function remove(gigId) {
  return httpService.delete(BASE_URL + gigId)
}

function save(gig) {
  const savedGig = gig._id
    ? httpService.put(`${BASE_URL}${gig._id}`, gig)
    : httpService.post(BASE_URL, gig)
  console.log('Response from backend:', savedGig)
  return savedGig
}

function getDefaultFilter() {
  return {
    search: '',
    cat: '',
    tag: '',
    level: '',
    min: undefined,
    max: undefined,
    time: '',
    pageIdx: 0,
  }
}

export const deliveryTime = ['Express 24H', 'Up to 3 days', 'Up to 7 days']
export const levels = ['Level 1', 'Level 2', 'Level 3', 'Pro Talent']
export const budget = ['min', 'max']
export const category = [
  'Graphics & Design',
  'Programming & Tech',
  'Digital Marketing',
  'Video & Animation',
  'Writing & Translation',
  'Music & Audio',
  'Business',
  'Data',
  'Photography',
  'AI Services',
]
export const subcategories = {
  Graphics_And_Design: [
    'Logo & Brand Identity',
    'Art & Illustration',
    'Web & App Design',
    'Product & Gaming',
    'Print Design',
    'Visual Design',
    'Marketing Design',
    'Packaging & Covers',
    'Architecture & Building Design',
    'Fashion & Merchandise',
    '3D Design',
  ],
  Programming_And_Tech: [
    'Website Development',
    'Website Platforms',
    'Website Maintenance',
    'Software Development',
    'Software Developers',
    'QA & Review',
    'Mobile App Development',
    'Game Development',
    'Support & Cybersecurity',
    'AI Development',
    'Chatbots',
  ],
  Digital_Marketing: [
    'Search Marketing',
    'Social Marketing',
    'Methods & Techniques',
    'Analytics & Strategy',
    'Industry & Purpose-Specific',
  ],
  Video_And_Animation: [
    'Editing & Post-Production',
    'Social & Marketing Videos',
    'Animation',
    'Filmed Video Production',
    'Explainer Videos',
    'Product Videos',
    'AI Video',
  ],
  Writing_And_Translation: [
    'Content Writing',
    'Editing & Critique',
    'Business & Marketing Copy',
    'Translation & Transcription',
  ],
  Music_And_Audio: [
    'Music Production & Writing',
    'Audio Engineering & Post Production',
    'Voice Over & Narration',
    'Streaming & Audio',
    'DJing',
    'Sound Design',
    'Lessons & Transcriptions',
  ],
  Business: [
    'Business Formation',
    'Business Growth',
    'General & Administrative',
    'Legal Services',
    'Sales & Customer Care',
    'Professional Development',
    'Accounting & Finance',
  ],
  Data: [
    'Data Science & ML',
    'Data Analysis',
    'Data Collection',
    'Data Management',
  ],
  Photography: ['Products & Lifestyle', 'People & Scenes', 'Local Photography'],
  AI_Services: [
    'Build your AI app',
    'Refine AI with experts',
    'AI Artists',
    'Creative services',
    'Data Science & ML',
    'Get your data right',
  ],
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
