import React from 'react'
import { galleryService } from '../services/gallery.service.js'
import { WelcomeSection } from '../cmps/WelcomeSection.jsx'
import { ServicesCarousel } from '../cmps/ServicesCarousel.jsx'
import customCheckmarkImg from '../assets/img/svg/special.checkmark.icon.svg'
import infoImg from '../assets/img/fiverr-show.webp'

export function HomePage() {
    const { companyImages, categoryIcons, categoryTexts } = galleryService

    return (
        <section className='home-wrapper'>
            <WelcomeSection />
            <section className='home-companies-section'>
                <div className='companies flex row'>
                    <h4>Trusted by: </h4>
                    {companyImages.map((company, index) => (
                        <img key={index} src={company} alt={`Company logo ${index}`} />
                    ))}
                </div>
            </section>

            <ServicesCarousel />

            <div className='home-info-wrapper'>
                <section className='info-section flex row'>
                    <section className='text'>
                        <h2>The best part? Everything.</h2>
                        <ul>
                            <li>
                                <div className='flex row'>
                                    <img src={customCheckmarkImg} />
                                    <h3>Stick to your budget</h3>
                                </div>
                                <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
                            </li>
                            <li>
                                <div className='flex row'>
                                    <img src={customCheckmarkImg} />
                                    <h3>Get quality work done quickly</h3>
                                </div>
                                <p>Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>
                            </li>
                            <li>
                                <div className='flex row'>
                                    <img src={customCheckmarkImg} />
                                    <h3>Pay when you're happy</h3>
                                </div>
                                <p>Upfront quotes mean no surprises. Payments only get released when you approve.</p>
                            </li>
                            <li>
                                <div className='flex row'>
                                    <img src={customCheckmarkImg} />
                                    <h3>Count on 24/7 support</h3>
                                </div>
                                <p>Our round-the-clock support team is available to help anytime, anywhere.</p>
                            </li>
                        </ul>
                    </section>
                    <img src={infoImg} />
                </section>
            </div>
            <section className='home-categories-section'>
                <h2>You need it, we've got it</h2>
                <div className='categories grid'>
                    {categoryIcons.map((category, index) => (
                        <div key={index}>
                            <img src={category} alt={`Category icon ${index}`} />
                            <p>{categoryTexts[index]}</p>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}