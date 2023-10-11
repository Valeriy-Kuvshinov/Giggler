import React from 'react'
import { galleryService } from '../services/gallery.service.js'
import { WelcomeSection } from '../cmps/WelcomeSection.jsx'
import { ServicesCarousel } from '../cmps/ServicesCarousel.jsx'

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
            <section className='notes-section'>
                <h2>The best part? Everything.</h2>
                <ul>
                    <li>
                        <h3>Stick to your budget</h3>
                        <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
                    </li>
                    <li>
                        <h3>Get quality work done quickly</h3>
                        <p>Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>
                    </li>
                    <li>
                        <h3>Pay when you're happy</h3>
                        <p>Upfront quotes mean no surprises. Payments only get released when you approve.</p>
                    </li>
                    <li>
                        <h3>Count on 24/7 support</h3>
                        <p>Our round-the-clock support team is available to help anytime, anywhere.</p>
                    </li>
                </ul>
            </section>
            <ServicesCarousel />
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