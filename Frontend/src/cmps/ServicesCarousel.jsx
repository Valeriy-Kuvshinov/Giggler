import React, { useState, useEffect, useRef } from 'react'
import { servicesInfo } from '../services/gallery.service.js'
import SvgIcon from './SvgIcon.jsx'

export function ServicesCarousel({ onHandleFilter }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const halfImagesCount = Math.floor(servicesInfo.length / 2)
  const [images, setImages] = useState(() => [
    ...servicesInfo.slice(-halfImagesCount),
    ...servicesInfo,
    ...servicesInfo.slice(0, halfImagesCount),
  ])
  const [visibleStartIndex, setVisibleStartIndex] = useState(halfImagesCount)
  const carouselRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (windowWidth > 1300) setItemsPerPage(5)
    else if (windowWidth >= 1100) setItemsPerPage(4)
    else if (windowWidth >= 800) setItemsPerPage(3)
    else if (windowWidth >= 600) setItemsPerPage(2)
    else setItemsPerPage(1)
  }, [windowWidth])

  const scrollServicesCarousel = (direction) => {
    const slideWidth = carouselRef.current.clientWidth / itemsPerPage
    let newIndex = visibleStartIndex

    const resetTransition = () => {
      carouselRef.current.style.transition = 'none'
      const middleSectionIndex = direction === 'left' ? images.length - itemsPerPage * 2 : halfImagesCount
      newIndex = middleSectionIndex
      carouselRef.current.style.transform = `translateX(-${newIndex * slideWidth}px)`

      carouselRef.current.offsetWidth

      carouselRef.current.style.transition = 'transform 0.5s ease-in-out'

      carouselRef.current.removeEventListener('transitionend', resetTransition)

      setVisibleStartIndex(newIndex)
    }
    if (direction === 'left') {
      newIndex -= itemsPerPage
      if (newIndex < halfImagesCount) {
        carouselRef.current.addEventListener('transitionend', resetTransition)
      }
    }
    else if (direction === 'right') {
      newIndex += itemsPerPage
      if (newIndex >= halfImagesCount + servicesInfo.length) {
        carouselRef.current.addEventListener('transitionend', resetTransition)
      }
    }
    setVisibleStartIndex(newIndex)
    carouselRef.current.style.transform = `translateX(-${newIndex * slideWidth}px)`
  }

  return (
    <section className="home-services-section">
      <h2>Popular services</h2>
      <button
        className="carousel-btn left-side"
        onClick={() => scrollServicesCarousel('left')}
      >
        <SvgIcon iconName='leftArrow'/>
      </button>
      <div className="services-carousel-wrapper">
        <div className="services" ref={carouselRef}>
          {images.map((service, index) => (
            <div
              onClick={(e) => onHandleFilter(e, {
                cat: servicesInfo[index % servicesInfo.length].cat,
                tag: servicesInfo[index % servicesInfo.length].tag,
              })}
              className="service"
              key={index}
              style={{
                flex: `0 0 calc(${100 / itemsPerPage}%) -36px`,
                borderRadius: '4px',
              }}
            >
              <img src={service.img} alt={`Service image ${index}`} />
              <h4 className="service-text">
                <span>
                  {servicesInfo[index % servicesInfo.length].title}
                </span>
                <br />
                <span className='subtitle'>
                  {servicesInfo[index % servicesInfo.length].subtitle}
                </span>
              </h4>
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel-btn right-side"
        onClick={() => scrollServicesCarousel('right')}
      >
      <SvgIcon iconName='rightArrow'/>
      </button>
    </section>
  )
}