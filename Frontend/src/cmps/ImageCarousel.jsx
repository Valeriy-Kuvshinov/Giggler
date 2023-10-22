import { useRef, useState, useEffect } from 'react'
import SvgIcon from './SvgIcon'
import { Link } from 'react-router-dom'

export function ImageCarousel({ images, gigId, parentWidth }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const carouselRef = useRef()
  const numImages = images.length
  let imageWidth = parentWidth || 245
  const currImage = [images[currentIndex]]

  useEffect(() => {
    imageWidth = parentWidth || carouselRef.current.clientWidth
    const totalCarouselWidth = imageWidth * numImages

    carouselRef.current.style.width = `${totalCarouselWidth}px`
    carouselRef.current.style.transform = `translateX(-${
      imageWidth * currentIndex
    }px`

    setIsLoading(false)
  }, [parentWidth, currentIndex, numImages])

  function nextImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numImages)
  }

  function prevImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? numImages - 1 : prevIndex - 1
    )
  }

  function handleDotClick(index, event) {
    event.stopPropagation()
    setCurrentIndex(index)
  }

  // if (!isLoading && !isHovered) {
  //   return (
  //     <div className="img-preview">
  //       <Link to={`/gig/${gigId}`}>
  //         <img src={firstImage} alt={`Image 0`} className="active" />
  //       </Link>
  //     </div>
  //   )
  // }
  

  return (
    <div className="carousel-container">
      <button className="arrow left" onClick={(e) => prevImage(e)}>
        <SvgIcon iconName={'arrowDown'} />
      </button>
      <div
        className="carousel"
        ref={carouselRef}
        style={{
          width: `${imageWidth * numImages}px`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{
              width: `${imageWidth}px`,
            }}
          >
            <Link to={`/gig/${gigId}`}>
              <img
                src={image}
                alt={`Image ${index}`}
                className={index === currentIndex ? 'active' : ''}
              />
            </Link>
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={(e) => nextImage(e)}>
        <SvgIcon iconName={'arrowDown'} />
      </button>
      <ul className="dot-container">
        {images.map((_, index) => (
          <li
            key={index}
            onClick={(e) => handleDotClick(index, e)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          ></li>
        ))}
      </ul>
    </div>
  )
}
