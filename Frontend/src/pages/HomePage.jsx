import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../customHooks/ModalContext.jsx'

import { WelcomeSection } from '../cmps/WelcomeSection.jsx'
import { ServicesCarousel } from '../cmps/ServicesCarousel.jsx'
import { InfoListItem } from '../cmps/InfoListItem.jsx'

import customCheckmarkImg from '../assets/img/svg/special.checkmark.icon.svg'

import { setFilter } from '../store/gig.actions.js'
import { galleryService, infoListData, companyImages } from '../services/gallery.service.js'

export function HomePage() {
    const { categoryIcons, categoryTexts } = galleryService
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const navigate = useNavigate()

    const { showModal, openSignup } = useModal()

    function onHandleFilter(e, updateToFilter) {
        e.preventDefault()
        setFilter({ ...filterBy, ...updateToFilter })
        navigate(`/explore`)
    }
    return (
        <section className='home-wrapper full'>
            <WelcomeSection onHandleFilter={onHandleFilter} />

            <section className='home-companies-section'>
                <div className='companies flex row'>
                    <h4>Trusted by: </h4>
                    {companyImages.map((company, index) => (
                        <img key={index} src={company} alt={`Company logo ${index}`} />
                    ))}
                </div>
            </section>

            <ServicesCarousel onHandleFilter={onHandleFilter} />

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
                    <img className='info-img' src={'https://res.cloudinary.com/digrqdbso/image/upload/v1698938879/Giggler/home-page-other/jqz3ilgiaklmxo69cm71.webp'} />
                </section>
            </div>

            <section className='home-categories-section'>
                <h2>You need it, we've got it</h2>
                <div className='categories grid'>
                    {categoryIcons.map((category, index) => (
                        <div className='category' onClick={(e) => onHandleFilter(e, { cat: categoryTexts[index] })} key={index}>
                            <img src={category} alt={`Category icon ${index}`} />
                            <p>{categoryTexts[index]}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className={`join-wrapper ${showModal ? 'show-modal' : ''}`}>
                <section className='join-section'>
                    <h2>Suddenly it's all so <span>doable</span>.</h2>
                    <button onClick={openSignup}>Join Giggler</button>
                </section>
            </div>
        </section>
    )
}