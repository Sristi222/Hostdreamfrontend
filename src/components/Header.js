"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import "./Header.css"
import heroImage from "../img/compressed/compress/hero.jpg"
import hero from "../img/compressed/compress/hero1.jpg"
import herosection from "../img/compressed/compress/besthero.png"

const DreamPaints = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: heroImage,
      title: "You Dream,\n We Paint",
      description: "We have all varieties of premium paint colors that will perfectly suit your space.",
      buttonText: "Explore Services",
    },
    {
      image: hero,
      title: "Discover Premium Paints",
      description: "Experience the perfect blend of quality and innovation with our advanced paint technology.",
      buttonText: "View Our Products",
    },
    {
      image: herosection,
      title: "Hire Our Professional \n Team Today",
      description: "Trust our expert team to bring your vision to life with precision, care, and artistic flair.",
      buttonText: "CONTACT US TODAY",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [slides.length])

  return (
    <>
      <Navbar />
      <section className="hero">
        {slides.map((slide, index) => (
          <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
            <img src={slide.image || "/placeholder.svg"} alt={`Slide ${index + 1}`} className="slide-bg" />
            <div className="hero-content-wrapper">
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                {slide.buttonText === "Explore Services" && (
                  <a href="#services" className="slide-btn">
                    {slide.buttonText}
                  </a>
                )}
                {slide.buttonText === "View Our Products" && (
                  <a href="/products" className="slide-btn">
                    {slide.buttonText}
                  </a>
                )}
                {slide.buttonText === "CONTACT US TODAY" && (
                  <a href="#contact" className="slide-btn">
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="hero-curve">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,160 C180,280,360,300,540,280 C720,260,900,200,1080,180 C1260,160,1350,180,1440,200 L1440,320 L0,320 Z"></path>
          </svg>
        </div>
      </section>
    </>
  )
}

export default DreamPaints

