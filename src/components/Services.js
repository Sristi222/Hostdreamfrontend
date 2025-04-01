"use client"

import { useState, useEffect, useRef } from "react"
import { X } from 'lucide-react'
import "./Services.css"
import Consultation from "../img/consultation.jpg"


const ServiceCard = ({ title, description, image, isLeft, onClick }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
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
    <div className={`service-card ${isLeft ? "left-panel" : "right-panel"}`} ref={cardRef} onClick={onClick}>
      <div className="service-image-container">
        <img src={image || "/placeholder.svg"} alt={title} className="service-image" />
      </div>
      <div className="service-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
      </div>
    </div>
  )
}

const ServiceModal = ({ service, onClose }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(true)
    return () => setIsActive(false)
  }, [])

  // Parse the shortDescription to extract all bullet points
  const formatDescription = (description) => {
    if (!description) return { title: "", bulletPoints: [] }

    const lines = description.split("\n")
    const title = lines[0]

    // Extract all bullet points but remove the • character
    const bulletPoints = {
      whatItIs: "",
      forWho: "",
      benefit: "",
    }

    lines.forEach((line) => {
      if (line.includes("What it is:")) {
        // Remove the bullet point character and split by the colon
        const parts = line.replace("•", "").trim().split(":")
        bulletPoints.whatItIs = {
          label: parts[0].trim() + ":",
          content: parts.slice(1).join(":").trim()
        }
      } else if (line.includes("For:")) {
        const parts = line.replace("•", "").trim().split(":")
        bulletPoints.forWho = {
          label: parts[0].trim() + ":",
          content: parts.slice(1).join(":").trim()
        }
      } else if (line.includes("Benefit:")) {
        const parts = line.replace("•", "").trim().split(":")
        bulletPoints.benefit = {
          label: parts[0].trim() + ":",
          content: parts.slice(1).join(":").trim()
        }
      }
    })

    return { title, bulletPoints }
  }

  const { title, bulletPoints } = formatDescription(service.shortDescription)

  return (
    <div className={`service-modal-overlay ${isActive ? "active" : ""}`} onClick={onClose}>
      <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="service-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="service-modal-text">
          <h2>{service.title}</h2>
          <ul className="service-bullet-list">
            <li>
              <span className="keyword-label">What it is:</span> {bulletPoints.whatItIs.content}
            </li>
            <li>
              <span className="keyword-label">For:</span> {bulletPoints.forWho.content}
            </li>
            <li>
              <span className="keyword-label">Benefit:</span> {bulletPoints.benefit.content}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      title: "Interior & Exterior Paints",
      description: "Give your home a fresh, vibrant look with our premium paints.",
      shortDescription:
        "Interior & Exterior Paints\n• What it is: High-quality paints for indoor and outdoor surfaces.\n• For: Homes, offices, and commercial spaces.\n• Benefit: Transforms your space with fresh, durable, and vibrant colors.",
      image: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=800&q=80",
    },

    {
      title: "Waterproofing Solutions",
      description: "Keep your walls safe from leaks and moisture with our waterproofing.",
      shortDescription:
        "Waterproofing Solutions\n• What it is: Protective coatings to prevent water damage.\n• For: Basements, bathrooms, balconies, and exterior walls.\n• Benefit: Protects your property and increases its longevity.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Painter Deployment",
      description: "Need painters? We send skilled professionals to get the job done.",
      shortDescription:
        "Painter Deployment\n• What it is: Professional painters sent to your location.\n• For: Any space needing painting work.\n• Benefit: Hassle-free, expert painting with a flawless finish.",
      image:
        "https://multiplefacilityservice.com/wp-content/uploads/2022/10/Contractor-Recommendation-1536x1024.jpg.webp",
    },
    {
      title: "Cornice Installation",
      description: "Bring elegance to your rooms with beautifully crafted cornices.",
      shortDescription:
        "Cornice Installation\n• What it is: Decorative ceiling moldings installed where walls meet ceilings.\n• For: Living rooms, bedrooms, and formal areas.\n• Benefit: Adds elegance and a polished look to your interiors.",
      image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Wall Texture & Art",
      description: "Add depth and personality to your walls with stunning textures.",
      shortDescription:
        "Wall Texture & Art\n• What it is: Custom textures and artistic designs applied to walls.\n• For: Feature walls, accent areas, or creative spaces. Eg: Gym, restaurant, living room, bedroom, etc.\n• Benefit: Adds personality and a unique touch to your decor.",
      image: "https://img.freepik.com/premium-photo/wall-surface-as-background-texture-pattern_77684-3230.jpg?w=740",
    },
    
    {
      title: "Dico Painting",
      description: "Get a smooth, perfect finish with our advanced painting technique.",
      shortDescription:
        "Dico Painting\n• What it is: A specialized painting technique for a smooth, flawless finish.\n• For: High-end residential and commercial spaces.\n• Benefit: Delivers a premium, seamless look that lasts.",
      image:
        "https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/202210/difference-between-duco-and-pu-paints/duco-pu-paint-finish.jpg",
    },
    {
      title: "Interior & Exterior Design",
      description: "Let us help you design a space that feels just right for you.",
      shortDescription:
        "Interior & Exterior Design\n• What it is: Complete design services for indoor and outdoor spaces.\n• For: New constructions, renovations, or redesigns.\n• Benefit: Creates cohesive, stylish, and functional spaces.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Color Consultation",
      description: "Find the perfect colors to make your home look and feel amazing.",
      shortDescription:
        "Color Consultation\n• What it is: Expert advice on choosing the right colors.\n• For: Any space needing a color update or refresh.\n• Benefit: Helps you achieve the perfect mood and style for your space.",
      image: Consultation,
    },
    {
      title: "PU Polishing",
      description: "Make your wooden surfaces shine and last longer with expert polishing.",
      shortDescription:
        "PU Polishing\n• What it is: Polishing and protection for polyurethane (PU) surfaces.\n• For: Floors, furniture, and fixtures.\n• Benefit: Restores shine and makes surfaces more durable.",
      image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "False Ceiling",
      description: "Add a stylish, modern touch to your space with false ceilings.",
      shortDescription:
        "False Ceiling\n• What it is: Installation of a secondary ceiling below the main one.\n• For: Modern homes, offices, or commercial spaces.\n• Benefit: Adds a sleek, contemporary look and hides wiring or ducts.",
      image: "https://5.imimg.com/data5/RB/JG/MY-29290916/ceiling-for-office-and-apartment.jpg",
    },
    {
      title: "On-site Consultation",
      description: "Talk to our experts in person and plan your perfect space.",
      shortDescription:
        "On-site Consultation\n• What it is: Free professional advice at your location.\n• For: Any project planning phase.\n• Benefit: Tailored solutions and clarity before starting your project.",
      image:
        "https://livewithdreams.com.np/wp-content/uploads/2022/09/group-people-working-out-business-plan-office-scaled-1.jpg",
    },
    {
      title: "Wood Polishing",
      description: "Restore the beauty of your wooden furniture and floors with expert care.",
      shortDescription:
        "Wood Polishing\n• What it is: Restoration and protection of wooden surfaces.\n• For: Furniture, floors, and wooden paneling.\n• Benefit: Revives the natural beauty of wood and extends its life.",
      image:
        "https://images.unsplash.com/photo-1574501668452-39ee2dd312ab?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  const openModal = (service) => {
    setSelectedService(service)
  }

  const closeModal = () => {
    setSelectedService(null)
  }

  return (
    <section className="services" id="services">
      <div className="services-container">
        <h2 className="services-heading">Our Professional Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} isLeft={index % 2 === 0} onClick={() => openModal(service)} />
          ))}
        </div>
      </div>
      {selectedService && <ServiceModal service={selectedService} onClose={closeModal} />}
    </section>
  )
}

export default Services