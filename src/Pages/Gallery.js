"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./Gallery.css"
import bed from "../img/bed.jpg"
import he from "../img/houseExterior.jpg"
import ghar from "../img/he.jpg"
import home from "../img/ghar.jpg"
import beauty from "../img/beauty.jpg"
import exterior from "../img/house5.jpg"
import gallery from "../img/gallery.jpg"
import paint from "../img/paint.jpg"
import painting from "../img/painting.jpg"
import building from "../img/building.jpg"
import finalhome from "../img/After5.jpg"
import final from "../img/After3.jpg"
import wow from "../img/false.jpg"
import ceiling from "../img/ceiling.jpg"
import ceiling1 from "../img/ceiling1.jpg"
import ceiling2 from "../img/ceiling2.jpg"
import ceiling3 from "../img/ceiling3.jpg"
import ceiling4 from "../img/ceiling4.jpg"
import ceiling5 from "../img/beautiful.jpg"
import bedroom from "../img/bedroom.jpg"
import bedroom1 from "../img/bedroom1.jpg"
import bedroom2 from "../img/bedroom2.jpg"
import bedroom3 from "../img/bedroom3.jpg"
import ext from "../img/house 4.jpg"
import house from "../img/house 1.jpg"
import durbar from "../img/Durbar2.jpg"
import Gumba from "../img/Gumba1.jpg"
import lasthome from "../img/lasthome.jpg"
import hihome from "../img/After2.jpg"
import after7 from "../img/After.png"
import imgs from "../img/After5.jpg"



const galleryData = [
  {
    id: "living-room",
    title: "Home Exterior Colours",
    description:
      "Find the perfect shades to enhance your home's curb appeal, from classic neutrals to bold modern hues.",
    items: [
      {
        src: he,
        alt: "Minimalist living room with neutral tones",
      },
      {
        src: ghar,
        alt: "Colorful modern living room",
      },
      {
        src: home,
        alt: "Scandinavian style living room",
      },
      {
        src: beauty,
        alt: "Rustic living room with warm colors",
      },
      {
        src: exterior,
        alt: "Contemporary living room with blue accents",
      },
      {
        src: gallery,
        alt: "Eclectic living room with mixed patterns",
      },

      {
        src: durbar,
        alt: "durbar high school",
      },
      {
        src: paint,
        alt: "Eclectic living room with mixed patterns",
      },
      {
        src: painting,
        alt: "Eclectic living room with mixed patterns",
      },

      {
        src: building,
        alt: "Eclectic living room with mixed patterns",
      },

      {
        src: Gumba,
        alt: "Gumba",
      },


      {
        src: finalhome,
        alt: "Eclectic living room with mixed patterns",
      },

      {
        src: final,
        alt: "Eclectic living room with mixed patterns",
      },
      {
        src: ext,
        alt: "Eclectic living room with mixed patterns",
      },

      {
        src: house,
        alt: "Eclectic living room with mixed patterns",
      },

      {
        src: lasthome,
        alt: "Eclectic living room with mixed patterns",
      },

      {
        src: hihome,
        alt: "house",
      },

      {
        src: after7,
        alt: "house",
      },

      {
        src: imgs,
        alt: "house",
      },
      
    ],
  },
  {
    id: "False ceiling",
    title: "False Ceiling Designs",
    description:
      "Transform your space with creative and elegant false ceiling designs, adding style and dimension to any room.",
    items: [
      {
        src: wow,
        alt: "Modern white kitchen with marble countertops",
      },
      {
        src: ceiling,
        alt: "Rustic kitchen with wooden elements",
      },
      {
        src: ceiling1,
        alt: "Sleek black and white kitchen",
      },
      {
        src: ceiling2,
        alt: "Colorful retro-inspired kitchen",
      },
      {
        src: ceiling3,
        alt: "Minimalist kitchen with concrete elements",
      },
      {
        src: ceiling4,
        alt: "Bright kitchen with yellow accents",
      },

      {
        src: ceiling5,
        alt: "Bright kitchen with yellow accents",
      },

      
    ],
  },
  {
    id: "bedroom",
    title: "Peaceful Bedrooms",
    description:
      "Create your perfect sanctuary with our bedroom color inspirations. From calming neutrals to soothing blues, discover the ideal palette for restful nights.",
    items: [
      {
        src: bed,
        alt: "Serene bedroom with soft blue walls",
      },
      {
        src: bedroom,
        alt: "Minimalist bedroom with earth tones",
      },
      {
        src: bedroom1,
        alt: "Luxurious bedroom with deep green walls",
      },
      {
        src: bedroom2,
        alt: "Cozy bedroom with warm lighting",
      },
      {
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
        alt: "Scandinavian inspired white bedroom",
      },
      {
        src: bedroom3,
        alt: "Bohemian bedroom with colorful accents",
      },
    ],
  },
]

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null)
  // Create refs for each section
  const sectionRefs = useRef({})

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0)

    // Initialize the refs for each section
    galleryData.forEach((section) => {
      sectionRefs.current[section.id] = sectionRefs.current[section.id] || React.createRef()
    })

    // Check if we have a stored section to scroll to
    const section = sessionStorage.getItem("gallerySection")
    if (section) {
      // Clear the stored section
      sessionStorage.removeItem("gallerySection")

      // Scroll to the section after a short delay
      setTimeout(() => {
        const sectionElement = document.getElementById(section)
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 300)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    document
      .querySelectorAll(".gallery-section-title, .gallery-section-description, .gallery-image-grid")
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <div className="gallery-page">
        {galleryData.map((section) => (
          <section key={section.id} id={section.id} className="gallery-section">
            <div className="gallery-section-container">
              <h2 className="gallery-section-title">{section.title}</h2>
              <p className="gallery-section-description">{section.description}</p>
              <div className="gallery-image-grid">
                {section.items.map((item, index) => (
                  <div key={index} className="gallery-image-item" onClick={() => setModalImage(item.src)}>
                    <img src={item.src || "/placeholder.svg"} alt={item.alt} className="gallery-item-image" />
                    <div className="gallery-image-overlay">
                      <h3 className="gallery-image-title">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
        {modalImage && (
          <div className="gallery-modal" onClick={() => setModalImage(null)}>
            <span className="gallery-modal-close">&times;</span>
            <img className="gallery-modal-content" src={modalImage || "/placeholder.svg"} alt="Enlarged view" />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Gallery
