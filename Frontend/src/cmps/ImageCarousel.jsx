import { useRef, useState } from 'react'
import SvgIcon from './SvgIcon'
import { Link } from 'react-router-dom'

export function ImageCarousel({ images, gigId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef()

  function nextImage(event) {
    event.stopPropagation()
    // transform()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  function prevImage(event) {
    event.stopPropagation()
    // transform()
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  function handleDotClick(index, event) {
    event.stopPropagation()
    transform(index)
    setCurrentIndex(index)
  }

  function transform(newIndex) {
    const translation = -newIndex * 100

    carouselRef.current.style.transform = `translateX(${translation}%)`
  }

  return (
    <div className="carousel-container">
      <button className="arrow left" onClick={(e) => prevImage(e)}>
        <SvgIcon iconName={'arrowDown'} />
      </button>
      <div className="carousel" ref={carouselRef}>
        {images.map((image, index) => (
          // <div className="carousel-item">
          <Link className="carousel-item" to={`/gig/${gigId}`}>
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className={index === currentIndex ? 'active' :'hidden' }
              // 'hidden'
            />
          </Link>
          // </div>
        ))}
      </div>
      <button className="arrow right" onClick={(e) => nextImage(e)}>
        <SvgIcon iconName={'arrowDown'} />
      </button>
      <div className="dot-container">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => handleDotClick(index, e)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      {/* <div className="arrow-container"></div> */}
    </div>
  )
}
