
"use client"

import { useRef } from "react"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../components/ProductSection.css"
import ProductImage from "../components/ProductImage"
import { preloadProductImages } from "../utils/imageUtils"
import { createPortal } from "react-dom"

// Create a separate ProductCard component to use hooks properly
const ProductCard = ({ product, openModal, onImageLoad, onImageError }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <ProductImage
          product={product}
          alt={product.name}
          onLoad={() => onImageLoad(product._id)}
          onError={() => onImageError(product._id)}
        />

        <button className="quick-view-btn" onClick={(e) => openModal(product, e)}>
          Quick View
        </button>
      </div>
      <div className="product-content">
        <div className="product-availability">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 7h-9.8C9.5 7 9 7.5 9 8.2v.6c0 .7.5 1.2 1.2 1.2H20c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
            <path d="M20 14h-9.8c-.7 0-1.2.5-1.2 1.2v.6c0 .7.5 1.2 1.2 1.2H20c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
            <path d="M12 2v20"></path>
            <path d="M4 12h8"></path>
          </svg>
          <span>In Stock</span>
        </div>

        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  )
}

const mainCategories = [
  { id: "all", name: "All Products" },
  { id: "exterior", name: "Exterior" },
  { id: "interior", name: "Interior" },
  { id: "distemper", name: "Distemper" },
  { id: "woodpolish", name: "Wood Polish" },
  { id: "pupolish", name: "PU Polish" },
  { id: "enamel", name: "Enamel" },
  { id: "primer", name: "Primer" },
  { id: "waterproofing", name: "Waterproofing" },
]

const subCategories = {
  exterior: ["Water Puffing", "Ultima Protect Shine", "Apex Ultima", "Apex", "ACE", "Silicon"],
  interior: [
    "Royal Health Shield",
    "Royal Blink",
    "Royal Aspira",
    "Royal Shine",
    "Royal Luxury",
    "Premium Emulsion",
    "Tractor Emulsion",
    "Silicon",
  ],
  distemper: ["Tractor Distemper", "Uno Distemper"],
  woodpolish: ["Chapra", "Sealer", "Lacker", "Melamine"],
  enamel: ["Premium Gloss Enamel", "Satin Enamel"],
  primer: ["Oil Primer", "Wood Primer", "Metal Primer"],
  waterproofing: ["Damp Proof", "Hydro Lock", "Damp Shield"],
}

const AllProducts = () => {
  const [currentMainCategory, setCurrentMainCategory] = useState("all")
  const [currentSubCategory, setCurrentSubCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [imagesLoaded, setImagesLoaded] = useState({})
  const [modalRoot, setModalRoot] = useState(null)
  const modalRef = useRef(null)

  const location = useLocation()

  // Find the modal root element after component mounts
  useEffect(() => {
    setModalRoot(document.getElementById("modal-root") || document.body)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://dreamhousebackend-vvxx.onrender.com/api/products")
        const productsData = response.data || []
        setProducts(productsData)

        // Initialize image loaded state for each product
        const initialLoadState = {}
        productsData.forEach((product) => {
          initialLoadState[product._id] = false
        })
        setImagesLoaded(initialLoadState)

        // Preload images in the background
        preloadProductImages(productsData)
      } catch (error) {
        console.error("❌ Error fetching products:", error)
        setError("Failed to load products. Please try again later.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get("search")
    if (search) {
      setSearchTerm(search)
      setCurrentMainCategory("all")
      setCurrentSubCategory(null)
    }
  }, [location])

  const getFilteredProducts = () => {
    let filtered = [...products]

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.subCategory && product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    } else {
      if (currentMainCategory !== "all") {
        filtered = filtered.filter((product) => product.category === currentMainCategory)
      }
      if (currentSubCategory) {
        filtered = filtered.filter((product) => product.subCategory === currentSubCategory)
      }
    }

    return filtered
  }

  const handleMainCategoryClick = (category) => {
    setCurrentMainCategory(category)
    setCurrentSubCategory(null)
    setSearchTerm("")
  }

  const handleSubCategoryClick = (subCategory) => {
    setCurrentSubCategory(subCategory)
    setSearchTerm("")
  }

  const openModal = (product, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setModalProduct(product)
    setIsModalVisible(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("closing")

      setTimeout(() => {
        setIsModalVisible(false)
        document.body.style.overflow = "visible"

        setTimeout(() => {
          if (modalRef.current) {
            modalRef.current.classList.remove("closing")
          }
          setModalProduct(null)
        }, 50)
      }, 300)
    } else {
      setIsModalVisible(false)
      document.body.style.overflow = "visible"
      setTimeout(() => setModalProduct(null), 300)
    }
  }

  // Handle image load success
  const handleImageLoad = (productId) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [productId]: true,
    }))
  }

  // Handle image load error
  const handleImageError = (productId) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [productId]: "error",
    }))
  }

  const filteredProducts = getFilteredProducts()

  // Add escape key handler for modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    if (isModalVisible) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isModalVisible])

  // Render modal using portal
  const renderModal = () => {
    if (!modalProduct || !isModalVisible || !modalRoot) {
      return null
    }

    // Use createPortal to render the modal at the root level
    return createPortal(
      <div
        ref={modalRef}
        className={`modal ${isModalVisible ? "show" : ""}`}
        onClick={closeModal}
        style={{
          position: "fixed",
          zIndex: 9999,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1,
          visibility: "visible",
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#ffffff",
            padding: "28px",
            borderRadius: "12px",
            width: "380px",
            maxWidth: "90%",
            maxHeight: "85vh",
            overflow: "auto",
            opacity: 1,
            transform: "scale(1)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            position: "relative",
          }}
        >
          <span
            className="close"
            onClick={closeModal}
            style={{
              position: "absolute",
              right: "12px",
              top: "12px",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
            }}
          >
            &times;
          </span>

          {/* Image container using the improved ProductImage component */}
          <div
            style={{
              width: "100%",
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <ProductImage
              product={modalProduct}
              alt={modalProduct.name}
              className="modal-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>

          <h2
            className="modal-product-title"
            style={{
              fontSize: "1.4rem",
              marginBottom: "14px",
              fontWeight: "600",
              color: "#111",
              lineHeight: "1.2",
              textAlign: "center",
              width: "100%",
            }}
          >
            {modalProduct.name || "Product"}
          </h2>

          <p
            className="modal-product-description"
            style={{
              marginBottom: "18px",
              lineHeight: "1.5",
              color: "#555",
              fontSize: "1rem",
              textAlign: "center",
              width: "100%",
            }}
          >
            {modalProduct.description || "No description available"}
          </p>

          {modalProduct.sizes && modalProduct.sizes.length > 0 && (
            <div
              className="modal-product-sizes"
              style={{
                marginTop: "16px",
                fontSize: "0.95rem",
                color: "#333",
                lineHeight: "1.5",
                padding: "12px",
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <p style={{ margin: 0 }}>
                Available sizes:{" "}
                {Array.isArray(modalProduct.sizes) ? modalProduct.sizes.join(", ") : modalProduct.sizes}
                {modalProduct.sizeUnit ? ` ${modalProduct.sizeUnit}` : ""}
              </p>
            </div>
          )}

          {modalProduct.details && (
            <div
              className="modal-product-details"
              style={{
                marginTop: "16px",
                fontSize: "0.95rem",
                color: "#333",
                lineHeight: "1.5",
                padding: "12px",
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
              }}
            >
              {modalProduct.details}
            </div>
          )}
        </div>
      </div>,
      modalRoot,
    )
  }

  return (
    <div className="all-products-page">
      <Navbar />
      <div className="container">
        <h1 className="section">All Products</h1>

        {searchTerm && (
          <p className="search-results-text">
            Showing results for: <strong>{searchTerm}</strong>
          </p>
        )}

        <div className="filter-options main-filter">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-button ${currentMainCategory === category.id ? "active" : ""}`}
              onClick={() => handleMainCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {currentMainCategory !== "all" && subCategories[currentMainCategory] && (
          <div className="filter-options sub-filter">
            <div className="sub-categories">
              {subCategories[currentMainCategory].map((subCategory) => (
                <button
                  key={subCategory}
                  className={`filter-button ${currentSubCategory === subCategory ? "active" : ""}`}
                  onClick={() => handleSubCategoryClick(subCategory)}
                >
                  {subCategory}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  openModal={openModal}
                  onImageLoad={handleImageLoad}
                  onImageError={handleImageError}
                />
              ))
            ) : (
              <p className="no-products-message">No products available.</p>
            )}
          </div>
        )}

        <div className="view-all-container">
          <a href="/" className="back-btn">
            Back to Home
          </a>
        </div>
      </div>

      {/* Render modal using portal */}
      {renderModal()}

      <Footer />
    </div>
  )
}

export default AllProducts
