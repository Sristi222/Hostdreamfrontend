"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Testimonials.css"
import img from "../img/Before2.jpg"
import imgs from "../img/After2.jpg"
import before4 from "../img/Before4.jpg"
import after4 from "../img/After4.jpg"
import before5 from "../img/Before5.jpg"
import after5 from "../img/After5.jpg"
import before6 from "../img/Before6.jpg"
import after6 from "../img/After6.jpg"
import house from "../img/housebefore.jpg"
import color from "../img/houseafter.jpg"

const testimonials = [

  {
    id: 5,
    name: "Sonu maya Lamichhane",
    type: "Home Owner",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDH94qP1Hth7yBoc5ldevLA2vRpXw4326z_JcwN1NeWJInqKyixRxPUs0EfXlB_DjTbf8&usqp=CAU",
    quote:
      "This store has everything! So many paints, good quality, and not expensive. Staff was super nice too. Will buy again!",
    beforeImage: before6,
    afterImage: after6,
  },
  
  {
    id: 3,
    name: "Meena Nepali",
    type: "Interior Designer",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
    quote:
      "A shop guy told me to try Dream Paints. They had all the color palettes. My client home looks unique now. Thanks to them!",
    beforeImage: before4,
    afterImage: after4,
  },
  {
    id: 4,
    name: "Radhika Suwal",
    type: "Homeowner",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/297/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
    quote:
      "Went to Dream Paints to find a color for my living room. So many choices! The staff helped me pick the perfect one. My room looks amazing now!",
    beforeImage: before5,
    afterImage: after5,
  },
  
  {
    id: 6,
    name: "Rajendra Basnet",
    type: "Home owner",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/024/183/502/small_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg",
    quote:
      "I needed paint for my new house and they had the perfect color. The paint was smooth and easy to use. Happy with how it turned out!",
    beforeImage: house,
    afterImage: color,
  },

  {
    id: 1,
    name: "Shyam Maharjan",
    type: "Residential Client",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/010/967/316/non_2x/avatar-bearded-man-free-vector.jpg",
    quote:
      "My wife was out of town, so I had to take care of painting our new home on my own. I was worried at first, but thankfully, I found Dream Paints. They took care of everything so well, super professional! The final look turned out amazing. So happy with it!",
    beforeImage: img,
    afterImage: imgs,
  },

]

const TruncatedQuote = ({ quote, maxLength = 120 }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (quote.length <= maxLength) {
    return <blockquote className="testimonialQuote">{quote}</blockquote>
  }

  return (
    <div className={`testimonialQuote ${isExpanded ? "expanded" : ""}`}>
      <blockquote>{isExpanded ? quote : `${quote.slice(0, maxLength)}...`}</blockquote>
      <button className="readMoreBtn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  )
}

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false })
  const containerRef = useRef(null)
  const beforeImgRef = useRef(null)
  const afterImgRef = useRef(null)

  const handleMove = useCallback((clientX) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = clientX - containerRect.left
      const newPosition = (mouseX / containerWidth) * 100
      setSliderPosition(Math.max(0, Math.min(100, newPosition)))
    }
  }, [])

  // Mouse event handlers
  const handleMouseMove = useCallback(
    (e) => {
      handleMove(e.clientX)
    },
    [handleMove],
  )

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }, [handleMouseMove])

  const handleMouseDown = (e) => {
    e.preventDefault()
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  // Touch event handlers
  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault()
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX)
      }
    },
    [handleMove],
  )

  const handleTouchEnd = useCallback(() => {
    document.removeEventListener("touchmove", handleTouchMove)
    document.removeEventListener("touchend", handleTouchEnd)
  }, [handleTouchMove])

  const handleTouchStart = (e) => {
    e.preventDefault()
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)
  }

  // Handle image load events
  const handleImageLoad = (type) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [type]: true,
    }))
  }

  React.useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return (
    <div className="beforeAfter" ref={containerRef}>
      {(!imagesLoaded.before || !imagesLoaded.after) && (
        <div className="image-loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <div className="imgCompContainer">
        <div className="imgCompAfter">
          <img
            ref={afterImgRef}
            src={afterImage || "/placeholder.svg"}
            alt="After"
            onLoad={() => handleImageLoad("after")}
            onError={(e) => {
              console.error("Failed to load after image")
              e.target.src = "/placeholder.svg"
              setImagesLoaded((prev) => ({ ...prev, after: true }))
            }}
          />
          <div className="imgLabel after">After</div>
        </div>
        <div className="imgCompBefore" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <img
            ref={beforeImgRef}
            src={beforeImage || "/placeholder.svg"}
            alt="Before"
            onLoad={() => handleImageLoad("before")}
            onError={(e) => {
              console.error("Failed to load before image")
              e.target.src = "/placeholder.svg"
              setImagesLoaded((prev) => ({ ...prev, before: true }))
            }}
          />
          <div className="imgLabel before">Before</div>
        </div>
        <div
          className="imgCompSlider"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="sliderLine"></div>
          <div className="sliderHandle">
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isResponsive, setIsResponsive] = useState(false)
  const carouselRef = useRef(null)

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
        setIsResponsive(true)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
        setIsResponsive(false)
      } else {
        setCardsPerView(3)
        setIsResponsive(false)
      }
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset to first card when cards per view changes
  useEffect(() => {
    setActiveIndex(0)
  }, [cardsPerView])

  // Hard-coded maximum index to prevent sliding too far
  const maxIndex = Math.max(0, testimonials.length - cardsPerView)

  const handlePrevClick = () => {
    setActiveIndex((current) => {
      // If at the beginning, loop to the end
      if (current <= 0) {
        return maxIndex
      }
      // Otherwise, go back one
      return Math.max(0, current - 1)
    })
  }

  const handleNextClick = () => {
    setActiveIndex((current) => {
      // If at or beyond the max index, loop to the beginning
      if (current >= maxIndex) {
        return 0
      }
      // Otherwise, go forward one but don't exceed max
      return Math.min(maxIndex, current + 1)
    })
  }

  // Calculate card width as a percentage
  const cardWidth = 100 / cardsPerView

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="sectionTitle">What Our Clients Say</h2>
        <p className="sectionSubtitle">Discover why homeowners and businesses trust us for their painting needs</p>

        {isResponsive && <p className="slideInstructions">Swipe left or right to see more testimonials</p>}

        <div className="testimonialsCarousel" ref={carouselRef}>
          <div
            className="carouselTrack"
            style={{
              transform: `translateX(-${activeIndex * cardWidth}%)`,
              width: `${cardWidth * testimonials.length}%`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonialCard ${index >= activeIndex && index < activeIndex + cardsPerView ? "active" : ""}`}
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className="clientAvatar" />
                <div className="testimonialContent">
                  <div className="rating">★★★★★</div>
                  <TruncatedQuote quote={testimonial.quote} />
                  <div className="clientInfo">
                    <h4 className="clientName">{testimonial.name}</h4>
                    <p className="clientType">{testimonial.type}</p>
                  </div>
                </div>
                <BeforeAfterSlider beforeImage={testimonial.beforeImage} afterImage={testimonial.afterImage} />
              </div>
            ))}
          </div>
        </div>

        {!isResponsive && (
          <div className="carouselControls">
            <button onClick={handlePrevClick} className="carouselButton prev" aria-label="Previous testimonial">
              <ChevronLeft size={24} />
            </button>
            <button onClick={handleNextClick} className="carouselButton next" aria-label="Next testimonial">
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials

