"use client"

import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./Inspiration.css"
import gallery from "../img/compressed/compress/gallery.jpg"
import wow from "../img/compressed/compress/beautiful.jpg"

const InspirationCard = ({ image, roomLabel, title, description, onViewGallery }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div className="inspiration-card" ref={cardRef}>
      <div className="card-image">
        <img src={image || "/placeholder.svg"} alt={`${roomLabel} inspiration`} loading="lazy" />
        <span className="room-label">{roomLabel}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <button onClick={() => onViewGallery(roomLabel.toLowerCase())} className="view-gallery">
          View Gallery
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const Inspiration = () => {
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  const handleViewGallery = (section) => {
    // Map the section names to the correct IDs in the Gallery component
    const sectionMap = {
      exterior: "living-room",
      "false ceiling": "False ceiling",
      bedroom: "bedroom",
    }

    const targetSection = sectionMap[section] || section

    // Navigate to gallery page with the section ID
    navigate("/gallery")

    // Store the section ID to scroll to after navigation
    sessionStorage.setItem("gallerySection", targetSection)
  }

  return (
    <section className="inspiration">
      <div className="inspiration-container">
        <h2 className="inspiration-title" ref={titleRef}>
          Get Inspired
        </h2>
        <div className="inspiration-grid" ref={gridRef}>
          <InspirationCard
            image={gallery}
            roomLabel="Exterior"
            title="Home Exterior Colours"
            description="Protect and beautify your house walls with durable, weather-resistant paints"
            onViewGallery={handleViewGallery}
          />
          <InspirationCard
            image={wow}
            roomLabel="False ceiling"
            title="False Ceiling Design "
            description="Enhance your space with stylish and modern false ceiling ideas."
            onViewGallery={handleViewGallery}
          />
          <InspirationCard
            image="https://indigopaints.com/wp-content/uploads/2021/08/shutterstock_712965688.webp"
            roomLabel="Bedroom"
            title="Bedroom Colours"
            description="Refresh your space with modern, stylish colors and tones."
            onViewGallery={handleViewGallery}
          />
        </div>
      </div>
    </section>
  )
}

export default Inspiration

