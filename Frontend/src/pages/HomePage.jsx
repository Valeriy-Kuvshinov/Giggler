import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import personOne from '../assets/img/Jenny.png'
import personTwo from '../assets/img/Col.png'
import personThree from '../assets/img/Christina.png'
import personFour from '../assets/img/Scarlett.png'
import personFive from '../assets/img/Jordan.png'
import metaImg from '../assets/img/meta.logo.png'
import netflixImg from '../assets/img/netflix.logo.png'
import googleImg from '../assets/img/google.logo.png'
import pandgImg from '../assets/img/pandg.logo.png'
import paypalImg from '../assets/img/paypal.logo.png'

import { utilService } from '../services/util.service'

export function HomePage() {
    const personImages = [personOne, personTwo, personThree, personFour, personFive]
    const companyImages = [metaImg, googleImg, netflixImg, pandgImg, paypalImg]

    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % personImages.length)
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className='home-wrapper'>
            <section className='welcome-section'>
                {personImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        className={index === currentImageIndex ? 'active' : ''}
                    />
                ))}
            </section>
            <section className='home-companies-section'>
                <div className='companies flex row'>
                    <h4>Trusted by: </h4>
                    {companyImages.map((company, index) => (
                        <img key={index} src={company} />
                    ))}
                </div>
            </section>
        </section>
    )
}