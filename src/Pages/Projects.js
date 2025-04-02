"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { Link } from "react-router-dom" // Import Link instead of useNavigate
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./Projects.css"
import project from "../img/exteriorhome.mp4"
import thumbnail from "../img/After7.jpg"
import durbar from "../img/Durbar.mp4"
import durbar1 from "../img/Durbar.jpg"
import durbar2 from "../img/Durbar2.jpg"
import durbar3 from "../img/Durbar3.jpg"
import school from "../img/school.png"
import Gumba1 from "../img/Gumba1.jpg"
import Gumba2 from "../img/Gumba2.jpg"
import Gumba3 from "../img/Gumba3.jpg"
import Gumba from "../img/Gumba.mp4"
import Vihar from "../img/Vihar.jpg"
import Vihar2 from "../img/Vihar2.jpg"
import Viharv from "../img/Viharv.mp4"
import Vihart from "../img/vihart.jpg"
import after7 from "../img/After.png"
import after4 from "../img/After2.jpg"
import imgs from "../img/After5.jpg"

const projectsData = [
  {
    id: 1,
    title: "Durbar High School Painting",
    description:
      "Complete restoration and painting of the historic Durbar High School building, preserving its architectural heritage while providing modern protection.",
    location: "Kathmandu, Nepal",
    images: [durbar2, durbar1, durbar3],
    videoUrl: durbar, // Local video file path
    videoThumbnail: school,
  },
  {
    id: 2,
    title: "Thangkar Dechen Choling Monastery",
    description:
      "Detailed painting and restoration of a traditional Buddhist Gumba, using authentic techniques and materials to honor its cultural significance.",
    location: "Swayambhu, Nepal",
    images: [Gumba1, Gumba2],
    videoUrl: Gumba, // Local video file path
    videoThumbnail: Gumba3,
  },
  {
    id: 3,
    title: "Bajrakirti Mahavihar",
    description:
      "Restoration of a traditional Newari temple with authentic materials and techniques, preserving cultural heritage while enhancing durability.",
    location: "Bhaktapur, Nepal",
    images: [Vihar, Vihar2],
    videoUrl: Viharv, // Local video file path
    videoThumbnail: Vihart,
  },
  {
    id: 4,
    title: "House Renovation",
    description:
      "Complete interior and exterior renovation of a residential property, transforming it with modern colors and finishes while improving durability.",
    location: "Lalitpur, Nepal",

    images: [after7, after4, imgs],
    videoUrl: project, // Local video file path
    videoThumbnail: thumbnail,
  },
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalVisible) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalVisible])

  const openModal = (project, startWithVideo = false) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsVideoPlaying(startWithVideo)
    setIsModalVisible(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsModalVisible(false)
    document.body.style.overflow = "visible"
    setTimeout(() => {
      setSelectedProject(null)
      setIsVideoPlaying(false)
    }, 300)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1))
    }
  }

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
    if (videoRef.current) {
      if (!isVideoPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  return (
    <div className="projects-page">
      <Navbar />

      <div className="projects-hero">
        <div className="projects-hero-content">
          <h1>Our Projects</h1>
          <p>Discover our portfolio of painting projects across residential, commercial, and cultural spaces</p>
        </div>
      </div>

      <div className="projects-container">
        <div className="projects-list">
          {projectsData.map((project) => (
            <div key={project.id} className="project-section">
              <h2 className="project-title">{project.title}</h2>
              <div className="project-info">
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span className="project-location">Location: {project.location}</span>
                </div>
              </div>

              <div className="project-media">
                <div className="project-images">
                  {project.images.map((image, index) => (
                    <div key={index} className="project-image-container" onClick={() => openModal(project)}>
                      <img
                        src={image || "/placeholder.svg"}
                        alt={${project.title} - Image ${index + 1}}
                        className="project-image"
                      />
                      <div className="image-overlay">
                        <span>View Gallery</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="project-video-container" onClick={() => openModal(project, true)}>
                  <div className="video-thumbnail">
                    <img src={project.videoThumbnail || "/placeholder.svg"} alt={${project.title} video thumbnail} />
                    <div className="video-play-button">
                      <Play size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className={project-modals ${isModalVisible ? "show" : ""}} onClick={closeModal} ref={modalRef}>
          <div className="modals-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modals" onClick={closeModal}>
              &times;
            </button>

            <div className="modals-gallery">
              {!isVideoPlaying ? (
                <>
                  <img
                    src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="modals-image"
                  />
                  <div className="gallery-controls">
                    <button className="gallery-control prev" onClick={prevImage}>
                      &#10094;
                    </button>
                    <button className="gallery-control next" onClick={nextImage}>
                      &#10095;
                    </button>
                  </div>
                  <button className="video-toggle" onClick={toggleVideo}>
                    <Play size={24} />
                    <span>Watch Video</span>
                  </button>
                </>
              ) : (
                <div className="video-container">
                  <video
                    ref={videoRef}
                    src={selectedProject.videoUrl}
                    controls
                    autoPlay
                    width="100%"
                    height="100%"
                    className="modals-video"
                  />
                  <button className="video-toggle active" onClick={toggleVideo}>
                    <Pause size={24} />
                    <span>View Photos</span>
                  </button>
                </div>
              )}
            </div>

            <div className="modals-details">
              <h2>{selectedProject.title}</h2>
              <div className="project-meta">
                <span className="project-location">
                  <strong>Location:</strong> {selectedProject.location}
                </span>
              </div>
              <div className="project-full-description">
                <p>{selectedProject.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Space?</h2>
          <p>Contact us today for a free consultation and quote for your painting project</p>
          {/* Use the correct ID that matches your ContactUs component */}
          <Link to="/#contact" className="cta-button">
            Get in Touch
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Projects
