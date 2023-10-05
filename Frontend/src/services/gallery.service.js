import personOne from '../assets/img/jenny.webp'
import miniPersonOne from '../assets/img/mini-jenny.webp'
import personTwo from '../assets/img/colin.webp'
import miniPersonTwo from '../assets/img/mini-colin.webp'
import personThree from '../assets/img/christina.webp'
import miniPersonThree from '../assets/img/mini-colin.webp'
import personFour from '../assets/img/scarlett.webp'
import miniPersonFour from '../assets/img/mini-scarlett.webp'
import personFive from '../assets/img/jordan.webp'
import miniPersonFive from '../assets/img/mini-jordan.webp'

import metaImg from '../assets/img/meta.logo.png'
import netflixImg from '../assets/img/netflix.logo.png'
import googleImg from '../assets/img/google.logo.png'
import pandgImg from '../assets/img/pandg.logo.png'
import paypalImg from '../assets/img/paypal.logo.png'

import serviceOneImg from '../assets/img/ai.art.webp'
import serviceTwoImg from '../assets/img/logo.design.webp'
import serviceThreeImg from '../assets/img/wordpress.webp'
import serviceFourImg from '../assets/img/voice.over.webp'
import serviceFiveImg from '../assets/img/video.explainer.webp'
import serviceSixImg from '../assets/img/social.media.webp'
import serviceSevenImg from '../assets/img/seo.webp'
import serviceEightImg from '../assets/img/illustration.webp'
import serviceNineImg from '../assets/img/translation.webp'
import serviceTenImg from '../assets/img/data.entry.webp'
import serviceElevenImg from '../assets/img/book.covers.webp'

import categoryOneSvg from '../assets/img/svg/graphics.design.icon.svg'
import categoryTwoSvg from '../assets/img/svg/digital.marketing.icon.svg'
import categoryThreeSvg from '../assets/img/svg/writing.translation.icon.svg'
import categoryFourSvg from '../assets/img/svg/video.animation.icon.svg'
import categoryFiveSvg from '../assets/img/svg/music.audio.icon.svg'
import categorySixSvg from '../assets/img/svg/programming.tech.icon.svg'
import categorySevenSvg from '../assets/img/svg/business.icon.svg'
import categoryEightSvg from '../assets/img/svg/lifestyle.icon.svg'
import categoryNineSvg from '../assets/img/svg/data.icon.svg'
import categoryTenSvg from '../assets/img/svg/photography.icon.svg'

import socialMediaTiktok from '../assets/img/svg/social.media.tiktok.svg'
import socialMediaInstagram from '../assets/img/svg/social.media.instagram.svg'
import socialMediaLinkedin from '../assets/img/svg/social.media.linkedin.svg'
import socialMediaFacebook from '../assets/img/svg/social.media.facebook.svg'
import socialMediaPinterest from '../assets/img/svg/social.media.pinterest.svg'
import socialMediaTwitter from '../assets/img/svg/social.media.twitter.svg'

const serviceTexts = [
    { title: "Add talent to AI", subtitle: "AI Artists" },
    { title: "Build your brand", subtitle: "Logo Design" },
    { title: "Customize your site", subtitle: "Wordpress" },
    { title: "Share your message", subtitle: "Voice Over" },
    { title: "Engage your audience", subtitle: "Video Explainer" },
    { title: "Reach more customers", subtitle: "Social Media" },
    { title: "Unlock growth online", subtitle: "SEO" },
    { title: "Color your dreams", subtitle: "Illustration" },
    { title: "Go global", subtitle: "Translation" },
    { title: "Learn your business", subtitle: "Data Entry" },
    { title: "Showcase your story", subtitle: "Book Covers" }
]

const personImages = [
    { big: personOne, small: miniPersonOne },
    { big: personTwo, small: miniPersonTwo },
    { big: personThree, small: miniPersonThree },
    { big: personFour, small: miniPersonFour },
    { big: personFive, small: miniPersonFive }
]


export const galleryService = {
    companyImages: [metaImg, googleImg, netflixImg, pandgImg, paypalImg],
    serviceImages: [serviceOneImg, serviceTwoImg, serviceThreeImg, serviceFourImg, serviceFiveImg, serviceSixImg, serviceSevenImg, serviceEightImg, serviceNineImg, serviceTenImg, serviceElevenImg],
    categoryIcons: [categoryOneSvg, categoryTwoSvg, categoryThreeSvg, categoryFourSvg, categoryFiveSvg, categorySixSvg, categorySevenSvg, categoryEightSvg, categoryNineSvg, categoryTenSvg],
    categoryTexts: ["Graphics & Design", "Digital Marketing", "Writing & Translation", "Video & Animation", "Music & Audio", "Programming & Tech", "Business", "Lifestyle", "Data", "Photography"],
    socialMediaLinks: [
        { img: socialMediaTiktok, url: 'https://www.fiverr.com' },
        { img: socialMediaInstagram, url: 'https://www.fiverr.com' },
        { img: socialMediaLinkedin, url: 'https://www.fiverr.com' },
        { img: socialMediaFacebook, url: 'https://www.fiverr.com' },
        { img: socialMediaPinterest, url: 'https://www.fiverr.com' },
        { img: socialMediaTwitter, url: 'https://www.fiverr.com' },
    ],
    serviceTexts: serviceTexts,
    personImages: personImages
}