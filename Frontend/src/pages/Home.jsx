const infoPhoto = 'https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701539555/Giggler/home-page/so1b8ydo7mx8dz71czbf.webp'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../customHooks/ModalContext.jsx'

import { setFilter } from '../store/gig.actions.js'
import { infoListData, companyImages, categoriesInfo } from '../services/gallery.service.js'

import { WelcomeSection } from '../cmps/WelcomeSection.jsx'
import { ServicesCarousel } from '../cmps/ServicesCarousel.jsx'
import { InfoListItem } from '../cmps/InfoListItem.jsx'

export function Home() {
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
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </ul>
                    </section>
                    <img className='info-img' src={infoPhoto} />
                </section>
            </div>

            <section className='home-categories-section'>
                <h2>You need it, we've got it</h2>
                <div className='categories grid'>
                    {categoriesInfo.map((category, index) => (
                        <div className='category' onClick={(e) => onHandleFilter(e, { cat: category.text })} key={index}>
                            <img src={category.icon} alt={`Category icon ${index}`} />
                            <p>{category.text}</p>
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