"use client"

import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

import Auth from "./components/Auth"
import AdminDashboard from "./components/AdminDashboard"

import Gallery from "./Pages/Gallery"
import AllProducts from "./Pages/AllProducts"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Services from "./components/Services"
import OurProcess from "./components/OurProcess"
import Inspiration from "./components/Inspiration"
import Testimonials from "./components/Testimonials"
import ContactUs from "./components/ContactUs"
import ProductSection from "./components/ProductSection"
import ColorPalette from "./Pages/ColorPalette" // Import ColorPalette from Pages directory
import Projects from "./Pages/Projects"
import "./App.css"

// Import our image preloader service
import { preloadProductImages } from "./utils/imageUtils"

const mainCategories = [
  { id: "all", name: "All Products" },
  { id: "paints", name: "Paints" },
  { id: "distemper", name: "Distemper" },
  { id: "pu-polish", name: "PU Polish" },
  { id: "wood-polish", name: "Wood Polish" },
  { id: "tools", name: "Paint Brush and Rollers" },
  { id: "enamel", name: "Enamel" },
  { id: "putty-primers", name: "Putty & Primers" },
]

const subCategories = {
  paints: ["interior", "exterior", "emulsion", "textured"],
  distemper: ["acrylic", "synthetic", "water-based"],
  "pu-polish": ["glossy", "matte", "water-based"],
  "wood-polish": ["melamine", "nc", "french", "water-based"],
  tools: ["flat", "round", "foam", "textured"],
  enamel: ["synthetic", "water-based", "high-gloss", "satin"],
  "putty-primers": ["wall-putty", "acrylic-putty", "cement-putty", "oil-primer", "water-primer"],
}

// Create a ScrollToHash component to handle hash-based scrolling
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    // If we have a hash in the URL
    if (location.hash) {
      // Get the element with the ID that matches the hash
      const elementId = location.hash.substring(1)
      const element = document.getElementById(elementId)

      if (element) {
        // Wait a bit for the page to fully render
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 500)
      }
    }
  }, [location])

  return null
}

function App() {
  const [user, setUser] = useState(null)
  const [isPreloading, setIsPreloading] = useState(true)

  // Handle authentication
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch (error) {
        console.error("Invalid token:", error)
        localStorage.removeItem("token") // Remove invalid token
        setUser(null)
      }
    }
  }, [])

  // Preload product images when the app starts
  useEffect(() => {
    const initializeImagePreloader = async () => {
      try {
        console.log("Initializing image preloader...")
        const response = await axios.get("https://dreamhousebackend-vvxx.onrender.com/api/products")
        const products = response.data || []

        // Start preloading images in the background
        await preloadProductImages(products)
        console.log("Image preloading complete")
      } catch (error) {
        console.error("Failed to initialize image preloader:", error)
      } finally {
        setIsPreloading(false)
      }
    }

    initializeImagePreloader()
  }, [])

  // Add this new effect to handle scrolling to contact section
  useEffect(() => {
    // Check if we need to scroll to contact section
    const shouldScrollToContact = sessionStorage.getItem("scrollToContact") === "true"

    if (shouldScrollToContact) {
      // Clear the flag
      sessionStorage.removeItem("scrollToContact")

      // Wait for components to render
      setTimeout(() => {
        // Find the ContactUs component
        const contactSection =
          document.querySelector(".contact-us-section") ||
          document.getElementById("contact-us") ||
          document.getElementById("contact")

        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 500) // Delay to ensure components are rendered
    }
  }, [])

  return (
    <Router>
      <ScrollToHash /> {/* Add this component to handle hash-based scrolling */}
      <div className="App">
        <Routes>
          {/* Home Page with Full Sections */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="App-main">
                  <ProductSection mainCategories={mainCategories} subCategories={subCategories} />
                  <Services />
                  <OurProcess />
                  <Inspiration />
                  <Testimonials />
                  <ContactUs />
                </main>
                <Footer />
              </>
            }
          />

          {/* Products Page */}
          <Route
            path="/products"
            element={<AllProducts mainCategories={mainCategories} subCategories={subCategories} />}
          />

          {/* Color Palette Page */}
          <Route path="/color-palette" element={<ColorPalette />} />

          {/* Gallery Page */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Projects Page */}
          <Route path="/projects" element={<Projects />} />

          {/* Authentication Page */}
          <Route path="/auth" element={<Auth setUser={setUser} />} />

          {/* Admin Dashboard (Restricted Access) */}
          <Route path="/admin" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
