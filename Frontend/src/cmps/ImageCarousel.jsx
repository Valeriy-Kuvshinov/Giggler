import { useRef, useState, useEffect } from 'react'
import SvgIcon from './SvgIcon.jsx'
import { Link } from 'react-router-dom'

export function ImageCarousel({
  isFrom,
  images,
  gigId,
  newImgIndex,
  setNewImgIndex,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [parentWidth, setParentWidth] = useState(0)

  const carouselRef = useRef()
  const numImages = images.length
  let imageWidth = parentWidth

  useEffect(() => {
    const totalCarouselWidth = imageWidth * numImages
    carouselRef.current.style.width = `${totalCarouselWidth}px`
    carouselRef.current.style.transform = `translateX(-${imageWidth * currentIndex
      }px`
  }, [imageWidth, currentIndex, numImages])

  useEffect(() => {
    setCurrentIndex(newImgIndex)
  }, [newImgIndex])

  useEffect(() => {
    const updateParentWidth = () => {
      if (carouselRef.current && carouselRef.current.parentElement) {
        const newParentWidth = carouselRef.current.parentElement.clientWidth
        if (newParentWidth > 0) {
          setParentWidth(newParentWidth)
        }
      }
    }

    updateParentWidth()

    window.addEventListener('reload', updateParentWidth)
    window.addEventListener('resize', updateParentWidth)

    return () => {
      window.removeEventListener('reload', updateParentWidth)
      window.removeEventListener('resize', updateParentWidth)
    }
  }, [])

  function nextImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numImages)
    setNewImgIndex((prevIndex) => (prevIndex + 1) % numImages)
  }

  function prevImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? numImages - 1 : prevIndex - 1
    )
    setNewImgIndex((prevIndex) =>
      prevIndex === 0 ? numImages - 1 : prevIndex - 1
    )
  }

  function handleDotClick(index, event) {
    event.stopPropagation()
    setCurrentIndex(index)
  }

  return (
    <div
      className={`carousel-container`}
      style={{ borderRadius: isFrom === 'gig-details' ? '0' : '0.5em' }}>
      <button
        className={`arrow${isFrom === 'gig-details' ? '-gig-details' : ''
          } left`}
        onClick={(e) => prevImage(e)}
      >
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
              borderRadius: isFrom === 'gig-details' ? '0' : '0.5em'
            }}
          >
            {isFrom !== 'gig-details' ? (
              <Link to={`/gig/${gigId}`}>
                <img
                  src={image}
                  style={{ borderRadius: '0.5em' }}
                  alt={`Image ${index}`}
                  className={index === currentIndex ? 'active' : ''}
                />
              </Link>
            ) : (
              <img
                src={image}
                alt={`Image ${index}`}
                style={{ borderRadius: '0' }}
                className={index === currentIndex ? 'active' : ''}
              />
            )}
          </div>
        ))}
      </div>

      <button
        className={`arrow${isFrom === 'gig-details' ? '-gig-details' : ''
          } right`}
        onClick={(e) => nextImage(e)}
      >
        <SvgIcon iconName={'arrowDown'} />
      </button>

      {isFrom !== 'gig-details' && (
        <ul className="dot-container">
          {images.map((_, index) => (
            <li
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
            ></li>
          ))}
        </ul>
      )}
    </div>
  )
}