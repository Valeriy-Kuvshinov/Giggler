import { useRef, useState } from 'react'

export function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef()

  function nextImage(e) {
    e.stopPropagation()
    // transform()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  function prevImage(e) {
    e.stopPropagation()
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
      <div className="carousel" ref={carouselRef}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={index === currentIndex ? 'active' : 'hidden'}
          />
        ))}
      </div>
      <div className="dot-container">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => handleDotClick(index, e)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="arrow-container">
        <button className="arrow left" onClick={prevImage}>
          {`<`}
        </button>
        <button className="arrow right" onClick={nextImage}>
          {`>`}
        </button>
      </div>
    </div>
  )
}
