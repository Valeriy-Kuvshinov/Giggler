import React, { useState, useEffect, useRef } from 'react'
import leftArrowSvg from '../assets/img/svg/left.side.icon.svg'
import rightArrowSvg from '../assets/img/svg/right.side.icon.svg'
import { galleryService } from '../services/gallery.service.js'

export function ServicesCarousel({ onHandleFilter }) {
  const { services } = galleryService
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const halfImagesCount = Math.floor(services.length / 2)
  const [images, setImages] = useState(() => [
    ...services.slice(-halfImagesCount),
    ...services,
    ...services.slice(0, halfImagesCount),
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
    } else if (direction === 'right') {
      newIndex += itemsPerPage
      if (newIndex >= halfImagesCount + services.length) {
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
        <img src={leftArrowSvg} alt="Left Arrow" />
      </button>
      <div className="services-carousel-wrapper">
        <div className="services" ref={carouselRef}>
          {images.map((service, index) => (
            <div
              onClick={(e) => onHandleFilter(e, {
                cat: services[index % services.length].cat,
                tag: services[index % services.length].tag,
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
                <span>{services[index % services.length].title}</span>
                <br />
                <span className='subtitle'>{services[index % services.length].subtitle}</span>
              </h4>
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel-btn right-side"
        onClick={() => scrollServicesCarousel('right')}
      >
        <img src={rightArrowSvg} alt="Right Arrow" />
      </button>
    </section>
  )
}