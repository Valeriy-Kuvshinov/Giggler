import React, { useState, useEffect, useRef } from 'react'
import leftArrowSvg from '../assets/img/svg/left.side.icon.svg'
import rightArrowSvg from '../assets/img/svg/right.side.icon.svg'
import { galleryService } from '../services/gallery.service.js'

export function ServicesCarousel({ onHandleFilter }) {
  const { popularService, serviceImages, serviceTexts } = galleryService
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [images, setImages] = useState(() => {
    const halfImagesCount = Math.floor(serviceImages.length / 2)
    const initialImages = [
      ...serviceImages.slice(-halfImagesCount),
      ...serviceImages,
      ...serviceImages.slice(0, halfImagesCount),
    ]
    return initialImages
  })
  const [visibleStartIndex, setVisibleStartIndex] = useState(
    Math.floor(images.length / 4)
  )
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
    if (windowWidth < 1300) setItemsPerPage(4)
    if (windowWidth < 1100) setItemsPerPage(3)
    if (windowWidth < 800) setItemsPerPage(2)
    if (windowWidth < 600) setItemsPerPage(1)
  }, [windowWidth])

  function scrollServicesCarousel(direction) {
    const slideWidth = carouselRef.current.clientWidth / itemsPerPage
    let newIndex = visibleStartIndex

    if (direction === 'left') {
      newIndex -= itemsPerPage
      if (newIndex < 0) {
        newIndex = images.length - itemsPerPage
      }
    } else if (direction === 'right') {
      newIndex += itemsPerPage
      if (newIndex + itemsPerPage > images.length) {
        newIndex = 0
      }
    }

    setVisibleStartIndex(newIndex)

    carouselRef.current.style.transform = `translateX(-${
      newIndex * slideWidth
    }px)`
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
              onClick={(e) => onHandleFilter(e, popularService[index])}
              className="service"
              key={index}
              style={{
                flex: `0 0 calc(${100 / itemsPerPage}%) -36px`,
                borderRadius: '4px',
              }}
            >
              <img src={service} alt={`Service image ${index}`} />
              <h4 className="service-text">
                <span>{serviceTexts[index % serviceTexts.length].title}</span>
                <br />
                {serviceTexts[index % serviceTexts.length].subtitle}
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
