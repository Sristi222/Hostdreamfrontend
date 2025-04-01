"use client"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Facebook, Phone, Mail, MapPin } from "lucide-react"
import "./Footer.css"
import { Link } from "react-router-dom"
import footer from "../img/hero.jpg"
import footer1 from "../img/hero1.jpg"
import footer2 from "../img/hero3.png"
import footer3 from "../img/footer3.jpg"

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    if (clickCount === 5) {
      navigate("/auth")
      setClickCount(0) // Reset the counter after opening the auth page
    }
  }, [clickCount, navigate])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    if (location.pathname === "/") {
      scrollToSection(id)
    } else {
      window.location.href = "/" + "#" + id
    }
  }

  const handleFooterClick = (e) => {
    e.preventDefault() // Prevent the default link behavior
    setClickCount((prevCount) => prevCount + 1)
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section">
            <a href="/" className="footer-logo-link">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%207-JjA1Nwur9pfnEXalWi2fE61U3edoKu.png"
                alt="Dream House Colour World Logo"
                className="footer-logo-image"
              />
            </a>
            <p className="brand-description">We don't just sell paint, we bring your dream home to life.</p>
            <div className="facebook-connect">
              <a
                href="https://www.facebook.com/people/Dream-House-Colour-World/100089261537125/"
                target="_blank"
                rel="noopener noreferrer"
                className="facebook-button"
              >
                <Facebook size={16} />
                <span>Find us on Facebook</span>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/#services" onClick={(e) => handleLinkClick(e, "services")}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
                <li>
                  <a href="/color-palette">Color Palette</a>
                </li>
                <li>
                  <a href="/#contact" onClick={(e) => handleLinkClick(e, "contact")}>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <address className="contact-details">
              <p>
                <MapPin size={16} />
                <span>Swoyambhu, Karkhana Chowk</span>
              </p>
              <a href="tel:+9779841214032">
                <Phone size={16} />
                <span>+977 9841214032</span>
              </a>
              <a href="tel:+9779808741780">
                <Phone size={16} />
                <span>+977 9808741780</span>
              </a>
              <a href="mailto:stha.heem555@gmail.com">
                <Mail size={16} />
                <span>stha.heem555@gmail.com</span>
              </a>
            </address>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Our Store</h4>
            <div className="gallery-grid">
              <img src={footer || "/placeholder.svg"} alt="Store Interior" />
              <img src={footer1 || "/placeholder.svg"} alt="Paint Selection" />
              <img src={footer2 || "/placeholder.svg"} alt="Paint Mixing" />
              <img src={footer3 || "/placeholder.svg"} alt="Color Consultation" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          <Link to="/" className="admin-link" onClick={handleFooterClick}>
            © {new Date().getFullYear()} Dream House Color World. All Rights Reserved
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer

