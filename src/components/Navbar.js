"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Header.css"

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // This effect runs whenever the location changes
  useEffect(() => {
    // If there's a hash, scroll to that element
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // If there's no hash, scroll to the top of the page
      window.scrollTo(0, 0)
    }
  }, [location])

  const handleSearch = (event) => {
    event.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm("")
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? "hidden" : "visible"
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = "visible"
  }

  // Function to handle logo click
  const handleLogoClick = (e) => {
    closeMenu()
    // If we're already on the home page, just scroll to top
    if (location.pathname === "/") {
      e.preventDefault() // Prevent default link behavior
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav">
        <Link to="/" className="logo-link" onClick={handleLogoClick}>
          <div className="logo-container">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%207-1te3WwLxMmxOF1blqjANeTizVtVyru.png"
              alt="Dream House Colour World Logo"
              className="logo-image"
            />
          </div>
        </Link>
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/products" className="nav-link" onClick={closeMenu}>
            Products
          </Link>
          <Link to="/gallery" className="nav-link" onClick={closeMenu}>
            Gallery
          </Link>
          <Link to="/projects" className="nav-link" onClick={closeMenu}>
            Our Projects
          </Link>
          <Link to="/color-palette" className="nav-link" onClick={closeMenu}>
            Colour Palette
          </Link>
          <Link to="/#contact" className="nav-link" onClick={closeMenu}>
            Contact
          </Link>
        </div>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            className="search-input"
            placeholder="Search colours, textures..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  )
}

export default Navbar

