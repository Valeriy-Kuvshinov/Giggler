import { galleryService } from '../services/gallery.service.js'
import { WelcomeSection } from '../cmps/WelcomeSection.jsx'
import { ServicesCarousel } from '../cmps/ServicesCarousel.jsx'
import { InfoListItem } from '../cmps/InfoListItem.jsx'
import customCheckmarkImg from '../assets/img/svg/special.checkmark.icon.svg'
import infoImg from '../assets/img/fiverr-show.webp'

export function HomePage() {
    const { companyImages, categoryIcons, categoryTexts, infoListData } = galleryService

    return (
        <section className='home-wrapper full'>
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
                            {infoListData.map((item, idx) => (
                                <InfoListItem
                                    key={idx}
                                    imgSrc={customCheckmarkImg}
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </ul>
                    </section>
                    <img className='info-img' src={infoImg} />
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

            <div className='join-wrapper'>
                <section className='join-section'>
                    <h2>Suddenly it's all so <span>doable</span>.</h2>
                    <button>Join Fiverr</button>
                </section>
            </div>
        </section>
    )
}