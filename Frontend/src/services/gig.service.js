import { setFilter } from '../store/gig.actions.js'
import { httpService } from './http.service.js'
const BASE_URL = 'gig/'

export const gigService = {
  query,
  remove,
  save,
  getById,
  getDefaultFilter,
  getFilterFromParams,
}

function getFilterFromParams(searchParams) {
  const newFilterBy = gigService.getDefaultFilter()
  const isNewRefresh = false
  for (const [key, value] of searchParams) {
    newFilterBy[key] = value
    if (newFilterBy[key]) !isNewRefresh
  }
  if (isNewRefresh) setFilter({ ...filterBy, ...newFilterBy })
  return newFilterBy
}

async function query(filterBy = {}) {
  try {
    return await httpService.get(BASE_URL, filterBy)
  } catch (error) {
    console.error('Error querying gigs:', error)
    throw error // Rethrow the error for handling at a higher level
  }
}

async function getById(gigId) {
  const gig = await httpService.get(BASE_URL + gigId)
  return gig
}

function remove(gigId) {
  return httpService.delete(BASE_URL + gigId)
}

function save(gig) {
  const savedGig = gig._id
    ? httpService.put(`${BASE_URL}${gig._id}`, gig)
    : httpService.post(BASE_URL, gig)
  return savedGig
}

function getDefaultFilter() {
  return {
    search: '',
    cat: '',
    tag: '',
    level: '',
    min: '',
    max: '',
    time: '',
    page: 1,
  }
}

export const filterKeyMap = {
  search: 'search',
  time: 'time',
  min: 'min',
  max: 'max',
  level: 'level',
  cat: 'cat',
  tag: 'tag',
}
export const deliveryTime = ['Express 24H', 'Up to 3 days', 'Up to 7 days']
export const levels = ['Level 1', 'Level 2',
//  'Level 3', 
 'Pro Talent']
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
export const packages = {
  basic: {
    type: 'Starter Package',
    price: 1,
    desc: `2 logo concepts, jpg, transparent png`,
    time: 'Up to 3 Days',
    revisions: '8',
    features: [
      '2 concepts included',
      'Logo transparency',
      'Vector file',
      'Printable file',
      'Include 3D mockup',
      'Include source file',
    ],
    featuresCond: [false, true, false, true, true, false],
  },
  standard: {
    type: 'Standard Package',
    price: 2,
    desc: `2 logo concepts + jpg file, transparent png, source files + 3D Mockup`,
    time: 'Up to 3 Days',
    revisions: '16',
    features: [
      '2 concepts included',
      'Logo transparency',
      'Vector file',
      'Printable file',
      'Include 3D mockup',
      'Include source file',
    ],
    featuresCond: [true, true, false, true, true, true],
  },
  premium: {
    type: 'Pro Package',
    price: 3,
    desc: `3 logo concepts + jpg file, png + all source & vector files + 3D Mockup`,
    time: 'Up to 3 Days',
    revisions: 'Unlimited',
    features: [
      '3 concepts included',
      'Logo transparency',
      'Vector file',
      'Printable file',
      'Include 3D mockup',
      'Include source file',
    ],
    featuresCond: [true, true, true, true, true, true],
  },
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
