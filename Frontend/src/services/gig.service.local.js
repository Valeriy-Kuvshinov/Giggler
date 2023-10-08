import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'gig'
_createGigs()

export const gigService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
}
// debug trick
window.bs = gigService

async function query(filterBy = { userId: ''}) {
  var gigs = await storageService.query(STORAGE_KEY)
  console.log(filterBy)
  if (filterBy.userId) {
    const regex = new RegExp(filterBy.userId, 'i')
    gigs = gigs.filter(
      (gig) => gig.owner.id===filterBy.userId
      // regex.test(gig.title) || regex.test(gig.description)
    )
  }
  // if (filterBy.price) {
  //   gigs = gigs.filter((gig) => gig.price <= filterBy.price)
  // }

  if (filterBy.tags && filterBy.tags.length) {
    gigs = gigs.filter((gig) =>
      gig.tags.some((tag) => filterBy.tags.include(tag))
    )
  }
  console.log('filtered gigs : ',gigs)
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

function getDefaultFilter() {
  return {
    search: '',
    category: '',
    price: '',
    daysToMake: '',
    pageIdx: 0,
  }
}

const deliveryTime = ['Express 24H', 'Up to 3 days', 'Up to 7 days']
const levels = ['Level 1', 'Level 2', 'Level 3', 'Pro Talent']

export const categories = [
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

const categoriesAndTags = {
  graphicsAndDesign: [
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
  programmingAndTech: [
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
  digital_Marketing: [
    'Search Marketing',
    'Social Marketing',
    'Methods & Techniques',
    'Analytics & Strategy',
    'Industry & Purpose-Specific',
  ],
  videoAndAnimation: [
    'Editing & Post-Production',
    'Social & Marketing Videos',
    'Animation',
    'Filmed Video Production',
    'Explainer Videos',
    'Product Videos',
    'AI Video',
  ],
  writingAndTranslation: [
    'Content Writing',
    'Editing & Critique',
    'Business & Marketing Copy',
    'Translation & Transcription',
  ],
  musicAndAudio: [
    'Music Production & Writing',
    'Audio Engineering & Post Production',
    'Voice Over & Narration',
    'Streaming & Audio',
    'DJing',
    'Sound Design',
    'Lessons & Transcriptions',
  ],
  business: [
    'Business Formation',
    'Business Growth',
    'General & Administrative',
    'Legal Services',
    'Sales & Customer Care',
    'Professional Development',
    'Accounting & Finance',
  ],
  data: [
    'Data Science & ML',
    'Data Analysis',
    'Data Collection',
    'Data Management',
  ],
  photography: ['Products & Lifestyle', 'People & Scenes', 'Local Photography'],
  aIServices: [
    'Build your AI app',
    'Refine AI with experts',
    'AI Artists',
    'Creative services',
    'Data Science & ML',
    'Get your data right',
  ],
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
        _id: 'g001',
        title: 'I will take unique photos of Spiderman',
        price: 99,
        owner: {
          id: 'u001',
          fullName: 'Peter Parker',
          avatar:
            'https://qph.cf2.quoracdn.net/main-qimg-9fde28d147c243b690bdf975f8474145-lq',
          level: 'level 2',
          rating: 4.9,
        },
        category: 'Photography',
        deliveryTime: 'Up to 3 days',
        description: 'I am actually the real Spiderman...',
        imgUrls: [
          'https://cdn.britannica.com/54/93454-050-5AC49E5E/Spider-Man-Tobey-Maguire-2.jpg',
          'https://i.insider.com/5d5d70df4afbf9310528d139?width=750&format=jpeg&auto=webp',
          'https://assets-prd.ignimgs.com/2022/03/18/spidermannowayhomeexclusivefirst10minutesignblogroll-1647047297213-1647633871978.jpeg',
          'https://www.gamespot.com/a/uploads/scale_medium/1582/15828986/3552444-spider%20train%202.jpg',
          'https://www.gamespot.com/a/uploads/screen_kubrick/1582/15828986/3552441-hed.jpg',
        ],
        tags: ['logo-design', 'artistic', 'professional', 'accessible'],
      },
      {
        _id: 'g002',
        title: 'I will design your logo',
        price: 49,
        owner: {
          id: 'u002',
          fullName: 'Jane Doe',
          avatar:
            'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000',
          level: 'level 1',
          rating: 4.9,
        },
        deliveryTime: 'Express 24H',
        description: 'I will design your robot logo in 24 hours or less...',
        imgUrls: [
          'https://img.freepik.com/premium-vector/cute-robot-mascot-logo-cartoon-character-illustration_8169-227.jpg',
          'https://img.freepik.com/premium-vector/cute-robot-logo-vector-design-template_612390-492.jpg',
          'https://img.freepik.com/free-vector/hand-drawn-data-logo-template_23-2149203374.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
          'https://img.freepik.com/free-vector/cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
          'https://img.freepik.com/free-vector/cute-robot-holding-clipboard-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5184.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
        ],
        tags: ['logo-design', 'artistic', 'professional', 'accessible'],
      },

      {
        _id: 'g101',
        title: 'I will create logos for your company',
        category: 'Graphics & Design',
        tags: [
          'Logo & Brand Identity',
          'Art & Illustration',
          'Marketing Design',
          'Packaging & Covers',
        ],
        price: 45.99,
        description:
          'I will design a unique and eye-catching logo for your brand.',
        deliveryTime: 'Up to 3 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Logo1',
          'https://via.placeholder.com/400x300?text=Logo2',
          'https://via.placeholder.com/400x300?text=Logo3',
          'https://via.placeholder.com/400x300?text=Logo4',
          'https://via.placeholder.com/400x300?text=Logo5',
        ],
        owner: {
          id: 'u101',
          name: 'Alice Smith',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar',
          level: 'Level 1',
          rating: 4.9,
          reviews: [
            {
              id: 101,
              userName: 'HappyClient123',
              rating: 5,
              text: "I couldn't be happier with the logo Alice designed for my business. It perfectly captures the essence of my brand, and the attention to detail is outstanding. Alice was a pleasure to work with, and I highly recommend her services!",
            },
            {
              id: 102,
              userName: 'BusinessOwnerXYZ',
              rating: 4.5,
              text: "Alice delivered a fantastic logo for my startup. The design process was smooth, and Alice was responsive to my feedback. The end result exceeded my expectations. I'll definitely return for future design needs.",
            },
            {
              id: 103,
              userName: 'CreativeMind456',
              rating: 5,
              text: "Alice is a true creative genius! Her logo design for my project was nothing short of exceptional. The concepts she presented were innovative, and she was patient and accommodating throughout the revision process. I'm thrilled with the final result.",
            },
            {
              id: 104,
              userName: 'LogoLover789',
              rating: 4.7,
              text: "Working with Alice was a great experience. She took my vague ideas and turned them into a stunning logo that represents my brand perfectly. While there were minor hiccups along the way, the end product speaks for itself. I'm a satisfied customer.",
            },
            {
              id: 105,
              userName: 'ArtisticVisionary',
              rating: 4.8,
              text: "Alice's logo design skills are top-notch. She was receptive to my vision and incorporated my ideas seamlessly into the final product. The communication was excellent, and I appreciate the effort she put into my project.",
            },
          ],
        },
      },
      {
        _id: 'g102',
        title: 'I will design stunning website templates',
        category: 'Graphics & Design',
        tags: [
          'Web & App Design',
          'Product & Gaming',
          'Architecture & Building Design',
        ],
        price: 59.99,
        description:
          "I specialize in creating beautiful and responsive website templates that will make your website stand out. Whether you need templates for your personal blog or e-commerce site, I've got you covered.",
        deliveryTime: 'Up to 7 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Template1',
          'https://via.placeholder.com/400x300?text=Template2',
          'https://via.placeholder.com/400x300?text=Template3',
          'https://via.placeholder.com/400x300?text=Template4',
          'https://via.placeholder.com/400x300?text=Template5',
        ],
        owner: {
          id: 'u102',
          name: 'Ella Johnson',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar2',
          level: 'Level 2',
          rating: 4.7,
          reviews: [
            {
              id: 201,
              userName: 'WebsiteOwner789',
              rating: 4.5,
              text: "Ella's templates are top-notch. I purchased a template for my online store, and it has significantly improved the look and feel of my website. She was responsive to my customization requests, and I'm very satisfied with the result.",
            },
            {
              id: 202,
              userName: 'Blogger123',
              rating: 5,
              text: "I needed a fresh look for my blog, and Ella's templates caught my eye. She delivered a beautiful template that perfectly matches my brand. Her design skills are impressive, and I highly recommend her work.",
            },
            {
              id: 203,
              userName: 'DigitalAgencyXYZ',
              rating: 4.0,
              text: 'Working with Ella was a good experience overall. Her templates are visually appealing, and she provided timely updates. While there were a few minor issues with responsiveness, she addressed them promptly.',
            },
          ],
        },
      },
      {
        _id: 'g103',
        title: 'I will write engaging blog articles for your niche',
        category: 'Writing & Translation',
        tags: ['Content Writing', 'Editing & Critique'],
        price: 29.99,
        description:
          "Looking for high-quality blog articles to boost your website's SEO and engage your audience? I'm here to help! I specialize in creating informative and engaging articles tailored to your niche.",
        deliveryTime: '3 Days Delivery',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Article1',
          'https://via.placeholder.com/400x300?text=Article2',
          'https://via.placeholder.com/400x300?text=Article3',
          'https://via.placeholder.com/400x300?text=Article4',
          'https://via.placeholder.com/400x300?text=Article5',
        ],
        owner: {
          _id: 'u103',
          name: 'David Turner',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar3',
          level: 'Level 1',
          rating: 4.4,
          reviews: [
            {
              id: 301,
              userName: 'WebsiteOwnerXYZ',
              rating: 4.0,
              text: 'David delivered well-researched articles that fit my niche. They were informative and SEO-friendly. However, there were some minor grammar issues that needed editing.',
            },
            {
              id: 302,
              userName: 'Blogger456',
              rating: 4.5,
              text: 'I hired David to write articles for my blog, and he did a commendable job. The content was engaging, and he met the deadline. I appreciate his effort and will consider working with him again.',
            },
            {
              id: 303,
              userName: 'DigitalAgency123',
              rating: 3.8,
              text: "While David's articles were decent, there were a few factual inaccuracies that needed correction. Communication was also somewhat delayed. Overall, the service was satisfactory.",
            },
          ],
        },
      },
      {
        _id: 'g104',
        title: 'I will compose a personalized song for your special occasion',
        category: 'Music & Audio',
        tags: [
          'Lessons & Transcriptions',
          'Music Production & Writing',
          'Audio Engineering & Post Production',
        ],
        price: 69.99,
        description:
          "Celebrate your special moments with a custom song composed just for you. Whether it's a wedding, anniversary, or any significant event, I'll create a musical masterpiece that captures the essence of the occasion.",
        deliveryTime: 'Up to 7 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Song1',
          'https://via.placeholder.com/400x300?text=Song2',
          'https://via.placeholder.com/400x300?text=Song3',
          'https://via.placeholder.com/400x300?text=Song4',
          'https://via.placeholder.com/400x300?text=Song5',
        ],
        owner: {
          id: 'u104',
          name: 'Sophia Anderson',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar4',
          level: 'Level 2',
          rating: 4.9,
          reviews: [
            {
              id: 401,
              userName: 'HappyCouple123',
              rating: 5,
              text: "Sophia composed the most beautiful song for our wedding day. It was incredibly touching and brought tears to our eyes. She captured our love story perfectly, and we couldn't be happier!",
            },
            {
              id: 402,
              userName: 'AnniversaryBliss456',
              rating: 4.8,
              text: "We hired Sophia to create a song for our anniversary celebration, and it was a hit! The melody and lyrics were exquisite. Sophia's talent shines through in her work, and we highly recommend her.",
            },
            {
              id: 403,
              userName: 'EventPlannerXYZ',
              rating: 4.5,
              text: "Sophia's songwriting skills are impressive. She composed a theme song for our corporate event that left a lasting impression on our guests. However, there were minor delays in delivery.",
            },
          ],
        },
      },
      {
        _id: 'g105',
        title: 'I will create custom 3D animations for your project',
        category: 'Video & Animation',
        tags: ['3D Animation', 'Custom Graphics', 'Visual Effects'],
        price: 99.99,
        description:
          "Transform your ideas into stunning 3D animations! Whether it's for a marketing video, product presentation, or artistic project, I'll bring your vision to life with custom animations and visual effects.",
        deliveryTime: 'Up to 7 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Animation1',
          'https://via.placeholder.com/400x300?text=Animation2',
          'https://via.placeholder.com/400x300?text=Animation3',
          'https://via.placeholder.com/400x300?text=Animation4',
          'https://via.placeholder.com/400x300?text=Animation5',
        ],
        owner: {
          id: 'u105',
          name: 'Lucas Johnson',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar5',
          level: 'Level 3',
          rating: 4.8,
          reviews: [
            {
              id: 501,
              userName: 'MarketingGuru123',
              rating: 5,
              text: "Lucas's 3D animations are nothing short of incredible. He turned our marketing video into a visual masterpiece that wowed our audience. The attention to detail is remarkable, and we'll definitely work with him again.",
            },
            {
              id: 502,
              userName: 'ArtEnthusiast456',
              rating: 4.7,
              text: 'I commissioned Lucas to create a custom 3D animation for my art project, and the results exceeded my expectations. His creativity and technical skills are impressive. A great collaborator!',
            },
            {
              id: 503,
              userName: 'ProductDemoXYZ',
              rating: 4.5,
              text: "Lucas did an excellent job with our product presentation animation. It helped us showcase our product's features effectively. While there were minor delays, the quality made up for it.",
            },
          ],
        },
      },
      {
        _id: 'g106',
        title: 'I will offer professional legal consultation for your business',
        category: 'Business',
        tags: [
          'Legal Services',
          'Sales & Customer Care',
          'Professional Development',
          'Accounting & Finance',
        ],
        price: 79.99,
        description:
          "Need expert legal advice for your business? I'm a seasoned attorney with years of experience in corporate law. I can help you with contracts, compliance, and business strategy to ensure legal success.",
        deliveryTime: 'Up to 3 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Legal1',
          'https://via.placeholder.com/400x300?text=Legal2',
          'https://via.placeholder.com/400x300?text=Legal3',
          'https://via.placeholder.com/400x300?text=Legal4',
          'https://via.placeholder.com/400x300?text=Legal5',
        ],
        owner: {
          id: 'u106',
          name: 'Olivia Adams',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar6',
          level: 'Level 2',
          rating: 4.9,
          reviews: [
            {
              id: 601,
              userName: 'BusinessOwner789',
              rating: 5,
              text: 'Olivia provided invaluable legal guidance for my startup. Her deep knowledge of business law helped us navigate complex contracts. Her responsiveness and clarity made the process smooth.',
            },
            {
              id: 602,
              userName: 'Entrepreneur456',
              rating: 4.8,
              text: "I hired Olivia for legal consultation, and I'm impressed by her expertise. She helped me understand the legal aspects of my business, and her advice was practical and actionable.",
            },
            {
              id: 603,
              userName: 'CorporateLeaderXYZ',
              rating: 4.7,
              text: "Olivia's legal services were a game-changer for our company. She assisted us in resolving a complex legal matter efficiently. Her professionalism and dedication were commendable.",
            },
          ],
        },
      },
      {
        _id: 'g107',
        title: 'I will provide coaching for your business growth',
        category: 'Business',
        tags: [
          'Business Formation',
          'Business Growth',
          'General & Administrative',
        ],
        price: 49.99,
        description:
          "Unlock your potential and achieve business growth with my business coaching services. Together, we'll work on setting and achieving your goals, improving your mindset, and living a more fulfilling life.",
        deliveryTime: 'Up to 3 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Coaching1',
          'https://via.placeholder.com/400x300?text=Coaching2',
          'https://via.placeholder.com/400x300?text=Coaching3',
          'https://via.placeholder.com/400x300?text=Coaching4',
          'https://via.placeholder.com/400x300?text=Coaching5',
        ],
        owner: {
          id: 'u107',
          name: 'Sophie Johnson',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar7',
          level: 'Level 3',
          rating: 4.8,
          reviews: [
            {
              id: 701,
              userName: 'PersonalGrowth123',
              rating: 5,
              text: "Sophie's business coaching has been a transformative experience for me. She's an excellent listener, and her guidance helped me set and achieve meaningful goals in my life. Highly recommended!",
            },
            {
              id: 702,
              userName: 'MotivatedLearner456',
              rating: 4.7,
              text: "I've been working with Sophie for business development, and I'm impressed by her expertise. Her coaching has helped me overcome obstacles and gain clarity on my life path.",
            },
            {
              id: 703,
              userName: 'GoalAchieverXYZ',
              rating: 4.9,
              text: "Sophie's business coaching services have been invaluable. Her approach is practical and results-driven. She helped me achieve my goals and develop a more positive mindset.",
            },
          ],
        },
      },
      {
        _id: 'g108',
        title:
          'I will create personalized workout planed videos for your fitness journey',
        category: 'Video & Animation',
        tags: ['Filmed Video Production', 'Explainer Videos', 'Product Videos'],
        price: 39.99,
        description:
          "Achieve your fitness goals with customized workout plans tailored to your needs. Whether you want to lose weight, build muscle, or improve your overall health, I'll help you get there.",
        deliveryTime: 'Up to 3 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Fitness1',
          'https://via.placeholder.com/400x300?text=Fitness2',
          'https://via.placeholder.com/400x300?text=Fitness3',
          'https://via.placeholder.com/400x300?text=Fitness4',
          'https://via.placeholder.com/400x300?text=Fitness5',
        ],
        owner: {
          id: 'u108',
          name: 'Max Trainer',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar8',
          level: 'Level 3',
          rating: 4.6,
          reviews: [
            {
              id: 801,
              userName: 'FitnessEnthusiast123',
              rating: 5,
              text: "Max's personalized workout plans have transformed my fitness journey. His expertise and attention to detail are evident in every plan. I've seen incredible results!",
            },
            {
              id: 802,
              userName: 'WeightLossWarrior456',
              rating: 4.9,
              text: "I reached out to Max to help me with weight loss, and I couldn't be happier. His plans are challenging yet achievable. He's been a motivating force in my fitness transformation.",
            },
            {
              id: 803,
              userName: 'HealthLifestyleXYZ',
              rating: 4.5,
              text: "Max's workout plans are effective, and he provides great support throughout the journey. While there were minor delays in communication, the results were worth it.",
            },
          ],
        },
      },
      {
        _id: 'g109',
        title:
          'I will create handcrafted artisanal candles for your relaxation',
        category: 'Graphics & Design',
        tags: ['Visual Design', 'Marketing Design', 'Fashion & Merchandise'],
        price: 34.99,
        description:
          'Experience the soothing ambiance of handcrafted artisanal candles. Each candle is meticulously made with love and care, perfect for creating a relaxing atmosphere in your home or as a thoughtful gift.',
        deliveryTime: 'Express 24H',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Candle1',
          'https://via.placeholder.com/400x300?text=Candle2',
          'https://via.placeholder.com/400x300?text=Candle3',
          'https://via.placeholder.com/400x300?text=Candle4',
          'https://via.placeholder.com/400x300?text=Candle5',
        ],
        owner: {
          id: 'u109',
          name: 'Ava Crafters',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar9',
          level: 'Level 2',
          rating: 4.7,
          reviews: [
            {
              id: 901,
              userName: 'CandleLover123',
              rating: 5,
              text: "Ava's handcrafted candles are a true work of art. The scents are delightful, and the craftsmanship is exceptional. They make for a perfect relaxation companion.",
            },
            {
              id: 902,
              userName: 'GiftGiver456',
              rating: 4.6,
              text: "I purchased Ava's candles as gifts, and they were a hit! The recipients loved the unique scents and packaging. Ava's dedication to her craft shines through in every candle.",
            },
            {
              id: 903,
              userName: 'CraftingEnthusiastXYZ',
              rating: 4.8,
              text: "Ava's artisanal candles are a must-try. They add a special touch to any room. While there were slight delays in delivery, the quality of the candles exceeded my expectations.",
            },
          ],
        },
      },
      {
        _id: 'g110',
        title:
          'I will create personalized digital avatars for your social media',
        category: 'Graphics & Design',
        tags: ['Art & Illustration', 'Visual Design', '3D Design'],
        price: 49.99,
        description:
          "Elevate your online presence with custom digital avatars. Whether you're a content creator, gamer, or social media enthusiast, I'll design unique avatars that represent your personality and style.",
        deliveryTime: 'Express 24H',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Avatar1',
          'https://via.placeholder.com/400x300?text=Avatar2',
          'https://via.placeholder.com/400x300?text=Avatar3',
          'https://via.placeholder.com/400x300?text=Avatar4',
          'https://via.placeholder.com/400x300?text=Avatar5',
        ],
        owner: {
          id: 'u110',
          name: 'Evelyn DigitalArt',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar10',
          level: 'Pro Talent',
          rating: 4.9,
          reviews: [
            {
              id: 1001,
              userName: 'ContentCreator123',
              rating: 5,
              text: "Evelyn's digital avatars are a game-changer for my content. They capture my personality perfectly and have become a signature of my brand. Highly recommended!",
            },
            {
              id: 1002,
              userName: 'GamerPro456',
              rating: 4.7,
              text: "I commissioned Evelyn for gaming avatars, and I'm impressed by her creativity. The avatars are visually appealing and unique. She's a talented artist.",
            },
            {
              id: 1003,
              userName: 'SocialMediaInfluencerXYZ',
              rating: 4.8,
              text: "Evelyn's avatars have enhanced my social media presence. Her communication and delivery were prompt. She's a professional in the digital art world.",
            },
          ],
        },
      },
      {
        _id: 'g111',
        title:
          'I will write a captivating fantasy novel for your reading pleasure',
        category: 'Writing & Translation',
        tags: [
          'Content Writing',
          'Editing & Critique',
          'Translation & Transcription',
        ],
        price: 89.99,
        description:
          "Embark on an epic adventure with a custom-written fantasy novel. I'll craft a captivating world filled with magic, mythical creatures, and unforgettable characters. Dive into a story you won't want to put down.",
        deliveryTime: 'Up to 7 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Fantasy1',
          'https://via.placeholder.com/400x300?text=Fantasy2',
          'https://via.placeholder.com/400x300?text=Fantasy3',
          'https://via.placeholder.com/400x300?text=Fantasy4',
          'https://via.placeholder.com/400x300?text=Fantasy5',
        ],
        owner: {
          id: 'u111',
          name: 'Luna Wordsmith',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar11',
          level: 'Level 1',
          rating: 4.9,
          reviews: [
            {
              id: 1101,
              userName: 'FantasyReader123',
              rating: 5,
              text: "Luna's fantasy novels are a masterpiece. Her storytelling transports you to another world. I couldn't put the book down until I finished it. A true literary talent!",
            },
            {
              id: 1102,
              userName: 'Bookworm456',
              rating: 4.8,
              text: 'I commissioned Luna to write a fantasy novel, and I was captivated from the first page. Her writing style is enchanting, and her world-building is exceptional. A must-read!',
            },
            {
              id: 1103,
              userName: 'LiteraryEnthusiastXYZ',
              rating: 4.9,
              text: "Luna's fantasy novels are a treasure. Her attention to detail and character development make her books a joy to read. While the delivery was a bit delayed, the quality made up for it.",
            },
          ],
        },
      },
      {
        _id: 'g112',
        title: 'I will provide virtual reality tours of historical landmarks',
        category: 'AI Services',
        tags: ['AI Artists', 'Creative services'],
        price: 59.99,
        description:
          "Step back in time and explore historical landmarks like never before with immersive virtual reality tours. I'll take you on a journey through the past, providing interactive experiences and historical insights.",
        deliveryTime: 'Up to 3 days',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=VR1',
          'https://via.placeholder.com/400x300?text=VR2',
          'https://via.placeholder.com/400x300?text=VR3',
          'https://via.placeholder.com/400x300?text=VR4',
          'https://via.placeholder.com/400x300?text=VR5',
        ],
        owner: {
          id: 'u112',
          name: 'Alex VR Explorer',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar12',
          level: 'Level 1',
          rating: 4.7,
          reviews: [
            {
              id: 1201,
              userName: 'HistoryBuff123',
              rating: 5,
              text: "Alex's VR tours are a historical enthusiast's dream. It feels like you're really there in the past. The attention to detail and knowledge shared during the tour are remarkable.",
            },
            {
              id: 1202,
              userName: 'Wanderlust456',
              rating: 4.6,
              text: "I took Alex's virtual tour of historical landmarks, and it was an incredible experience. The interactivity and storytelling make history come alive. Highly recommended!",
            },
            {
              id: 1203,
              userName: 'AdventurerXYZ',
              rating: 4.8,
              text: "Alex's VR tours are a unique way to explore history. Although there was a slight delay in communication, the tours themselves are worth every penny. I learned so much!",
            },
          ],
        },
      },
      {
        _id: 'g113',
        title: "I will provide hilarious video game 'assistance'",
        category: 'Video & Animation',
        tags: ['Video Game Help', 'Gaming Shenanigans', 'Humor'],
        price: 19.99,
        description:
          "Are you tired of serious video game help? Look no further! I offer 'assistance' that's guaranteed to make you laugh. Expect unexpected in-game antics, questionable advice, and loads of humor. Let's turn your gaming experience into a comedy show!",
        deliveryTime: 'Express 24H',
        imgUrls: [
          'https://via.placeholder.com/400x300?text=Gaming1',
          'https://via.placeholder.com/400x300?text=Gaming2',
          'https://via.placeholder.com/400x300?text=Gaming3',
          'https://via.placeholder.com/400x300?text=Gaming4',
          'https://via.placeholder.com/400x300?text=Gaming5',
        ],
        owner: {
          id: 'u113',
          name: 'GamerGuffaw',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar13',
          level: 'Level 1',
          rating: 3.2,
          reviews: [
            {
              id: 1301,
              userName: 'SeriousGamer123',
              rating: 1,
              text: "I hired GamerGuffaw for video game help, and it was a disaster. Their 'assistance' led to hilarious but utterly chaotic gameplay. I couldn't stop laughing, but my character kept dying!",
            },
            {
              id: 1302,
              userName: 'LaughingGamer456',
              rating: 5,
              text: "If you want a gaming experience that's completely absurd and sidesplitting, GamerGuffaw is your guy! Their 'help' turned my gaming session into a comedy night with friends.",
            },
            {
              id: 1303,
              userName: 'ChaosGamerXYZ',
              rating: 1,
              text: "GamerGuffaw's 'assistance' is a disaster in the best way possible. It's so bad that it's good. My character glitched into walls, and I laughed so hard I cried. A must-try for a good time!",
            },
          ],
        },
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, gigs)
  }
}
